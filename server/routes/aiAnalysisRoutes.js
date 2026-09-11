const express = require("express");

const {
  analyzeCareer,
} = require("../controllers/aiAnalysisController");

const router = express.Router();

/*
 * POST /api/ai-analysis/:userId
 * Generate career analysis.
 */
router.post("/:userId", analyzeCareer);

module.exports = router;