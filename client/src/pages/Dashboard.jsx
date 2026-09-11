import { useEffect, useState } from "react";
import {
  Target,
  BrainCircuit,
  ChartNoAxesCombined,
  Route,
  UserRound,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import API from "../api";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [careerGoal, setCareerGoal] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) {
        setError("Please register first.");
        setLoading(false);
        return;
      }

      try {
        const [
          profileResponse,
          goalResponse,
          intelligenceResponse,
          skillGapResponse,
        ] = await Promise.all([
          API.get(`/profile/${userId}`),
          API.get(`/career-goals/${userId}`),
          API.get(`/career-intelligence/${userId}`),
          API.get(`/skill-gap/${userId}`),
        ]);

        setProfile(profileResponse.data.data);

        const goals = goalResponse.data.data;

        setCareerGoal(
          goals?.find(
            (goal) => goal.status === "active"
          ) ||
            goals?.[0] ||
            null
        );

        const intelligence =
          intelligenceResponse.data.data;

        setAnalysis(intelligence.aiAnalysis);
        setRoadmap(intelligence.roadmap);

        setSkillGap(skillGapResponse.data.data);
      } catch (error) {
        console.error(
          "Dashboard data fetch failed:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

// Loading State

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-icon">
          <BrainCircuit size={22} />
        </div>

        <p>Loading your career dashboard...</p>
      </div>
    );
  }

         //error state

  if (error) {
    return (
      <div className="dashboard-error">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // Dashboard values

  const careerMatch =
    analysis?.confidenceScore ?? 0;

  const skillMatch =
    skillGap?.matchPercentage ?? 0;

  const missingSkills =
    skillGap?.totalMissingSkills ?? 0;

  const roadmapPhases =
    roadmap?.totalPhases ?? 0;

  const targetRole =
    careerGoal?.targetRole ||
    profile?.targetRole ||
    "Set your career goal";

  return (
    <div className="dashboard-page">

     {/* // dashboard hero  */}
      <div className="dashboard-hero dashboard-hero-enhanced">

       {/* hero content */}

        <div className="dashboard-hero-content">

          <p className="dashboard-eyebrow">
            AI CAREER INTELLIGENCE
          </p>

          <h1>
            Your Career Journey,
            <br />
            <span>starts here.</span>
          </h1>

          <p className="dashboard-subtitle">
            Get personalized career guidance,understand your skill gaps, and follow  a roadmap built around your goals.
          </p>

        {/* target role  */}

          <div className="dashboard-hero-role">
            <Target size={17} />

            <span>
              Target Role
            </span>

            <strong>
              {targetRole}
            </strong>
          </div>

         {/* hero actions */}

          <div className="dashboard-hero-actions">

            <a
              href="/roadmap"
              className="primary-button dashboard-hero-button"
            >
              Explore My Roadmap
              <ArrowRight size={17} />
            </a>

            <a
              href="/ai-analysis"
              className="secondary-button dashboard-hero-button"
            >
              View AI Analysis
            </a>

          </div>
        </div>

        {/* {ai career visual */}

        <div className="dashboard-visual">

          {/* background glow */}

          <div className="dashboard-visual-glow" />

          {/* orbit rings */}

          <div className="dashboard-orbit orbit-one" />

          <div className="dashboard-orbit orbit-two" />

          {/* central AI core */}

          <div className="dashboard-core">

            <BrainCircuit size={42} />

            <span>AI</span>

          </div>

          {/* Career Match Card */}

          <div className="floating-visual-card visual-card-top">

            <Target size={16} />

            <div>
              <small>
                Career Match
              </small>

              <strong>
                {careerMatch}%
              </strong>
            </div>

          </div>

          {/* Skill Match Card */}

          <div className="floating-visual-card visual-card-right">

            <ChartNoAxesCombined size={16} />

            <div>
              <small>
                Skill Match
              </small>

              <strong>
                {skillMatch}%
              </strong>
            </div>

          </div>

          {/* Roadmap Card */}

          <div className="floating-visual-card visual-card-bottom">

            <Route size={16} />

            <div>
              <small>
                Roadmap
              </small>

              <strong>
                {roadmapPhases} Phases
              </strong>
            </div>

          </div>

          {/* Decorative Dots */}

          <div className="visual-dot dot-one" />

          <div className="visual-dot dot-two" />

          <div className="visual-dot dot-three" />

        </div>
      </div>

{/* dashboard metrices */}

<div className="dashboard-metrics dashboard-metrics-enhanced">

  {/* Career Match */}

  <div className="metric-card metric-card-enhanced">

    <div className="metric-header">

      <div className="metric-icon metric-icon-purple">
        <Target size={19} />
      </div>

      <div className="metric-title-group">
        <span>Career Match</span>
        <small>AI alignment score</small>
      </div>

    </div>

    <div className="metric-visual-row">

      <div className="metric-circle">

        <svg
          viewBox="0 0 100 100"
          className="metric-circle-svg"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            className="metric-circle-track"
          />

          <circle
            cx="50"
            cy="50"
            r="42"
            className="metric-circle-progress"
            style={{
              strokeDasharray: "264",
              strokeDashoffset:
                264 - (264 * careerMatch) / 100,
            }}
          />
        </svg>

        <div className="metric-circle-value">
          {careerMatch}%
        </div>

      </div>

      <div className="metric-side-content">

        <strong>
          {careerMatch >= 75
            ? "Strong alignment"
            : careerMatch >= 50
            ? "Good foundation"
            : "Room to improve"}
        </strong>

        <span>
          Resume and career goal alignment
        </span>

      </div>

    </div>

  </div>


  {/* Skill Match */}

  <div className="metric-card metric-card-enhanced">

    <div className="metric-header">

      <div className="metric-icon metric-icon-blue">
        <ChartNoAxesCombined size={19} />
      </div>

      <div className="metric-title-group">
        <span>Skill Match</span>
        <small>Target role compatibility</small>
      </div>

    </div>

    <div className="metric-progress-section">

      <div className="metric-progress-top">

        <strong>
          {skillMatch}%
        </strong>

        <span>
          Skill coverage
        </span>

      </div>

      <div className="progress-track metric-progress-large">

        <div
          className="progress-fill"
          style={{
            width: `${skillMatch}%`,
          }}
        />

      </div>

      <div className="metric-progress-meta">

        <span>
          {skillGap?.totalMatchedSkills ?? 0} matched
        </span>

        <span>
          {missingSkills} to learn
        </span>

      </div>

    </div>

  </div>


  {/* Skills To Learn */}

  <div className="metric-card metric-card-enhanced">

    <div className="metric-header">

      <div className="metric-icon metric-icon-orange">
        <BrainCircuit size={19} />
      </div>

      <div className="metric-title-group">
        <span>Skills to Learn</span>
        <small>Your development queue</small>
      </div>

    </div>

    <div className="metric-number-section">

      <div className="metric-large-number">
        {missingSkills}
      </div>

      <div className="metric-number-text">

        <strong>
          {missingSkills === 0
            ? "All covered"
            : missingSkills === 1
            ? "Skill remaining"
            : "Skills remaining"}
        </strong>

        <span>
          Identified from your target role
        </span>

      </div>

    </div>

    <div className="metric-mini-line">

      <span />

    </div>

  </div>


  {/* Roadmap */}

  <div className="metric-card metric-card-enhanced">

    <div className="metric-header">

      <div className="metric-icon metric-icon-green">
        <Route size={19} />
      </div>

      <div className="metric-title-group">
        <span>Roadmap</span>
        <small>Your learning journey</small>
      </div>

    </div>

    <div className="metric-number-section">

      <div className="metric-large-number">
        {roadmapPhases}
      </div>

      <div className="metric-number-text">

        <strong>
          Learning phases
        </strong>

        <span>
          Structured path to your goal
        </span>

      </div>

    </div>

    <div className="metric-phase-dots">

      {Array.from({
        length: Math.min(roadmapPhases, 6),
      }).map((_, index) => (

        <span
          key={index}
          className="phase-dot"
        />

      ))}

    </div>

  </div>

</div>
{/* career -progress */}

<div className="career-progress-card">

  <div className="career-progress-header">

    <div>
      <p className="section-eyebrow">
        YOUR JOURNEY
      </p>

      <h2>
        Career Progress
      </h2>

      <p>
        A snapshot of how close you are to your current career target.
      </p>
    </div>

    <div className="career-progress-target">
      <Target size={18} />

      <div>
        <small>
          TARGET ROLE
        </small>

        <strong>
          {targetRole}
        </strong>
      </div>
    </div>

  </div>


  <div className="career-progress-body">

    {/* Career Alignment */}

    <div className="progress-item">

      <div className="progress-item-header">

        <div className="progress-item-label">
          <Target size={16} />

          <span>
            Career Alignment
          </span>
        </div>

        <strong>
          {careerMatch}%
        </strong>

      </div>

      <div className="career-progress-track">

        <div
          className="career-progress-fill career-fill-purple"
          style={{
            width: `${careerMatch}%`,
          }}
        />

      </div>

      <span className="progress-item-description">
        Resume and career goal alignment
      </span>

    </div>


    {/* Skill Coverage */}

    <div className="progress-item">

      <div className="progress-item-header">

        <div className="progress-item-label">
          <ChartNoAxesCombined size={16} />

          <span>
            Skill Coverage
          </span>
        </div>

        <strong>
          {skillMatch}%
        </strong>

      </div>

      <div className="career-progress-track">

        <div
          className="career-progress-fill career-fill-blue"
          style={{
            width: `${skillMatch}%`,
          }}
        />

      </div>

      <span className="progress-item-description">
        Current skills compared with your target role
      </span>

    </div>


    {/* Roadmap Progress */}

    <div className="roadmap-progress-item">

      <div className="progress-item-header">

        <div className="progress-item-label">
          <Route size={16} />

          <span>
            Learning Roadmap
          </span>
        </div>

        <strong>
          {roadmapPhases} phases
        </strong>

      </div>

      <div className="roadmap-phase-track">

        {Array.from({
          length: Math.min(roadmapPhases, 6),
        }).map((_, index) => (

          <div
            key={index}
            className="roadmap-progress-phase"
          >
            <div className="roadmap-progress-dot">
              {index + 1}
            </div>

            {index <
              Math.min(roadmapPhases, 6) - 1 && (
              <div className="roadmap-progress-line" />
            )}
          </div>

        ))}

      </div>

      <span className="progress-item-description">
        Structured learning path toward your career goal
      </span>

    </div>

  </div>


  {/* Progress Footer */}

  <div className="career-progress-footer">

    <div className="career-progress-message">

      <div className="career-progress-message-icon">
        <BrainCircuit size={17} />
      </div>

      <div>
        <strong>
          Keep building momentum
        </strong>

        <span>
          Focus on your missing skills and follow your roadmap consistently.
        </span>
      </div>

    </div>

    <ArrowRight size={18} />

  </div>

</div>
{/* career goal + ai insight */}

<div className="dashboard-main-grid dashboard-feature-grid-enhanced">

  {/* Career Goal */}

  <div className="dashboard-feature-card dashboard-goal-card">

    <div className="feature-card-top">

      <div>
        <p className="section-eyebrow">
          CURRENT TARGET
        </p>

        <h2>
          Your Career Goal
        </h2>
      </div>

      <div className="feature-icon goal-feature-icon">
        <Target size={21} />
      </div>

    </div>

    <div className="goal-visual">

      <div className="goal-visual-icon">
        <Target size={28} />
      </div>

      <div>
        <span>
          TARGET ROLE
        </span>

        <strong>
          {careerGoal?.targetRole ||
            profile?.targetRole ||
            "Not set"}
        </strong>
      </div>

    </div>

    <p className="feature-description">
      Your current career direction based on
      your profile and goals.
    </p>

    <div className="goal-meta-enhanced">

      <div className="goal-meta-item">

        <span>
          TIMELINE
        </span>

        <strong>
          {careerGoal?.timeline ||
            "Not set"}
        </strong>

      </div>

      <div className="goal-meta-item">

        <span>
          PRIORITY
        </span>

        <strong>
          {careerGoal?.priority ||
            "Not set"}
        </strong>

      </div>

      <div className="goal-meta-item">

        <span>
          STATUS
        </span>

        <strong>
          {careerGoal?.status ||
            "active"}
        </strong>

      </div>

    </div>

  </div>


  {/* AI Insight */}

  <div className="dashboard-feature-card dashboard-ai-card">

    <div className="feature-card-top">

      <div>
        <p className="section-eyebrow">
          AI INSIGHT
        </p>

        <h2>
          Career Analysis
        </h2>
      </div>

      <div className="feature-icon ai-feature-icon">
        <BrainCircuit size={21} />
      </div>

    </div>

    <div className="ai-insight-content">

      <div className="ai-insight-score">

        <div className="ai-score-ring">

          <span>
            {careerMatch}
          </span>

          <small>
            SCORE
          </small>

        </div>

      </div>

      <div className="ai-insight-text">

        <strong>
          {careerMatch >= 75
            ? "Strong career foundation"
            : careerMatch >= 50
            ? "Good career foundation"
            : "Build your foundation"}
        </strong>

        <p>
          {analysis?.summary ||
            "Your career analysis is ready. Review your strengths, weaknesses, and recommendations."}
        </p>

      </div>

    </div>

    <div className="analysis-status analysis-status-enhanced">

      <CheckCircle2 size={16} />

      <span>
        Personalized analysis available
      </span>

      <ArrowRight size={15} />

    </div>

  </div>

</div>

   {/* profile summary */}

      <div className="dashboard-section-card">

        <div className="section-heading">

          <div>

            <p className="section-eyebrow">
              YOUR FOUNDATION
            </p>

            <h2>
              Profile Summary
            </h2>

          </div>

          <div className="section-icon">
            <UserRound size={20} />
          </div>

        </div>

        <div className="profile-summary-grid">

          {/* Experience */}

          <div className="summary-item">

            <span className="summary-label">
              EXPERIENCE
            </span>

            <span className="summary-value">
              {profile?.experienceLevel ||
                "Not set"}
            </span>

          </div>

          {/* Target Role */}

          <div className="summary-item">

            <span className="summary-label">
              TARGET ROLE
            </span>

            <span className="summary-value">
              {profile?.targetRole ||
                careerGoal?.targetRole ||
                "Not set"}
            </span>

          </div>

          {/* Skills */}

          <div className="summary-item summary-skills">

            <span className="summary-label">
              SKILLS
            </span>

            <div className="dashboard-skills">

              {profile?.skills?.length ? (
                profile.skills.map((skill) => (

                  <span
                    className="dashboard-skill"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))
              ) : (

                <span className="muted-text">
                  No skills added
                </span>

              )}

            </div>

          </div>

        </div>

      </div>

{/* carrer journey - next action */}

      <div className="journey-card journey-card-enhanced">

        <div className="journey-content">

          <div className="journey-icon journey-icon-enhanced">
            <Route size={23} />
          </div>

          <div className="journey-text">

            <p className="section-eyebrow">
              YOUR NEXT MOVE
            </p>

            <h2>
              Continue Your Career Journey
            </h2>

            <p>
              Review your AI analysis, strengthen your
              missing skills, and follow your personalized
              roadmap one step at a time.
            </p>

            <div className="journey-actions">

              <a
                href="/roadmap"
                className="journey-primary-action"
              >
                Open Roadmap
                <ArrowRight size={16} />
              </a>

              <a
                href="/skill-gap"
                className="journey-secondary-action"
              >
                View Skill Gap
              </a>

            </div>

          </div>

        </div>

        <div className="journey-decoration">

          <div className="journey-decoration-circle circle-one" />

          <div className="journey-decoration-circle circle-two" />

          <Route size={38} />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;