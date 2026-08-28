const mongoose = require("mongoose");


//   Profile Schema :- 
//  it Stores career and academic info. about a user.
//  Auth. data stays inside User.
//   Career-related info. belongs here.
 

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },

    education: {
      degree: {
        type: String,
        trim: true, // Remove leading and trailing whitespace from the degree string.
      },

      branch: {
        type: String,
        trim: true,
      },

      college: {
        type: String,
        trim: true,
      },

      graduationYear: {
        type: Number,
      },
    },

    experienceLevel: {
      type: String,
      enum: [
        "student",
        "fresher",
        "entry-level",
        "experienced",
      ],
      default: "student",
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    targetRole: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;