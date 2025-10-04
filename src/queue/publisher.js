const amqp = require("amqplib");
require("dotenv").config();
class Publisher {
  constructor() {
    this.url = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
    this.exchange = "wmx";
  }
  async init() {
    this.conn = await amqp.connect(this.url);
    this.ch = await this.conn.createChannel();
    await this.ch.assertExchange(this.exchange, "topic", { durable: true });
  }
  async publishLeaveRequested(payload) {
    if (!this.ch) await this.init();
    this.ch.publish(
      this.exchange,
      "leave.requested",
      Buffer.from(JSON.stringify(payload)),
      { persistent: true },
    );
  }
}
module.exports = new Publisher();
