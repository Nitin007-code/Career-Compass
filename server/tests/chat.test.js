const mongoose = require("mongoose");
const Chat = require("../models/Chat");

describe("Chat Model", () => {

  test("should create a valid chat", () => {
    const chat = new Chat({
      user: new mongoose.Types.ObjectId(),

      title: "Backend Career Discussion",

      context: "career",

      messages: [
        {
          role: "user",
          content: "What should I learn for backend development?",
        },

        {
          role: "assistant",
          content:
            "You should focus on Node.js, Express, databases and APIs.",
        },
      ],
    });

    const error = chat.validateSync();

    expect(error).toBeUndefined();
    expect(chat.messages).toHaveLength(2);
  });


  test("should require a user reference", () => {
    const chat = new Chat({
      context: "career",
    });

    const error = chat.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.user).toBeDefined();
  });


  test("should reject an invalid message role", () => {
    const chat = new Chat({
      user: new mongoose.Types.ObjectId(),

      messages: [
        {
          role: "bot",
          content: "Test response",
        },
      ],
    });

    const error = chat.validateSync();

    expect(error).toBeDefined();
    expect(error.errors["messages.0.role"]).toBeDefined();
  });


  test("should require message content", () => {
    const chat = new Chat({
      user: new mongoose.Types.ObjectId(),

      messages: [
        {
          role: "user",
        },
      ],
    });

    const error = chat.validateSync();

    expect(error).toBeDefined();
    expect(error.errors["messages.0.content"]).toBeDefined(); // Check for the specific error related to the missing content field in the first message.
  });

});