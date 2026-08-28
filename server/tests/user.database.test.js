require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

describe("User Database Operations", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });


  afterAll(async () => {
    await mongoose.connection.close();
  });


  test("should create and retrieve a user from MongoDB", async () => {

    const email = `test-${Date.now()}@careercompass.com`;

    // Create a temporary test user.
    const createdUser = await User.create({
      name: "Database Test User",
      email,
      password: "password123",
    });

    // Verify MongoDB generated an ID.
    expect(createdUser._id).toBeDefined();

    // Find the same user from MongoDB.
    const foundUser = await User.findById(createdUser._id);

    expect(foundUser).not.toBeNull();
    expect(foundUser.name).toBe("Database Test User");
    expect(foundUser.email).toBe(email);
    expect(foundUser.role).toBe("user");

    // Clean up the temporary test user.
    await User.findByIdAndDelete(createdUser._id);
  });

});