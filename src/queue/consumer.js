const amqp = require("amqplib");
const { sequelize, LeaveRequest } = require("../models");
const LeaveRepository = require("../repositories/leaveRepository");
const dayjs = require("dayjs");
require("dotenv").config();
const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
const EXCHANGE = "wmx"
const QUEUE = "leave_requests_queue";
const DLX = "wms_dlx";
const PREFETCH = 5;
async function run() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();
  await ch.assertExchange(EXCHANGE, "topic", { durable: true });
  await ch.assertExchange(DLX, "fanout", { durable: true });
  await ch.assertQueue(QUEUE, { durable: true, deadLetterExchange: DLX });
  await ch.bindQueue(QUEUE, EXCHANGE, "leave.requested");
  await ch.prefetch(PREFETCH);
  const repo = new LeaveRepository({ LeaveRequest });
  console.log("Consumer: waiting for messages...");
  ch.consume(
    QUEUE,
    async (msg) => {
      if (!msg) return;
      try {
        const payload = JSON.parse(msg.content.toString());
        const start = dayjs(payload.startDate);
        const end = dayjs(payload.endDate);
        const days = end.diff(start, "day") + 1;
        let newStatus = "PENDING";
        if (days <= 2) newStatus = "APPROVED";
        await sequelize.transaction(async (t) => {
          await repo.updateStatus(payload.leaveId, newStatus, t);
        });
        ch.ack(msg);
        console.log(`Processed leave ${payload.leaveId} -> ${newStatus}`);
      } catch (err) {
        console.error("Error processing message", err);
        ch.reject(msg, false);
      }
    },
    { noAck: false },
  );
}
if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
