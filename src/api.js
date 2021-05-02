const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

module.exports = function (corsOptions, { stanConn, mongoClient, secret }) {
  const api = express();

  api.use(express.json());
  api.use(cors(corsOptions));

  api.get("/", (req, res) => res.json("Hello, World!"));

  return api;
};
