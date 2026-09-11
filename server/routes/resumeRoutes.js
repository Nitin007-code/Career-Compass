// const express = require("express");

// const {
//   createResume,
//   getResumes,
//   updateResume,
//    deleteResume,
//     uploadResume,
//       analyzeResumeController,
// } = require("../controllers/resumeController");

// const upload = require("../middleware/uploadMiddleware");

// const router = express.Router();

// /*
//  POST /api/resumes
//  Create a resume.
//  */
// router.post("/", createResume);
// router.post(
//   "/upload",
//   upload.single("resume"),
//   uploadResume,
//   router.post(
//   "/analyze",
//   analyzeResumeController
// )
// );

// /*
//   GET /api/resumes/:userId
//   Get all resumes belonging to a user.
//  */
// router.get("/:userId", getResumes);
// router.put("/:resumeId", updateResume);
// router.delete("/:resumeId", deleteResume);

// module.exports = router;


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
 * Upload and extract a PDF resume.
 *
 * IMPORTANT:
 * This must come BEFORE /:userId
 */
router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);

/*
 * POST /api/resumes/analyze
 */
router.post(
  "/analyze",
  analyzeResumeController
);

/*
 * POST /api/resumes
 */
router.post("/", createResume);

/*
 * GET /api/resumes/:userId
 */
router.get("/:userId", getResumes);

/*
 * PUT /api/resumes/:resumeId
 */
router.put("/:resumeId", updateResume);

/*
 * DELETE /api/resumes/:resumeId
 */
router.delete("/:resumeId", deleteResume);

module.exports = router;