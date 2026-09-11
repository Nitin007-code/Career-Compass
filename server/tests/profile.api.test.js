require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const User = require("../models/User");
const Profile = require("../models/Profile");

describe("Profile API", () => {
  let user;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    user = await User.create({
      name: "Profile API Test User",
      email: `profile-api-${Date.now()}@careercompass.com`,
      password: "testpassword123",
    });

    userId = user._id;
  });

  afterAll(async () => {
    await Profile.deleteOne({ user: userId });
    await User.findByIdAndDelete(userId);

    await mongoose.connection.close();
  });

  test("should create a profile", async () => {
    const response = await request(app)
      .post("/api/profile")
      .send({
        user: userId,
        education: {
          degree: "B.Tech",
          branch: "Computer Science",
          college: "Test College",
          graduationYear: 2027,
        },
        experienceLevel: "student",
        skills: ["C++", "React", "Node.js"],
        targetRole: "Software Engineer",
        bio: "Test profile.",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.toString()).toBe(
      userId.toString()
    );
  });

  test("should retrieve the profile", async () => {
    const response = await request(app)
      .get(`/api/profile/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.targetRole).toBe(
      "Software Engineer"
    );
  });

  test("should update the profile", async () => {
    const response = await request(app)
      .put(`/api/profile/${userId}`)
      .send({
        targetRole: "Full Stack Developer",
        experienceLevel: "fresher",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.targetRole).toBe(
      "Full Stack Developer"
    );
  });

  test("should delete the profile", async () => {
    const response = await request(app)
      .delete(`/api/profile/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("should return 404 after profile deletion", async () => {
    const response = await request(app)
      .get(`/api/profile/${userId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});