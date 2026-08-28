const mongoose = require("mongoose");
const AIAnalysis = require("../models/AIAnalysis");

describe("AI Analysis Model", () => {

  test("should create a valid AI analysis", () => {
    const analysis = new AIAnalysis({
      user: new mongoose.Types.ObjectId(),

      careerGoal: new mongoose.Types.ObjectId(),

      type: "skill-gap",

      summary:
        "The user has a good foundation but needs stronger backend and system design skills.",

      strengths: [
        "Strong programming fundamentals",
        "Good frontend knowledge",
      ],

      weaknesses: [
        "Limited backend experience",
        "Limited system design knowledge",
      ],

      skillGaps: [
        {
          skill: "Node.js",
          importance: "high",
          recommendation:
            "Build backend projects using Express and MongoDB.",
        },
      ],

      recommendations: [
        "Build two production-style projects",
        "Practice DSA consistently",
      ],

      confidenceScore: 85,

      model: "career-ai-v1",
    });

    const error = analysis.validateSync();

    expect(error).toBeUndefined();
    expect(analysis.skillGaps).toHaveLength(1);
  });


  test("should require analysis type", () => {
    const analysis = new AIAnalysis({
      user: new mongoose.Types.ObjectId(),
      summary: "Test analysis",
    });

    const error = analysis.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.type).toBeDefined();
  });


  test("should require an analysis summary", () => {
    const analysis = new AIAnalysis({
      user: new mongoose.Types.ObjectId(),
      type: "career-analysis",
    });

    const error = analysis.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.summary).toBeDefined();
  });


  test("should reject an invalid confidence score", () => {
    const analysis = new AIAnalysis({
      user: new mongoose.Types.ObjectId(),
      type: "career-analysis",
      summary: "Test analysis",
      confidenceScore: 150,
    });

    const error = analysis.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.confidenceScore).toBeDefined();
  });

});