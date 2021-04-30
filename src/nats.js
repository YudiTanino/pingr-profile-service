const stan = require("node-nats-streaming");

module.exports = stan.connect("test-cluster", "test", {
  url: process.env.BROKER_URL,
});
