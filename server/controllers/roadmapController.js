const Profile = require("../models/Profile");
const CareerGoal = require("../models/CareerGoal");

const {
  analyzeSkillGap,
} = require("../services/skillGapService");

const {
  generateRoadmap,
} = require("../services/roadmapService");

/*
 Gen. Personal. Roadmap
 */
const generateUserRoadmap = async (req, res, next) => {
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

    const skillGap = analyzeSkillGap(
      profile.skills || [],
      careerGoal.targetRole
    );

    const roadmap = generateRoadmap(skillGap);

    res.status(200).json({
      success: true,
      message: "Personalized roadmap generated successfully",
      data: roadmap,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateUserRoadmap,
};