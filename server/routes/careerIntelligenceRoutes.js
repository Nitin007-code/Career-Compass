const express = require("express");

const {
  getCareerIntelligence,
} = require("../controllers/careerIntelligenceController");

const router = express.Router();

/*
  GET /api/career-intelligence/:userId
 */
router.get(
  "/:userId",
  getCareerIntelligence
);

module.exports = router;