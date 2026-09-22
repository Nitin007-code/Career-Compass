import { useEffect, useState } from "react";
import {
  ChartNoAxesCombined,
  Target,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import API from "./api";

function SkillGap() {
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSkillGap = async () => {
      if (!userId) {
        setError("Please register first.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          `/skill-gap/${userId}`
        );

        setSkillGap(response.data.data);
      } catch (error) {
        console.error(
          "Skill gap fetch failed:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load skill gap."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkillGap();
  }, [userId]);

  if (loading) {
    return (
      <div className="ai-loading">
        <div className="ai-loading-icon">
          <ChartNoAxesCombined size={22} />
        </div>

        <p>
          Analyzing your skill gap...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="error-text">
        {error}
      </p>
    );
  }

  if (!skillGap) {
    return (
      <p className="muted-text">
        No skill gap analysis available.
      </p>
    );
  }

  const matchPercentage =
    skillGap.matchPercentage ?? 0;

  const matchedSkills =
    skillGap.matchedSkills ?? [];

  const missingSkills =
    skillGap.missingSkills ?? [];

  const totalMatchedSkills =
    skillGap.totalMatchedSkills ??
    matchedSkills.length;

  const totalMissingSkills =
    skillGap.totalMissingSkills ??
    missingSkills.length;

  const totalRequiredSkills =
    skillGap.totalRequiredSkills ??
    totalMatchedSkills +
      totalMissingSkills;

  return (
    <div className="skill-gap-page">

      {/* 
          5.17.1 — Skill Gap Hero
          */}

      <div className="skill-gap-hero">

        <div className="skill-gap-hero-content">

          <div className="skill-gap-hero-label">
            <Sparkles size={14} />
            CAREER SKILL INTELLIGENCE
          </div>

          <h1>
            Know what you have.
            <br />
            <span>
              Know what you need.
            </span>
          </h1>

          <p>
            Compare your current skills with the requirements of your target role and identify exactly where you should focus
            your learning.
          </p>

          <div className="skill-gap-target">

            <div className="skill-gap-target-icon">
              <Target size={17} />
            </div>

            <div>
              <small>
                TARGET ROLE
              </small>

              <strong>
                {skillGap.targetRole ||
                  "Your target role"}
              </strong>
            </div>

          </div>

        </div>


        {/* Hero Visual */}

        <div className="skill-gap-hero-visual">

          <div className="skill-gap-hero-glow" />

          <div
            className="skill-gap-orbit skill-gap-orbit-one"
          />

          <div
            className="skill-gap-orbit skill-gap-orbit-two"
          />

          <div className="skill-gap-hero-core">

            <ChartNoAxesCombined size={38} />

            <strong>
              {matchPercentage}%
            </strong>

            <span>
              SKILL MATCH
            </span>

          </div>


          {/* Matched Skills */}

          <div className="skill-gap-floating-card skill-gap-floating-top">

            <CheckCircle2 size={15} />

            <div>
              <small>
                Matched
              </small>

              <strong>
                {totalMatchedSkills}
              </strong>
            </div>

          </div>


          {/* Missing Skills */}

          <div className="skill-gap-floating-card skill-gap-floating-bottom">

            <BookOpen size={15} />

            <div>
              <small>
                To Learn
              </small>

              <strong>
                {totalMissingSkills}
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/*
          5.17.2 — Skill Match Visualization
          */}

      <div className="skill-match-card skill-match-card-enhanced">

        <div className="skill-match-visual">

          <div className="skill-match-ring">

            <svg
              viewBox="0 0 140 140"
              className="skill-match-ring-svg"
            >
              <circle
                cx="70"
                cy="70"
                r="58"
                className="skill-match-ring-track"
              />

              <circle
                cx="70"
                cy="70"
                r="58"
                className="skill-match-ring-progress"
                style={{
                  strokeDasharray: "365",
                  strokeDashoffset:
                    365 -
                    (365 * matchPercentage) / 100,
                }}
              />
            </svg>

            <div className="skill-match-ring-value">

              <strong>
                {matchPercentage}%
              </strong>

              <span>
                MATCH
              </span>

            </div>

          </div>

        </div>


        <div className="skill-match-content">

          <div className="skill-match-top">

            <div className="skill-match-icon">
              <ChartNoAxesCombined size={20} />
            </div>

            <div>

              <p className="section-eyebrow">
                SKILL COVERAGE
              </p>

              <h2>
                Your Skill Match
              </h2>

            </div>

          </div>


          <div className="skill-match-summary">

            <strong>
              {totalMatchedSkills} of{" "}
              {totalRequiredSkills}
            </strong>

            <span>
              required skills currently covered
            </span>

          </div>


          <div className="skill-match-progress">

            <div className="skill-match-progress-header">

              <span>
                Current skill coverage
              </span>

              <strong>
                {matchPercentage}%
              </strong>

            </div>

            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width: `${matchPercentage}%`,
                }}
              />

            </div>

          </div>


          <div className="skill-stat-row">

            <div className="skill-stat">

              <div className="skill-stat-icon skill-stat-required">
                <Target size={14} />
              </div>

              <div>
                <strong>
                  {totalRequiredSkills}
                </strong>

                <span>
                  Required
                </span>
              </div>

            </div>


            <div className="skill-stat">

              <div className="skill-stat-icon skill-stat-matched">
                <CheckCircle2 size={14} />
              </div>

              <div>
                <strong>
                  {totalMatchedSkills}
                </strong>

                <span>
                  Matched
                </span>
              </div>

            </div>


            <div className="skill-stat">

              <div className="skill-stat-icon skill-stat-learning">
                <BookOpen size={14} />
              </div>

              <div>
                <strong>
                  {totalMissingSkills}
                </strong>

                <span>
                  To Learn
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/*
          5.17.3 — Matched Skills
          */}

      <div className="skill-columns">

        <div className="skill-list-card skill-list-card-enhanced matched-skills-card">

          <div className="skill-list-heading">

            <div className="skill-list-icon matched">
              <CheckCircle2 size={18} />
            </div>

            <div>

              <p className="section-eyebrow">
                ALREADY COVERED
              </p>

              <h2>
                Matched Skills
              </h2>

              <span className="skill-list-subtitle">
                Skills you already have for this role
              </span>

            </div>

            <div className="skill-count-badge">
              {totalMatchedSkills}
            </div>

          </div>


          {matchedSkills.length > 0 ? (

            <div className="matched-skills-grid">

              {matchedSkills.map(
                (skill, index) => (

                  <div
                    className="matched-skill-item"
                    key={index}
                  >

                    <div className="matched-skill-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="matched-skill-icon">
                      <CheckCircle2 size={15} />
                    </div>

                    <div className="matched-skill-content">

                      <strong>
                        {skill}
                      </strong>

                      <span>
                        Skill matched to target role
                      </span>

                    </div>

                    <CheckCircle2
                      size={15}
                      className="matched-skill-check"
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="skill-empty-state">

              <CheckCircle2 size={18} />

              <span>
                No matched skills found yet.
              </span>

            </div>

          )}

        </div>


   <div className="skill-list-card skill-learning-card">

  <div className="skill-list-heading">

    <div className="skill-list-icon learning">
      <BookOpen size={18} />
    </div>

    <div>

      <p className="section-eyebrow">
        DEVELOPMENT QUEUE
      </p>

      <h2>
        Skills to Learn
      </h2>

      <span className="skill-list-subtitle">
        Prioritize these skills to become role-ready
      </span>

    </div>

    <div className="skill-count-badge learning-count">
      {totalMissingSkills}
    </div>

  </div>


  {missingSkills.length > 0 ? (

    <div className="learning-queue">

      {missingSkills.map(
        (skill, index) => (

          <div
            key={index}
            className="learning-queue-item"
          >

            <div className="learning-queue-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="learning-queue-icon">
              <BookOpen size={16} />
            </div>

            <div className="learning-queue-content">

              <div className="learning-queue-title-row">

                <strong>
                  {skill}
                </strong>

                <span>
                  {index === 0
                    ? "HIGH PRIORITY"
                    : index === 1
                    ? "NEXT"
                    : "UPCOMING"}
                </span>

              </div>

              <p>
                Build practical knowledge and projects around this skill.
              </p>

              <div className="learning-queue-progress">

                <div className="learning-queue-track">

                  <div
                    className="learning-queue-fill"
                    style={{
                      width: "0%",
                    }}
                  />

                </div>

                <small>
                  Not started
                </small>

              </div>

            </div>

            <div className="learning-queue-arrow">
              <ArrowRight size={16} />
            </div>

          </div>

        )
      )}

    </div>

  ) : (

    <div className="skill-empty-state">

      <CheckCircle2 size={18} />

      <span>
        You have covered all required skills for this role.
      </span>

    </div>

  )}

</div>

      </div>

{/* =====================================================
    5.17.5 — Skill Gap → Roadmap Connection
    ===================================================== */}

<div className="skill-gap-roadmap-card">

  <div className="skill-gap-roadmap-content">

    <div className="skill-gap-roadmap-icon">
      <Target size={21} />
    </div>

    <div>

      <p className="section-eyebrow">
        YOUR NEXT MOVE
      </p>

      <h2>
        Turn skill gaps into a career roadmap.
      </h2>

      <p>
        Your missing skills show where you need
        to improve. Your roadmap turns those gaps
        into structured learning phases.
      </p>

    </div>

  </div>


  <div className="skill-gap-roadmap-flow">

    <div className="roadmap-flow-item">

      <span className="roadmap-flow-number">
        01
      </span>

      <div>
        <strong>
          Identify
        </strong>

        <small>
          Find your gaps
        </small>
      </div>

    </div>


    <ArrowRight
      size={16}
      className="roadmap-flow-arrow"
    />


    <div className="roadmap-flow-item">

      <span className="roadmap-flow-number">
        02
      </span>

      <div>
        <strong>
          Learn
        </strong>

        <small>
          Build missing skills
        </small>
      </div>

    </div>


    <ArrowRight
      size={16}
      className="roadmap-flow-arrow"
    />


    <div className="roadmap-flow-item">

      <span className="roadmap-flow-number">
        03
      </span>

      <div>
        <strong>
          Become Ready
        </strong>

        <small>
          Move toward your role
        </small>
      </div>

    </div>

  </div>


  <a
    href="/roadmap"
    className="primary-button skill-gap-roadmap-button"
  >
    Open My Roadmap
    <ArrowRight size={16} />
  </a>

</div>

    </div>
  );
}

export default SkillGap;