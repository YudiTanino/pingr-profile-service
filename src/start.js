const API = require("./api.js");
const stanConn = require("./nats");
const mongoClient = require('./mongo');

const PORT = process.env.API_PORT;
const ALLOWED_ORIGINS = JSON.parse(process.env.API_ALLOWED_ORIGINS);

const corsOptions = {
  origin: function (origin, callback) {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const api = API(corsOptions);

async function main() {
  api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

  stanConn.on("connect", () => console.log("Connected to NATS Streaming"));

  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB')
  } catch (e) {
    console.dir(e)
  }
}

main()
