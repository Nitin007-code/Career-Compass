import { useEffect, useState } from "react";
import {
  BrainCircuit,
  FileText,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import API from "./api";

function AIAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!userId) {
        setError("Please register first.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          `/career-intelligence/${userId}`
        );

        setAnalysis(response.data.data);
      } catch (error) {
        console.error(
          "AI analysis fetch failed:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to generate AI analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [userId]);

  if (loading) {
    return (
      <div className="ai-loading">
        <div className="ai-loading-icon">
          <BrainCircuit size={22} />
        </div>

        <p>Generating AI career analysis...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!analysis) {
    return (
      <p className="muted-text">
        No AI analysis available.
      </p>
    );
  }

  const resumeAnalysis = analysis.resumeAnalysis;
  const aiAnalysis = analysis.aiAnalysis;

  const resumeScore = resumeAnalysis?.score ?? 0;

  const careerMatch =
    aiAnalysis?.confidenceScore ?? 0;

  const scoreMessage =
    careerMatch >= 75
      ? "Strong career foundation"
      : careerMatch >= 50
      ? "Good career foundation"
      : "Build your career foundation";

  return (
    <div className="ai-analysis-page">

{/* ai -hero */}

      <div className="ai-analysis-hero">

        <div className="ai-hero-content">

          <div className="ai-hero-label">
            <Sparkles size={14} />
            AI-POWERED CAREER INTELLIGENCE
          </div>

          <h1>
            Understand where you stand
            <br />
            <span>and what to improve.</span>
          </h1>

          <p>
            Your personalized AI assessment analyzes your resume and career direction to help you make smarter next moves.
          </p>

          <div className="ai-hero-status">
            <div className="ai-status-dot" />

            <span>
              Career analysis ready
            </span>

            <ArrowUpRight size={15} />
          </div>

        </div>

        {/* AI Visual */}

        <div className="ai-hero-visual">

          <div className="ai-hero-glow" />

          <div className="ai-orbit ai-orbit-one" />
          <div className="ai-orbit ai-orbit-two" />

          <div className="ai-core">

            <BrainCircuit size={42} />

            <span>
              AI
            </span>

          </div>

          <div className="ai-floating-card ai-floating-top">

            <FileText size={15} />

            <div>
              <small>
                Resume
              </small>

              <strong>
                {resumeScore}%
              </strong>
            </div>

          </div>

          <div className="ai-floating-card ai-floating-right">

            <Target size={15} />

            <div>
              <small>
                Career Match
              </small>

              <strong>
                {careerMatch}%
              </strong>
            </div>

          </div>

        </div>

      </div>

{/* career-score */}

      <div className="ai-career-score-card">

        <div className="ai-career-score-intro">

          <p className="section-eyebrow">
            OVERALL ASSESSMENT
          </p>

          <h2>
            Your Career Score
          </h2>

          <p>
            A snapshot of how well your current profile aligns with your career direction.
          </p>

        </div>

        <div className="ai-main-score">

          <div className="ai-score-circle">

            <svg
              viewBox="0 0 120 120"
              className="ai-score-svg"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                className="ai-score-track"
              />

              <circle
                cx="60"
                cy="60"
                r="50"
                className="ai-score-progress"
                style={{
                  strokeDasharray: "314",
                  strokeDashoffset:
                    314 -
                    (314 * careerMatch) /
                      100,
                }}
              />
            </svg>

            <div className="ai-score-value">

              <strong>
                {careerMatch}
              </strong>

              <span>
                / 100
              </span>

            </div>

          </div>

          <div className="ai-score-message">

            <strong>
              {scoreMessage}
            </strong>

            <span>
              AI career alignment score
            </span>

          </div>

        </div>

      </div>

{/* existing score cards */}

      <div className="ai-score-grid">

        {/* Resume Score */}

        <div className="ai-score-card">

          <div className="ai-score-header">

            <div className="ai-score-icon">
              <FileText size={19} />
            </div>

            <span>
              Resume Score
            </span>

          </div>

          <div className="ai-score-content">

            <p>
              {resumeScore}%
            </p>

            <div className="score-progress">

              <div
                className="score-progress-fill"
                style={{
                  width: `${resumeScore}%`,
                }}
              />

            </div>

          </div>

          <span className="ai-score-description">
            Overall resume strength
          </span>

        </div>


        {/* Career Match */}

        <div className="ai-score-card">

          <div className="ai-score-header">

            <div className="ai-score-icon">
              <Target size={19} />
            </div>

            <span>
              Career Match
            </span>

          </div>

          <div className="ai-score-content">

            <p>
              {careerMatch}%
            </p>

            <div className="score-progress">

              <div
                className="score-progress-fill"
                style={{
                  width: `${careerMatch}%`,
                }}
              />

            </div>

          </div>

          <span className="ai-score-description">
            Alignment with your career direction
          </span>

        </div>

      </div>

{/* strengths + improvement areas */}

<div className="ai-insight-grid ai-insight-grid-enhanced">

  {/* Strengths */}

  <div className="ai-insight-card ai-strengths-card">

    <div className="ai-card-heading">

      <div className="ai-card-icon ai-strength-icon">
        <CheckCircle2 size={19} />
      </div>

      <div>
        <p className="section-eyebrow">
          POSITIVE SIGNALS
        </p>

        <h2>
          Your Strengths
        </h2>

        <span className="ai-card-subtitle">
          Skills and qualities working in your favor
        </span>
      </div>

    </div>

    {resumeAnalysis?.strengths?.length > 0 ? (

      <div className="ai-insight-items">

        {resumeAnalysis.strengths.map(
          (strength, index) => (

            <div
              className="ai-insight-item ai-strength-item"
              key={index}
            >

              <div className="ai-insight-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="ai-insight-item-icon">
                <CheckCircle2 size={16} />
              </div>

              <div className="ai-insight-item-content">
                <strong>
                  {strength}
                </strong>

                <span>
                  Identified as a positive signal
                </span>
              </div>

              <CheckCircle2
                size={15}
                className="ai-insight-check"
              />

            </div>

          )
        )}

      </div>

    ) : (

      <div className="ai-empty-insight">
        <CheckCircle2 size={18} />

        <span>
          No strengths available yet.
        </span>
      </div>

    )}

  </div>


  {/* Areas to Improve */}

  <div className="ai-insight-card ai-improvement-card">

    <div className="ai-card-heading">

      <div className="ai-card-icon ai-improvement-icon">
        <AlertTriangle size={19} />
      </div>

      <div>
        <p className="section-eyebrow">
          DEVELOPMENT AREAS
        </p>

        <h2>
          Areas to Improve
        </h2>

        <span className="ai-card-subtitle">
          Skills that can strengthen your profile
        </span>
      </div>

    </div>

    {resumeAnalysis?.weaknesses?.length > 0 ? (

      <div className="ai-insight-items">

        {resumeAnalysis.weaknesses.map(
          (weakness, index) => (

            <div
              className="ai-insight-item ai-improvement-item"
              key={index}
            >

              <div className="ai-insight-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="ai-insight-item-icon">
                <AlertTriangle size={16} />
              </div>

              <div className="ai-insight-item-content">
                <strong>
                  {weakness}
                </strong>

                <span>
                  Recommended area for development
                </span>
              </div>

              <ArrowUpRight
                size={15}
                className="ai-insight-arrow"
              />

            </div>

          )
        )}

      </div>

    ) : (

      <div className="ai-empty-insight">
        <AlertTriangle size={18} />

        <span>
          No improvement areas available.
        </span>
      </div>

    )}

  </div>

</div>

{/* ai recommendations */}

<div className="ai-recommendation-card ai-recommendation-enhanced">

  <div className="ai-recommendation-top">

    <div className="ai-recommendation-heading">

      <div className="ai-recommendation-icon">
        <Lightbulb size={21} />
      </div>

      <div>
        <p className="section-eyebrow">
          NEXT ACTIONS
        </p>

        <h2>
          AI Recommendations
        </h2>

        <p className="ai-recommendation-subtitle">
          Practical actions suggested from your current career profile and resume.
        </p>
      </div>

    </div>

    <div className="ai-recommendation-badge">
      <Sparkles size={13} />
      Personalized
    </div>

  </div>


  {resumeAnalysis?.suggestions?.length > 0 ? (

    <div className="recommendation-list recommendation-list-enhanced">

      {resumeAnalysis.suggestions.map(
        (suggestion, index) => (

          <div
            className="recommendation-item recommendation-item-enhanced"
            key={index}
          >

            <div className="recommendation-number-enhanced">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="recommendation-item-icon">
              <Lightbulb size={15} />
            </div>

            <div className="recommendation-content">

              <strong>
                Recommendation {index + 1}
              </strong>

              <span>
                {suggestion}
              </span>

            </div>

            <ArrowUpRight
              size={16}
              className="recommendation-arrow"
            />

          </div>

        )
      )}

    </div>

  ) : (

    <div className="ai-empty-recommendation">

      <Lightbulb size={18} />

      <span>
        No recommendations available yet.
      </span>

    </div>

  )}

</div>

</div>
  );
};

export default AIAnalysis;