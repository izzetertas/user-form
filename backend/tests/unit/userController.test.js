const express = require("express");
const request = require("supertest");

const controller = require("../../controllers/userController");
const UserService = require("../../services/userService");

describe("User Creation Route", () => {
  let app;
  let userServiceCreateSpy;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/api/users", controller);

    // Create a spy for the create method of UserService
    userServiceCreateSpy = jest.spyOn(UserService, "create");
  });

  afterAll(() => {
    userServiceCreateSpy.mockRestore();
  });

  it("should create a user with valid input", async () => {
    // Spy on the create method to return a user
    userServiceCreateSpy.mockResolvedValue({
      name: "John Doe",
      sex: "Male",
      age: 30,
      country: "USA",
    });

    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      sex: "Male",
      age: 30,
      country: "USA",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
    expect(response.body).toHaveProperty("user");
  });

  it("should return a 400 status code with error message for invalid input", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Alice",
      sex: "Female",
      age: -5, // Invalid age
      country: "Canada",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
