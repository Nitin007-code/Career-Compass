


const express = require("express");

const {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
  uploadResume,
  analyzeResumeController,
} = require("../controllers/resumeController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/*
 * POST /api/resumes/upload
  Upload and extract a PDF resume.
 
 *IMPORTANT: -
  This must come BEFORE /:userId
 */
router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);

/*
  POST /api/resumes/analyze
 */
router.post(
  "/analyze",
  analyzeResumeController
);

/*
  POST /api/resumes
 */
router.post("/", createResume);

/*
  GET /api/resumes/:userId
 */
router.get("/:userId", getResumes);

/*
  PUT /api/resumes/:resumeId
 */
router.put("/:resumeId", updateResume);

/*
  DELETE /api/resumes/:resumeId
 */
router.delete("/:resumeId", deleteResume);

module.exports = router;