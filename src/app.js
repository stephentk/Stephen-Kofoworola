require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const responseWrapper = require("./middleware/responseWrapper");
const errorHandler = require("./middleware/errorHandler");
const rateLimit = require("express-rate-limit");
const app = express();
app.use(bodyParser.json());
app.use(responseWrapper);
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", routes);

app.get("/queue-health", async (req, res) => {
  try {
    await rabbitmqChannel.checkQueue("leave_requests");
    res.json({ status: "ok", queue: "leave_requests" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.use(errorHandler);
module.exports = app;
