const {
  generateCareerIntelligence,
} = require("../services/careerIntelligenceService");

/*
  Generate complete career intelligence.
*/
const getCareerIntelligence = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;

    const result =
      await generateCareerIntelligence(userId);

    res.status(200).json({
      success: true,
      message:
        "Career intelligence generated successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Career Intelligence Error:",
      error
    );

    next(error);
  }
};

module.exports = {
  getCareerIntelligence,
};