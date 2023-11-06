const request = require("supertest");
const app = require("../../app");

describe("Signup route", () => {
  const testResponse = {
    data: {
      email: "admin@yopmail.com",
      username: "admin",
    },
    message: "Signup successfully",
    success: true,
  };

  test("should sign up a user with valid input", async () => {
    const response = await request(app)
      .post("/api/admin/signup")
      .send({
        username: "admin",
        email: "admin@yopmail.com",
        password: "admin@123",
      })
      .expect("Content-Type", /json/);

    const expectedResponse = {
      data: expect.objectContaining(testResponse.data),
      message: testResponse.message,
      success: testResponse.success,
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
});
