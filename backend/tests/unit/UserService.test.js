const UserService = require("../../services/userService");

jest.mock("../../repositories/UserRepository");

// Mock the repository for testing
const mockUserRepository = {
  save: jest.fn(),
};

// Set up the repository for the service
UserService.useRepository(mockUserRepository);

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user with valid input", async () => {
    // Mock the repository's create method to resolve with user data
    const userData = {
      name: "John Doe",
      sex: "Male",
      age: 30,
      country: "USA",
    };
    const createdUser = { ...userData, dateCreated: new Date() };
    mockUserRepository.save.mockResolvedValue(createdUser);

    const user = await UserService.create(userData);

    expect(user).toEqual(createdUser);
    expect(mockUserRepository.save).toHaveBeenCalledWith({
      ...userData,
      dateCreated: expect.any(Date),
    });
  });

  it("should handle errors when creating a user", async () => {
    // Mock the repository's create method to reject with an error
    const userData = {
      name: "Alice",
      sex: "Female",
      age: 25,
      country: "Canada",
    };
    const error = new Error("An error occurred while creating the user");
    error.user = userData;
    mockUserRepository.save.mockRejectedValue(error);

    try {
      await UserService.create(userData);
    } catch (err) {
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        ...userData,
        dateCreated: expect.any(Date),
      });
      expect(err.message).toBe("An error occurred while creating the user");
      expect(err.user).toEqual(userData);
    }
  });
});
