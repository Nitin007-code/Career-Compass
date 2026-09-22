import { useEffect, useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import API from "./api";

function Resume() {
  const userId = localStorage.getItem("userId");

  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /*
    Fetch uploaded resumes for the current user.
  */
  useEffect(() => {
    const fetchResumes = async () => {
      if (!userId) {
        setError("Please register first.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          `/resumes/${userId}`
        );

        setResumes(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load resumes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [userId]);

  /*
    Handle PDF selection.
  */
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file || null);
    setMessage("");
    setError("");
  };

  /*
    Upload the selected resume.
  */
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF resume.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    if (!userId) {
      setError("Please register first.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", selectedFile);
    formData.append("userId", userId);

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const response = await API.post(
        "/resumes/upload",
        formData
      );

      setMessage(
        "Resume uploaded successfully."
      );

      setResumes((currentResumes) => [
        ...currentResumes,
        response.data.data,
      ]);

      setSelectedFile(null);

      document.getElementById(
        "resume-file"
      ).value = "";
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="resume-loading">
        <FileText size={22} />
        <p>Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="resume-page">
      {/* Header */}
      <div className="resume-header">
        <div>
          <p className="section-eyebrow">
            CAREER DOCUMENT
          </p>

          <h1>Resume</h1>

          <p>
            Upload your resume to receive personalized career guidance and analysis.
          </p>
        </div>

        <div className="resume-header-icon">
          <FileText size={30} />
        </div>
      </div>

      {/* Upload Card */}
      <div className="resume-upload-card">
        <div className="resume-card-heading">
          <div className="resume-card-icon">
            <Upload size={20} />
          </div>

          <div>
            <p className="section-eyebrow">
              RESUME UPLOAD
            </p>

            <h2>Upload Your Resume</h2>
          </div>
        </div>

        <p className="card-description resume-upload-description">
          Upload a PDF version of your resume.
          Career-Compass will extract the information and use it for your career analysis.
        </p>

        {/* File Input */}
        <div className="resume-file-area">
          <label
            htmlFor="resume-file"
            className="resume-file-label"
          >
            <FileText size={22} />

            <span>
              {selectedFile
                ? "Change selected PDF"
                : "Choose your resume PDF"}
            </span>

            <small>
              PDF files only
            </small>
          </label>

          <input
            id="resume-file"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="selected-resume">
            <div className="selected-resume-icon">
              <FileCheck2 size={18} />
            </div>

            <div className="selected-resume-info">
              <p className="selected-resume-label">
                SELECTED FILE
              </p>

              <p className="selected-resume-name">
                {selectedFile.name}
              </p>
            </div>

            <CheckCircle2
              size={19}
              className="selected-resume-check"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          type="button"
          className="primary-button resume-upload-button"
          onClick={handleUpload}
          disabled={uploading}
        >
          <Upload size={17} />

          {uploading
            ? "Uploading..."
            : "Upload Resume"}
        </button>

        {message && (
          <p className="resume-success">
            <CheckCircle2 size={16} />
            {message}
          </p>
        )}

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}
      </div>

      {/* Uploaded Resumes */}
      <div className="resume-list-card">
        <div className="resume-list-heading">
          <div>
            <p className="section-eyebrow">
              DOCUMENT HISTORY
            </p>

            <h2>Your Resumes</h2>
          </div>

          <span className="resume-count">
            {resumes.length}
          </span>
        </div>

        {resumes.length === 0 ? (
          <div className="resume-empty">
            <FileText size={28} />

            <p>No resumes uploaded yet.</p>

            <span>
              Upload your first resume above to begin
              your career analysis.
            </span>
          </div>
        ) : (
          <div className="resume-list">
            {resumes.map((resume) => (
              <div
                className="resume-item"
                key={resume._id}
              >
                <div className="resume-item-icon">
                  <FileText size={20} />
                </div>

                <div className="resume-item-content">
                  <p className="resume-item-label">
                    RESUME
                  </p>

                  <h3>{resume.title}</h3>

                  {resume.createdAt && (
                    <p className="resume-item-date">
                      Uploaded{" "}
                      {new Date(
                        resume.createdAt
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <CheckCircle2
                  size={18}
                  className="resume-item-check"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;