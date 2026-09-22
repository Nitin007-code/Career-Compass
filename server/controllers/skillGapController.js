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

/*
  Analyze Skill Gap

  This controller analyzes the gap between the user's current skills and the skills required for their selected career role.
*/
const getSkillGap = async (req, res, next) => {
  try {
    const { userId } = req.params;

    /*
      Get user's profile.
    */
    const profile = await Profile.findOne({
      user: userId,
    });

    /*
      Get user's career goal.
    */
    const careerGoal = await CareerGoal.findOne({
      user: userId,
    });

    /*
      Get user's latest resume.
    */
    const resume = await Resume.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    if (!profile || !careerGoal) {
      return res.status(404).json({
        success: false,
        message: "Profile or career goal not found",
      });
    }

    const targetRole = careerGoal.targetRole;

    /*
      Get skills required for the selected role.
    */
    const requiredSkills =
      getRequiredSkills(targetRole);

    /*
      Skills already saved in the user's profile.
    */
    const profileSkills =
      profile.skills || [];

    /*
      Detect role-specific skills from the uploaded resume.
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

      Set removes duplicate skills.
    */
    const combinedSkills = [
      ...new Set([
        ...profileSkills,
        ...resumeSkills,
      ]),
    ];

    /*
      Analyze the final skill gap.
    */
    const result = analyzeSkillGap(
      combinedSkills,
      targetRole
    );

    res.status(200).json({
      success: true,
      message:
        "Skill gap analyzed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkillGap,
};