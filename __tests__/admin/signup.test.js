const request = require("supertest");
const app = require("../../app");
const { AdminAuth } = require("../../models/admin/auth.model");

describe("Signup route", () => {
  beforeEach(async () => {
    // Clear the admin auth collection in the database to ensure a clean state before each test
    await AdminAuth.deleteMany({});
  });

  test("should sign up a user - 201 OK", async () => {
    const testData = {
      data: {
        email_id: "admin@yopmail.com",
        username: "admin",
      },
      message: "Signup successfully",
      success: true,
    };

    const response = await request(app)
      .post("/api/admin/signup")
      .send({
        username: "admin",
        email_id: "admin@yopmail.com",
        password: "admin@123",
      })
      .expect("Content-Type", /json/);

    const expectedResponse = {
      data: expect.objectContaining(testData.data),
      message: testData.message,
      success: testData.success,
    };

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  test("should not sign up a user if user exist already - 401", async () => {
    const testData = {
      username: "admin",
      email_id: "admin@yopmail.com",
      password: "admin@123",
    };

    await AdminAuth.create(testData);

    const response = await request(app)
      .post("/api/admin/signup")
      .send({
        username: "admin",
        email_id: "admin@yopmail.com",
        password: "admin@123",
      })
      .expect("Content-Type", /json/);

    const expectedResponse = {
      data: expect.objectContaining(testData.data),
      message: testData.message,
      success: testData.success,
    };

    expect(response.statusCode).toBe(401);
  });
});
