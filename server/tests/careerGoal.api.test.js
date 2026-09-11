require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const User = require("../models/User");
const CareerGoal = require("../models/CareerGoal");

describe("Career Goal API", () => {
  let user;
  let userId;
  let goalId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    user = await User.create({
      name: "Career Goal API Test User",
      email: `career-goal-${Date.now()}@careercompass.com`,
      password: "testpassword123",
    });

    userId = user._id;
  });

  afterAll(async () => {
    await CareerGoal.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    await mongoose.connection.close();
  });

  test("should create a career goal", async () => {
    const response = await request(app)
      .post("/api/career-goals")
      .send({
        user: userId,
        targetRole: "Software Engineer",
        targetIndustry: "Technology",
        targetLocation: "India",
        timeline: "1-year",
        priority: "high",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    goalId = response.body.data._id;

    expect(response.body.data.user.toString()).toBe(
      userId.toString()
    );

    expect(response.body.data.targetRole).toBe(
      "Software Engineer"
    );
  });

  test("should retrieve career goals", async () => {
    const response = await request(app)
      .get(`/api/career-goals/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test("should update a career goal", async () => {
    const response = await request(app)
      .put(`/api/career-goals/${goalId}`)
      .send({
        targetRole: "Backend Developer",
        priority: "medium",
        timeline: "6-months",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data.targetRole).toBe(
      "Backend Developer"
    );

    expect(response.body.data.priority).toBe("medium");
  });

  test("should delete a career goal", async () => {
    const response = await request(app)
      .delete(`/api/career-goals/${goalId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("should return 404 when deleting a non-existent goal", async () => {
    const response = await request(app)
      .delete(`/api/career-goals/${goalId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});