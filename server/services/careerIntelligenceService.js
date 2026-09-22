const Profile = require("../models/Profile");
const CareerGoal = require("../models/CareerGoal");
const Resume = require("../models/Resume");
const AIAnalysis = require("../models/AIAnalysis");
const Roadmap = require("../models/Roadmap");

const { analyzeResume } = require("./aiService");

const {
  analyzeSkillGap,
  getRequiredSkills,
} = require("./skillGapService");

const { generateRoadmap } = require("./roadmapService");


/*
  Generate Career Intelligence

  Flow:

  Career Goal -> Target Role ->Role Requirements ->Resume Analysis ->Skill Gap -> Personalized Roadmap
    
  
*/
const generateCareerIntelligence = async (
  userId
) => {

  /*
    Get user's profile.
  */
  const profile =
    await Profile.findOne({
      user: userId,
    });


  /*
    Get user's career goal.
  */
  const careerGoal =
    await CareerGoal.findOne({
      user: userId,
    });


  /*
    Get user's latest resume.
  */
  const resume =
    await Resume.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });


  /*
    Profile and career goal are required
    for career intelligence.
  */
  if (!profile || !careerGoal) {
    throw new Error(
      "Profile or career goal not found"
    );
  }


  /*
    Get required skills for the selected
    career role.

   
  */
  const requiredSkills =
    getRequiredSkills(
      careerGoal.targetRole
    );


  /*
    Step 1:
    Analyze the resume against the selected career role.
  */
  let resumeAnalysis = null;

  if (resume && resume.text) {
    resumeAnalysis =
      await analyzeResume(
        resume.text,
        requiredSkills
      );
  }


  /*
  

    This means the user gets credit for skills explicitly added to their profile as well as skills detected from the uploaded resume.
  */
  const profileSkills =
    profile.skills || [];

  const resumeSkills =
    resumeAnalysis?.detectedSkills || [];


  /*
    Remove duplicate skills.
  */
  const combinedSkills = [
    ...new Set([
      ...profileSkills,
      ...resumeSkills,
    ]),
  ];


  /*
    Step 3:
    Analyze skill gap for the selected role.
  */
  const skillGap =
    analyzeSkillGap(
      combinedSkills,
      careerGoal.targetRole
    );


  /*
    Step 4:
    Generate roadmap directly from the missing skills.

    Therefore the roadmap is automatically role-specific.
  */
  const roadmap =
    generateRoadmap(
      skillGap
    );


  /*
    Step 5:
    Save AI analysis.
  */
  const savedAnalysis =
    await AIAnalysis.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        careerGoal: careerGoal._id,
        type: "career-analysis",

        summary:
          `Career analysis for the ${careerGoal.targetRole} role based on the user's resume and career profile.`,

        strengths:
          resumeAnalysis?.strengths || [],

        weaknesses:
          resumeAnalysis?.weaknesses || [],

        recommendations:
          resumeAnalysis?.suggestions || [],

        confidenceScore:
          resumeAnalysis?.score || 0,

        model:
          "mock-ai",
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );


  /*
    Step 6:
    Save/update personalized roadmap.
  */
  const savedRoadmap =
    await Roadmap.findOneAndUpdate(
      { user: userId },
      {
        user: userId,

        targetRole:
          roadmap.targetRole,

        totalPhases:
          roadmap.totalPhases,

        phases:
          roadmap.phases,
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