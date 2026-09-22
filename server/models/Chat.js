const mongoose = require("mongoose");

/*
 Chat Schema :-
  Stores conversations between a user nd AI. Each chat contains multiple msgs.
 */

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    title: {
      type: String,
      trim: true,
      default: "Career Discussion",
    },

    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },

        content: {
          type: String,
          required: [true, "Message content is required"],
          trim: true,
        },

        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    context: {
      type: String,
      enum: [
        "general",
        "career",
        "resume",
        "skills",
        "roadmap",
        "interview",
      ],
      default: "general",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;