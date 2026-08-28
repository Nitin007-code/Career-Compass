const mongoose = require("mongoose");

/*
  Skill Schema
  Stores skills associated with a user.
  Keeping skills structured allows CareerCompass to compare user skills with target-role reqs.
 */

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      enum: [
        "programming",
        "frontend",
        "backend",
        "database",
        "devops",
        "cloud",
        "data",
        "ai-ml",
        "soft-skill",
        "other",
      ],
      default: "other",
    },

    proficiency: {
      type: String,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "expert",
      ],
      default: "beginner",
    },

    yearsOfExperience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      default: 0,
    },

    source: { // Indicates where the skill information came from (user input, resume, assessment, etc.)
      type: String,
      enum: [
        "user",
        "resume",
        "assessment",
        "ai-analysis",
      ],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;