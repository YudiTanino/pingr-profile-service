const API = require("./api.js");

const PORT = process.env.API_PORT;
const ALLOWED_ORIGINS = JSON.parse(process.env.API_ALLOWED_ORIGINS);

const corsOptions = {
  origin: function (origin, callback) {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const api = API(corsOptions);

api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
