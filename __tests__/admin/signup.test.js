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

  test("should give error for already present user", async () => {
    const response = await request(app)
      .post("/api/admin/signup")
      .send({
        username: "admin",
        email: "admin@yopmail.com",
        password: "admin@123",
      })
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual({
      message: `admin@yopmail.com is already registered`,
    });

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

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
