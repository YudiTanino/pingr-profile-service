// External libraries
const request = require("supertest");

// API module
const API = require("../src/api");

describe("The project", () => {
  const corsOptions = {
    origin: "*"
  }

  const api = API(corsOptions);

  it("can use Jest", () => {
    expect(true).toBe(true);
  });

  it("can use Supertest", async () => {
    const response = await request(api).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBe("Hello, World!");
  });

  it("can use CORS", async () => {
    const response = await request(api).get("/");
    const cors_header = response.header["access-control-allow-origin"];
    expect(cors_header).toBe("*");
  });
});
