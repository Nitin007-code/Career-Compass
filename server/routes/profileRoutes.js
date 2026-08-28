const express = require("express");

const {
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

/*
  POST /api/profile
  Create a profile.
 */
router.post("/", createProfile);

/*
  GET /api/profile/:userId
  Get a user's profile.
 */
router.get("/:userId", getProfile);

/*
  PUT /api/profile/:userId
  Update a user's profile.
 */
router.put("/:userId", updateProfile);

module.exports = router;