require("dotenv").config();

const {
  generateAIResponse,
} = require("./services/aiService");

const testAI = async () => {
  try {
    const result = await generateAIResponse(
      "Analyze a student targeting a Software Engineer role."
    );

    console.log("AI Result:");
    console.log(result);
  } catch (error) {
    console.error("AI request failed:");
    console.error(error.message);
  }
};

testAI();