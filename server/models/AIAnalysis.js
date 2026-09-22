const mongoose = require("mongoose");

/*
  AI Analysis Schema
 Stores structured results produced by CareerCompass AI.
  keep AI output separate from the user's org.
  profile/resume data so the analysis can be regeneratedwithout modifying the original information.
 */

const aiAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    careerGoal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerGoal",
    },

    type: {
      type: String,
      enum: [
        "career-analysis",
        "resume-analysis",
        "skill-gap",
        "roadmap-analysis",
      ],
      required: [true, "Analysis type is required"],
    },

    summary: {
      type: String,
      required: [true, "Analysis summary is required"],
      trim: true,
    },

    strengths: [
      {
        type: String,
        trim: true,
      },
    ],

    weaknesses: [
      {
        type: String,
        trim: true,
      },
    ],

    skillGaps: [
      {
        skill: {
          type: String,
          trim: true,
        },

        importance: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },

        recommendation: {
          type: String,
          trim: true,
        },
      },
    ],

    recommendations: [
      {
        type: String,
        trim: true,
      },
    ],

    confidenceScore: {
      type: Number,
      min: [0, "Confidence score cannot be below 0"],
      max: [100, "Confidence score cannot exceed 100"],
    },

    model: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AIAnalysis = mongoose.model("AIAnalysis", aiAnalysisSchema);

module.exports = AIAnalysis;