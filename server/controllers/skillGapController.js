const Profile = require("../models/Profile");
const CareerGoal = require("../models/CareerGoal");

const {
  analyzeSkillGap,
} = require("../services/skillGapService");

/*
 * Analyze Skill Gap
 * -----------------
 * Compares user's skills with the
 * requirements of their target role.
 */
const getSkillGap = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({
      user: userId,
    });

    const careerGoal = await CareerGoal.findOne({
      user: userId,
    });

    if (!profile || !careerGoal) {
      return res.status(404).json({
        success: false,
        message: "Profile or career goal not found",
      });
    }

    const skills = profile.skills || [];

    const targetRole = careerGoal.targetRole;

    const result = analyzeSkillGap(
      skills,
      targetRole
    );

    res.status(200).json({
      success: true,
      message: "Skill gap analyzed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkillGap,
};