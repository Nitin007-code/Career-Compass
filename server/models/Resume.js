const mongoose = require("mongoose");

/*
  Resume Schema :-
  Stores structured resume info. for a user.
 */

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
      maxlength: [1000, "Summary cannot exceed 1000 characters"],
    },

    education: [
      {
        degree: {
          type: String,
          trim: true,
        },

        institution: {
          type: String,
          trim: true,
        },

        graduationYear: {
          type: Number,
        },
      },
    ],

    experience: [
      {
        company: {
          type: String,
          trim: true,
        },

        role: {
          type: String,
          trim: true,
        },

        startDate: {
          type: Date,
        },

        endDate: {
          type: Date,
        },

        description: {
          type: String,
          trim: true,
        },
      },
    ],

    projects: [
      {
        name: {
          type: String,
          trim: true,
        },

        description: {
          type: String,
          trim: true,
        },

        technologies: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    certifications: [
      {
        name: {
          type: String,
          trim: true,
        },

        issuer: {
          type: String,
          trim: true,
        },

        year: {
          type: Number,
        },
      },
    ],

    fileName: {
      type: String,
      trim: true,
    },

    fileUrl: {
      type: String,
      trim: true,
    },

    text: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;