const User = require("../models/User");

describe("User Model", () => {

  test("should create a valid user object", () => {
    const user = new User({
      name: "Test User",
      email: "test@careercompass.com",
      password: "password123",
    });

    const error = user.validateSync(); // Validate the user object without saving to the database.

    expect(error).toBeUndefined(); // No validation errors should be present.
    expect(user.role).toBe("user");
  });


  test("should require name, email and password", () => {
    const user = new User({});

    const error = user.validateSync();

    expect(error).toBeDefined();

    expect(error.errors.name).toBeDefined();      // Check if the name field has a validation error.
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });


  test("should reject an invalid role", () => {
    const user = new User({
      name: "Test User",
      email: "test@careercompass.com",
      password: "password123",
      role: "student",
    });

    const error = user.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.role).toBeDefined();
  });

});