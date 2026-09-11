const Profile = require("../models/Profile");
const CareerGoal = require("../models/CareerGoal");
const Resume = require("../models/Resume");
const AIAnalysis = require("../models/AIAnalysis");
const Roadmap = require("../models/Roadmap");

const { analyzeResume } = require("./aiService");
const { analyzeSkillGap } = require("./skillGapService");
const { generateRoadmap } = require("./roadmapService");

/*
 * Generate Career Intelligence :-
  Collects the user's career data,generates analysis, skill gap and roadmap, then saves the results in MongoDB.
 */
const generateCareerIntelligence = async (userId) => {
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

  if (!profile || !careerGoal) {
    throw new Error(
      "Profile or career goal not found"
    );
  }

  /*
    Step 1:
    Analyze resume if resume text exists.
   */
  let resumeAnalysis = null;

  if (resume && resume.text) {
    resumeAnalysis = await analyzeResume(
      resume.text
    );
  }

  /*
    Step 2:
    Analyze user's skill gap.
   */
  const skillGap = analyzeSkillGap(
    profile.skills || [],
    careerGoal.targetRole
  );

  /*
    Step 3:
    Generate personalized roadmap.
   */
  const roadmap = generateRoadmap(
    skillGap
  );

  /*
    Step 4:
    Save AI analysis in MongoDB.
   
    findOneAndUpdate + upsert:
    - Updates existing analysis
    - Creates one if it doesn't exist
   */
 
  const savedAnalysis =
    await AIAnalysis.findOneAndUpdate(
      { user: userId },
     {
  user: userId,
  careerGoal: careerGoal._id,
  type: "career-analysis",
  summary: "AI-generated career analysis based on the user's resume and career goal.",
  strengths: resumeAnalysis?.strengths || [],
  weaknesses: resumeAnalysis?.weaknesses || [],
  recommendations: resumeAnalysis?.suggestions || [],
  confidenceScore: resumeAnalysis?.score || 0,
  model: "mock-ai",
},
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

  /*
    Step 5:
   Save/update roadmap in MongoDB.
   */
  const savedRoadmap =
    await Roadmap.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        targetRole: roadmap.targetRole,
        totalPhases: roadmap.totalPhases,
        phases: roadmap.phases,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

  /*
    Return complete career intelligence.
   */
  return {
    careerGoal,
    resumeAnalysis,
    skillGap,
    aiAnalysis: savedAnalysis,
    roadmap: savedRoadmap,
  };
};

module.exports = {
  generateCareerIntelligence,
};