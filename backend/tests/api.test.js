// External libraries
const request = require("supertest");

// API module
const API = require("../src/api");

describe("Profile service", () => {
  let api, mockColl, mockDb, mongoClient, stanConn;
  const corsOptions = { origin: "*" };

  const secret = "SUPERSECRET";

  const uid = "608ef5cc069020a1d61d5380";
    
  const correctToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGVmNWNjMDY5MDIwYTFkNjFkNTM4MCJ9.DU55f1y8dGSJPWYXrHUUwU0zGc-N8FixQqontudI4RE";

  beforeEach(() => {
    mockColl = {
      updateOne: jest.fn(),
      findOne: jest.fn(),
    };

    mockDb = { collection: () => mockColl };

    mongoClient = { db: () => mockDb };

    stanConn = { publish: jest.fn() };

    api = API(corsOptions, { mongoClient, stanConn, secret });
  });

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

  it("allows a registered user to update its profile", async () => {
    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send({ description: "updated description" });


    expect(response.status).toBe(200);
    expect(stanConn.publish).toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("blocks a registered user to update other user's profile", async () => {
    const wrongToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGZmNWNjMDY5MDIwYTFkNjFkNTM4MCJ9.J7xckIJZlqkmZBomOG8CIBJPYYen7I8Mx3hUn1rVnWc";

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${wrongToken}`)
      .send({ description: "updated description" });

    expect(response.status).toBe(403);
    expect(mockColl.findOne).not.toHaveBeenCalled();
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("blocks unauthenticated update requests", async () => {
    const response = await request(api)
      .patch(`/users/${uid}`)
      .send({ description: "updated description" });

    expect(response.status).toBe(401);
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });
  
  it("ignores non existing properties", async () => {
    const updatedUser = {
      name: "Updated Name",
      nonExisting: "a",
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(stanConn.publish).toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });
  
  it("responds update with Bad Request if name is empty", async () => {
    const updatedUser = {
      name: "",
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("responds update with Bad Request if name's length is greater than allowed", async () => {
    const updatedUser = {
      name: "a".repeat(129),
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("responds update with Bad Request if description is non compliant", async () => {
    const tooLongDescription = "a".repeat(500);
    const updatedUser = {
      description: tooLongDescription,
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("responds update with Bad Request if profilePictureUrl is non compliant", async () => {
    const updatedUser = {
      profilePictureUrl: "not a URL",
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("responds update with Bad Request if profileCoverUrl is non compliant", async () => {
    const updatedUser = {
      profileCoverUrl: "not a URL",
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });

  it("responds update with Bad Request if location is non compliant", async () => {
    const updatedUser = {
      location: "a".repeat(31),
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });


  it("responds update with Bad Request if birthdate is non compliant", async () => {
    const updatedUser = {
      birthdate: {day: 52, month: 14},
    };

    const response = await request(api)
      .patch(`/users/${uid}`)
      .set("Authentication", `Bearer ${correctToken}`)
      .send(updatedUser);

    expect(response.status).toBe(400);
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.updateOne).not.toHaveBeenCalled();
  });
});
