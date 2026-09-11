const express = require("express");

const {
  createCareerGoal,
  getCareerGoals,
    updateCareerGoal,
    deleteCareerGoal
} = require("../controllers/careerGoalController");

const router = express.Router();

/*
  POST /api/career-goals
  Create a career goal.
 */
router.post("/", createCareerGoal);

/*
  GET /api/career-goals/:userId
  Get all career goals for a user.
 */
router.get("/:userId", getCareerGoals);
/*
 PUT /api/career-goals/:goalId
  Update a career goal.
 */
router.put("/:goalId", updateCareerGoal);

/*
  DELETE /api/career-goals/:goalId
  Delete a career goal.
 */
router.delete("/:goalId", deleteCareerGoal);

module.exports = router;