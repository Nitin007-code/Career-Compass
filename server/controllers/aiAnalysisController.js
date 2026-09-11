const Profile = require("../models/Profile");
const CareerGoal = require("../models/CareerGoal");
const Resume = require("../models/Resume");

const {
  generateAIResponse,
} = require("../services/aiService");

/*
 * Analyze Career :-
  Collects user career data and sends it to the AI service for analysis.
 */
const analyzeCareer = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Get user's profile
    const profile = await Profile.findOne({
      user: userId,
    });

    // Get user's career goal
    const careerGoal = await CareerGoal.findOne({
      user: userId,
    });

    // Get user's latest resume
    const resume = await Resume.findOne({
      user: userId,
    }).sort({ createdAt: -1 });

    if (!profile && !careerGoal && !resume) {
      return res.status(404).json({
        success: false,
        message: "No career data found for this user",
      });
    }

    /*
      Build the info. that will eventually be sent to the LLM.
     */
    const prompt = `
Analyze this user's career profile.

Profile:
${JSON.stringify(profile)}

Career Goal:
${JSON.stringify(careerGoal)}

Resume:
${JSON.stringify(resume)}

Provide:
1. Career match score
2. Strengths
3. Weaknesses
4. Recommendations
`;

    const analysis = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      message: "Career analysis generated successfully",
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeCareer,
};