// External libraries
const request = require("supertest");

// API module
const API = require("../src/api");

describe("The project", () => {
  const api = API();

  it("can use Jest", () => {
    expect(true).toBe(true);
  });

  it("can use Supertest", async () => {
    const response = await request(api).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBe("Hello, World!");
  });
});
