const multer = require("multer");
const path = require("path");
const fs = require("fs");

/*
  Make sure the uploads directory exists.
 */
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

/*
  Store uploaded files inside server/uploads.
 */
const storage = multer.diskStorage({ // it will Configure multer to store uploaded files on disk.
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

/*
  Only allow PDF files.
 */
const fileFilter = (req, file, cb) => { 
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;

// multer
//   ↓
// multipart/form-data
//   ↓
// PDF file
//   ↓
// server/uploads/