const CareerGoal = require("../models/CareerGoal");

/*
  Create Career Goal
 */
const createCareerGoal = async (req, res, next) => { // createCareerGoal function to handle the creation of a new career goal
  try {
    const careerGoal = await CareerGoal.create(req.body);

    res.status(201).json({
      success: true,
      message: "Career goal created successfully",
      data: careerGoal,
    });
  } catch (error) {
    next(error);
  }
};

/*
 Get Career Goals :-
  Returns all career goals belonging to a user.
 */
const getCareerGoals = async (req, res, next) => {
  try {
    const careerGoals = await CareerGoal.find({
      user: req.params.userId,
    });

    res.status(200).json({
      success: true,
      message: "Career goals retrieved successfully",
      data: careerGoals,
    });
  } catch (error) { // 
    next(error); // next(error) is called to pass the error to the next middleware for handling
  }
};
/*
  Update Career Goal
  Updates a specific career goal.
 */
const updateCareerGoal = async (req, res, next) => {
  try {
    const careerGoal = await CareerGoal.findByIdAndUpdate(
      req.params.goalId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!careerGoal) {
      return res.status(404).json({
        success: false,
        message: "Career goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Career goal updated successfully",
      data: careerGoal,
    });
  } catch (error) {
    next(error);
  }
};
/*
 Delete Career Goal
 Deletes a specific career goal.
 */
const deleteCareerGoal = async (req, res, next) => {
  try {
    const careerGoal = await CareerGoal.findByIdAndDelete(
      req.params.goalId
    );

    if (!careerGoal) {
      return res.status(404).json({
        success: false,
        message: "Career goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Career goal deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCareerGoal,
  getCareerGoals,
  updateCareerGoal,
  deleteCareerGoal,
};