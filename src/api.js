const express = require("express");

const api = express();
const PORT = process.env.API_PORT;

api.use(express.json());

api.get("/", (req, res) => res.json("Hello, World!"));

api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
