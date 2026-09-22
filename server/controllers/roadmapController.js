const Profile = require("../models/Profile");
const CareerGoal = require("../models/CareerGoal");
const Resume = require("../models/Resume");

const {
  analyzeSkillGap,
  getRequiredSkills,
} = require("../services/skillGapService");

const {
  detectResumeSkills,
} = require("../services/aiService");

const {
  generateRoadmap,
} = require("../services/roadmapService");

/*
  Generate Personalized Roadmap

  The roadmap is generated from the user's:

  - Profile skills
  - Latest resume skills
  - Selected career role

  The missing skills for that role become
  the roadmap learning phases.
*/
const generateUserRoadmap = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;

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

    if (!profile || !careerGoal) {
      return res.status(404).json({
        success: false,
        message:
          "Profile or career goal not found",
      });
    }

    /*
      Target role selected by the user.
    */
    const targetRole =
      careerGoal.targetRole;

    /*
      Get the skills required for
      the selected role.
    */
    const requiredSkills =
      getRequiredSkills(targetRole);

    /*
      Get skills saved in the profile.
    */
    const profileSkills =
      profile.skills || [];

    /*
      Detect role-specific skills
      from the latest resume.
    */
    let resumeSkills = [];

    if (resume && resume.text) {
      resumeSkills =
        detectResumeSkills(
          resume.text,
          requiredSkills
        );
    }

    /*
      Combine profile and resume skills.
      Remove duplicates.
    */
    const combinedSkills = [
      ...new Set([
        ...profileSkills,
        ...resumeSkills,
      ]),
    ];

    /*
      Analyze the skill gap using
      the selected career role.
    */
    const skillGap =
      analyzeSkillGap(
        combinedSkills,
        targetRole
      );

    /*
      Generate roadmap from the
      missing skills.
    */
    const roadmap =
      generateRoadmap(skillGap);

    res.status(200).json({
      success: true,
      message:
        "Personalized roadmap generated successfully",
      data: roadmap,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateUserRoadmap,
};