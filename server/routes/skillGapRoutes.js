const express = require("express");

const {
  getSkillGap,
} = require("../controllers/skillGapController");

const router = express.Router();

/*
  GET /api/skill-gap/:userId
 */
router.get("/:userId", getSkillGap);

module.exports = router;