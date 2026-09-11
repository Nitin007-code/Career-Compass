import { useEffect, useState } from "react";
import {
  Route,
  Target,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import API from "./api";

function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!userId) {
        setError("Please register first.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.post(
          `/roadmap/generate/${userId}`
        );

        setRoadmap(response.data.data);
      } catch (error) {
        console.error(
          "Roadmap fetch failed:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load roadmap."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [userId]);

  if (loading) {
    return (
      <div className="ai-loading">

        <div className="ai-loading-icon">
          <Route size={22} />
        </div>

        <p>
          Building your career roadmap...
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

  if (!roadmap) {
    return (
      <p className="muted-text">
        No roadmap available.
      </p>
    );
  }

  const phases = roadmap.phases || [];

  const totalPhases =
    roadmap.totalPhases ?? phases.length;

  return (
    <div className="roadmap-page">

      {/* =====================================================
          5.18.1 — Roadmap Hero
          ===================================================== */}

      <div className="roadmap-hero">

        <div className="roadmap-hero-content">

          <div className="roadmap-hero-label">

            <Sparkles size={14} />

            PERSONALIZED CAREER ROADMAP

          </div>


          <h1>

            Your path from
            <br />

            <span>
              learning to career-ready.
            </span>

          </h1>


          <p>

            Follow a structured learning path built
            around your target role, skill gaps, and
            career goals. Focus on the right skills
            in the right order.

          </p>


          <div className="roadmap-hero-meta">

            <div className="roadmap-hero-target">

              <div className="roadmap-hero-target-icon">
                <Target size={17} />
              </div>

              <div>

                <small>
                  TARGET ROLE
                </small>

                <strong>
                  {roadmap.targetRole ||
                    "Your target role"}
                </strong>

              </div>

            </div>


            <div className="roadmap-hero-scroll">

              <span>
                EXPLORE ROADMAP
              </span>

              <ArrowDown size={14} />

            </div>

          </div>

        </div>


        {/* Hero Visual */}

        <div className="roadmap-hero-visual">

          <div className="roadmap-hero-glow" />

          <div
            className="roadmap-orbit roadmap-orbit-one"
          />

          <div
            className="roadmap-orbit roadmap-orbit-two"
          />


          <div className="roadmap-hero-core">

            <Route size={34} />

            <strong>
              {totalPhases}
            </strong>

            <span>
              PHASES
            </span>

          </div>


          <div className="roadmap-floating-card roadmap-floating-top">

            <Target size={15} />

            <div>

              <small>
                Career Path
              </small>

              <strong>
                Personalized
              </strong>

            </div>

          </div>


          <div className="roadmap-floating-card roadmap-floating-bottom">

            <Sparkles size={15} />

            <div>

              <small>
                Focus
              </small>

              <strong>
                Skill Building
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          5.18.2 — Roadmap Progress Overview
          ===================================================== */}

      <div className="roadmap-progress-card">

        <div className="roadmap-progress-header">

          <div className="roadmap-progress-title">

            <div className="roadmap-progress-icon">
              <Route size={19} />
            </div>

            <div>

              <p className="section-eyebrow">
                ROADMAP OVERVIEW
              </p>

              <h2>
                Your Career Progress
              </h2>

            </div>

          </div>


          <div className="roadmap-progress-badge">

            <Sparkles size={13} />

            <span>
              {totalPhases} PHASES
            </span>

          </div>

        </div>


        <div className="roadmap-progress-body">

          <div className="roadmap-progress-main">

            <div className="roadmap-progress-percentage">
              0%
            </div>

            <div className="roadmap-progress-info">

              <strong>
                Ready to begin
              </strong>

              <span>
                Start your first phase and build
                momentum toward your target role.
              </span>

            </div>

          </div>


          <div className="roadmap-progress-track">

            <div
              className="roadmap-progress-fill"
              style={{
                width: "0%",
              }}
            />

          </div>


          <div className="roadmap-progress-stats">

            <div className="roadmap-progress-stat">

              <span className="roadmap-progress-stat-number">
                0
              </span>

              <span className="roadmap-progress-stat-label">
                Completed
              </span>

            </div>


            <div className="roadmap-progress-stat">

              <span className="roadmap-progress-stat-number">
                {totalPhases}
              </span>

              <span className="roadmap-progress-stat-label">
                Total Phases
              </span>

            </div>


            <div className="roadmap-progress-stat">

              <span className="roadmap-progress-stat-number">
                {totalPhases}
              </span>

              <span className="roadmap-progress-stat-label">
                Remaining
              </span>

            </div>

          </div>

        </div>


        <div className="roadmap-progress-timeline">

          {phases.length > 0 ? (

            phases.map(
              (phase, index) => (

                <div
                  key={phase._id || index}
                  className={`roadmap-timeline-step ${
                    index === 0
                      ? "active"
                      : ""
                  }`}
                >

                  <div className="roadmap-timeline-dot">

                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}

                  </div>

                  <span>
                    {phase.title ||
                      `Phase ${index + 1}`}
                  </span>

                </div>

              )
            )

          ) : (

            <div className="roadmap-timeline-step active">

              <div className="roadmap-timeline-dot">
                01
              </div>

              <span>
                Your first phase
              </span>

            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          5.18.3 + 5.18.4 — Roadmap Phase Timeline
          ===================================================== */}

      <div className="roadmap-content">

        <div className="roadmap-header">

          <div>

            <p className="section-eyebrow">
              YOUR LEARNING JOURNEY
            </p>

            <h2>
              Career Roadmap
            </h2>

          </div>


          <div className="roadmap-phase-count">

            <Route size={15} />

            <span>
              {totalPhases} Phases
            </span>

          </div>

        </div>


        {phases.length > 0 ? (

          <div className="roadmap-phase-timeline">

            {phases.map(
              (phase, index) => {

                const isFirstPhase =
                  index === 0;

                return (

                  <div
                    key={phase._id || index}
                    className={`roadmap-timeline-phase ${
                      isFirstPhase
                        ? "current"
                        : ""
                    }`}
                  >

                    {/* Timeline Connector */}

                    <div className="roadmap-timeline-line">

                      <div className="roadmap-timeline-node">

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </div>

                    </div>


                    {/* Phase Card */}

                    <div className="roadmap-phase-card">

                      <div className="roadmap-phase-card-header">

                        <div>

                          <span className="roadmap-phase-label">

                            {isFirstPhase
                              ? "START HERE"
                              : `PHASE ${
                                  index + 1
                                }`}

                          </span>

                          <h3>

                            {phase.title ||
                              `Phase ${
                                index + 1
                              }`}

                          </h3>

                        </div>


                        {isFirstPhase && (

                          <div className="roadmap-current-badge">

                            <Sparkles size={12} />

                            CURRENT FOCUS

                          </div>

                        )}

                      </div>


                      {/* Learning Objective */}

                      <div className="roadmap-objective">

                        <span className="roadmap-objective-label">
                          LEARNING OBJECTIVE
                        </span>

                        <p>

                          {phase.description ||
                            "Build the knowledge and practical skills required for this stage of your career journey."}

                        </p>

                      </div>


                      {/* Skills */}

                      {phase.skills &&
                      phase.skills.length > 0 && (

                        <div className="roadmap-phase-skills">

                          <div className="roadmap-skills-heading">

                            <span>
                              Skills to develop
                            </span>

                            <strong>
                              {phase.skills.length}
                            </strong>

                          </div>


                          <div className="roadmap-skills-grid">

                            {phase.skills.map(
                              (
                                skill,
                                skillIndex
                              ) => (

                                <div
                                  key={
                                    skillIndex
                                  }
                                  className="roadmap-skill-item"
                                >

                                  <span className="roadmap-skill-number">

                                    {String(
                                      skillIndex +
                                        1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}

                                  </span>

                                  <span>
                                    {skill}
                                  </span>

                                </div>

                              )
                            )}

                          </div>

                        </div>

                      )}


                      {/* Phase Footer */}

                      <div className="roadmap-phase-footer">

                        <span>

                          {isFirstPhase
                            ? "Begin with this phase"
                            : "Continue your learning journey"}

                        </span>

                        <Route size={14} />

                      </div>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        ) : (

          <p className="muted-text">
            No roadmap phases available yet.
          </p>

        )}


        {/* =====================================================
            5.18.5 — Roadmap → Career Goal Connection
            ===================================================== */}

        <div className="roadmap-career-cta">

          <div className="roadmap-career-cta-glow" />

          <div className="roadmap-career-cta-content">

            <div className="roadmap-career-cta-icon">
              <Target size={21} />
            </div>

            <div>

              <p className="section-eyebrow">
                KEEP MOVING FORWARD
              </p>

              <h2>
                Every phase takes you closer to your target role.
              </h2>

              <p>
                Stay consistent, build practical projects,
                and work through each phase one step at a time.
              </p>

            </div>

          </div>


          <div className="roadmap-career-cta-target">

            <span>
              TARGET ROLE
            </span>

            <strong>
              {roadmap.targetRole ||
                "Your target role"}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Roadmap;