const express = require("express");

module.exports = function () {
  const api = express();

  api.use(express.json());

  api.get("/", (req, res) => res.json("Hello, World!"));

  return api;
};
