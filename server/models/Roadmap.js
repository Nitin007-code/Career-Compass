const mongoose = require("mongoose");

/*
 * Roadmap Schema
 * --------------
 * Stores a personalized career-learning roadmap.
 *
 * A roadmap belongs to a user and can contain
 * multiple learning steps.
 */

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    careerGoal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerGoal",
      required: [true, "Career goal reference is required"],
    },

    title: {
      type: String,
      required: [true, "Roadmap title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    duration: {
      type: Number,
      required: [true, "Roadmap duration is required"],
      min: [1, "Duration must be at least 1 month"],
    },

    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },

    steps: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },

        description: {
          type: String,
          trim: true,
        },

        skills: [
          {
            type: String,
            trim: true,
          },
        ],

        resources: [
          {
            title: {
              type: String,
              trim: true,
            },

            url: {
              type: String,
              trim: true,
            },

            type: {
              type: String,
              enum: [
                "course",
                "video",
                "article",
                "documentation",
                "practice",
                "project",
                "other",
              ],
              default: "other",
            },
          },
        ],

        order: {
          type: Number,
          required: true,
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;