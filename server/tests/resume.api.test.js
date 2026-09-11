require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const User = require("../models/User");
const Resume = require("../models/Resume");

describe("Resume API", () => {
  let user;
  let userId;
  let resumeId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    user = await User.create({
      name: "Resume API Test User",
      email: `resume-api-${Date.now()}@careercompass.com`,
      password: "testpassword123",
    });

    userId = user._id;
  });

  afterAll(async () => {
    await Resume.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    await mongoose.connection.close();
  });

  test("should create a resume", async () => {
    const response = await request(app)
      .post("/api/resumes")
      .send({
        user: userId,
        title: "Software Engineer Resume",
        fileName: "resume.pdf",
        fileUrl: "/uploads/resume.pdf",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    resumeId = response.body.data._id;

    expect(response.body.data.user.toString()).toBe(
      userId.toString()
    );
  });

  test("should retrieve resumes", async () => {
    const response = await request(app)
      .get(`/api/resumes/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test("should update a resume", async () => {
    const response = await request(app)
      .put(`/api/resumes/${resumeId}`)
      .send({
        title: "Backend Developer Resume",
        fileName: "backend-resume.pdf",
        fileUrl: "/uploads/backend-resume.pdf",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data.title).toBe(
      "Backend Developer Resume"
    );
  });

  test("should delete a resume", async () => {
    const response = await request(app)
      .delete(`/api/resumes/${resumeId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("should return 404 when deleting a non-existent resume", async () => {
    const response = await request(app)
      .delete(`/api/resumes/${resumeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });
});