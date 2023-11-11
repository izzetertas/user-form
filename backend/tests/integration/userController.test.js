const express = require("express");
const request = require("supertest");
const router = require("../../controllers/userController"); // Adjust the path as needed
const UserService = require("../../services/userService");
const UserRepository = require("../../repositories/userRepository"); // Adjust the path as needed

const app = express();

UserService.useRepository(UserRepository);
app.use(express.json());
app.use("/api/users", router);

describe("UserController (Integration Tests)", () => {
  it("should create a user with valid input", async () => {
    const userData = {
      name: "John Doe",
      sex: "Male",
      age: 30,
      country: "USA",
    };

    const response = await request(app).post("/api/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
    expect(response.body).toHaveProperty("user");
  });

  it("should return a 400 status code with error message for invalid input", async () => {
    const userData = {
      name: "Alice",
      sex: "Female",
      age: -5, // Invalid age
      country: "Canada",
    };

    const response = await request(app).post("/api/users").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
