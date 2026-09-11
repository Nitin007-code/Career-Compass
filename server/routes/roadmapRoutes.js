const express = require("express");

const {
  createRoadmap,
  getRoadmap,
  generateUserRoadmap,
} = require("../controllers/roadmapController");

const router = express.Router();

router.post(
  "/generate/:userId",
  generateUserRoadmap
);

module.exports = router;