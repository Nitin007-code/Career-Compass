const mongoose = require("mongoose");

const careerGoalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      trim: true,
    },

    targetIndustry: {
      type: String,
      trim: true,
    },

    targetCompany: {
      type: String,
      trim: true,
    },

    targetLocation: {
      type: String,
      trim: true,
    },

    targetSalary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
    },

    timeline: {
      type: String,
      enum: [
        "3-months",
        "6-months",
        "1-year",
        "2-years",
        "long-term",
      ],
      default: "1-year",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const CareerGoal = mongoose.model("CareerGoal", careerGoalSchema);

module.exports = CareerGoal;