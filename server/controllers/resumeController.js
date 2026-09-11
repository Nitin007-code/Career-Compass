const Resume = require("../models/Resume");

/*Create Resume :-
  Creates a resume record for a user.
 */
const createResume = async (req, res, next) => {
  try {
    const resume = await Resume.create(req.body);

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};


/*
  Get Resume :-
 Retrieves all resumes belonging to a user.
 */
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({
      user: req.params.userId,
    });

    res.status(200).json({
      success: true,
      message: "Resumes retrieved successfully",
      data: resumes,
    });
  } catch (error) {
    next(error);
  }
};
/*
 Update Resume :-
  Updates a specific resume.
 */
const updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.resumeId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};
/*
  Delete Resume
  Deletes a specific resume.
 */
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndDelete(
      req.params.resumeId
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const {
  extractPdfText,
} = require("../services/pdfService");

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const extractedText = await extractPdfText(
      req.file.path
    );

    /*
    Save extracted resume text.userId should come from the req. for now. JWT auth. will later provide this securely.
     */
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const resume = await Resume.create({
      user: userId,
      title: req.file.originalname,
      fileName: req.file.filename,
      fileUrl: req.file.path,
      text: extractedText,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};
const {
  analyzeResume,
} = require("../services/aiService");
/*
  Analyze Resume :-
  Takes extracted resume text and generates an AI-based analysis.
 */
const analyzeResumeController = async (req, res, next) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required",
      });
    }

    const analysis = await analyzeResume(
      resumeText
    );

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
  uploadResume,
  analyzeResumeController
};