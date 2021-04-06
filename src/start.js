const API = require("./api.js");

const PORT = process.env.API_PORT;
const api = API();

api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
