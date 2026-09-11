import { useEffect, useState } from "react";
import {
  Target,
  BriefcaseBusiness,
  Clock3,
  Flag,
  CheckCircle2,
  Plus,
  MapPin,
  Building2,
  IndianRupee,
} from "lucide-react";
import API from "./api";

function CareerGoals() {
  const userId = localStorage.getItem("userId");

  const [careerGoals, setCareerGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    targetRole: "",
    targetIndustry: "",
    targetCompany: "",
    targetLocation: "",
    targetSalary: "",
    timeline: "1-year",
    priority: "medium",
    status: "active",
  });

  useEffect(() => {
    const fetchCareerGoals = async () => {
      if (!userId) {
        setError("Please register first.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          `/career-goals/${userId}`
        );

        const goals = response.data.data;

        setCareerGoals(goals);

        if (goals.length === 0) {
          setShowForm(true);
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load career goals."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareerGoals();
  }, [userId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.targetRole.trim()) {
      setError("Target role is required.");
      return;
    }

    try {
      setError("");

      const goalData = {
        user: userId,

        targetRole: formData.targetRole,
        targetIndustry: formData.targetIndustry,
        targetCompany: formData.targetCompany,
        targetLocation: formData.targetLocation,

        targetSalary: formData.targetSalary
          ? Number(formData.targetSalary)
          : undefined,

        timeline: formData.timeline,
        priority: formData.priority,
        status: formData.status,
      };

      const response = await API.post(
        "/career-goals",
        goalData
      );

      setCareerGoals((currentGoals) => [
        ...currentGoals,
        response.data.data,
      ]);

      setFormData({
        targetRole: "",
        targetIndustry: "",
        targetCompany: "",
        targetLocation: "",
        targetSalary: "",
        timeline: "1-year",
        priority: "medium",
        status: "active",
      });

      setShowForm(false);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create career goal."
      );
    }
  };

  if (loading) {
    return (
      <div className="career-goals-loading">
        <Target size={22} />
        <p>Loading career goals...</p>
      </div>
    );
  }

  return (
    <div className="career-goals-page">
      {/* Header */}
      <div className="career-goals-header">
        <div>
          <p className="section-eyebrow">
            CAREER DIRECTION
          </p>

          <h1>Career Goals</h1>

          <p>
            Define where you want to go so
            Career-Compass can personalize your
            career guidance.
          </p>
        </div>

        <div className="career-goals-header-icon">
          <Target size={30} />
        </div>
      </div>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {/* Create Goal Form */}
      {showForm && (
        <form
          className="career-goal-form"
          onSubmit={handleSubmit}
        >
          <div className="career-form-heading">
            <div className="career-form-icon">
              <Target size={20} />
            </div>

            <div>
              <p className="section-eyebrow">
                NEW GOAL
              </p>

              <h2>Define Your Career Goal</h2>

              <p>
                Tell us about the career you want to
                pursue.
              </p>
            </div>
          </div>

          {/* Career Target */}
          <div className="career-form-section">
            <div className="career-subheading">
              <BriefcaseBusiness size={18} />
              <h3>Career Target</h3>
            </div>

            <div className="career-form-grid">
              <div className="form-group">
                <label>Target Role</label>

                <input
                  type="text"
                  name="targetRole"
                  placeholder="e.g. Full Stack Developer"
                  value={formData.targetRole}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Target Industry</label>

                <input
                  type="text"
                  name="targetIndustry"
                  placeholder="e.g. Software Technology"
                  value={formData.targetIndustry}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Target Company</label>

                <input
                  type="text"
                  name="targetCompany"
                  placeholder="e.g. Microsoft"
                  value={formData.targetCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Target Location</label>

                <input
                  type="text"
                  name="targetLocation"
                  placeholder="e.g. Bangalore, India"
                  value={formData.targetLocation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Target Salary</label>

                <input
                  type="number"
                  name="targetSalary"
                  placeholder="e.g. 1500000"
                  value={formData.targetSalary}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="career-form-section">
            <div className="career-subheading">
              <Flag size={18} />
              <h3>Career Preferences</h3>
            </div>

            <div className="career-form-grid">
              <div className="form-group">
                <label>Timeline</label>

                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="3-months">
                    3 Months
                  </option>

                  <option value="6-months">
                    6 Months
                  </option>

                  <option value="1-year">
                    1 Year
                  </option>

                  <option value="2-years">
                    2 Years
                  </option>

                  <option value="long-term">
                    Long Term
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">
                    Low Priority
                  </option>

                  <option value="medium">
                    Medium Priority
                  </option>

                  <option value="high">
                    High Priority
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
            >
              <CheckCircle2 size={17} />
              Create Career Goal
            </button>

            {careerGoals.length > 0 && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Existing Goals */}
      {careerGoals.length > 0 && (
        <>
          {!showForm && (
            <div className="career-add-action">
              <button
                type="button"
                className="primary-button"
                onClick={() => setShowForm(true)}
              >
                <Plus size={17} />
                Add Career Goal
              </button>
            </div>
          )}

          <div className="career-goals-grid">
            {careerGoals.map((goal) => (
              <div
                className="career-goal-card"
                key={goal._id}
              >
                <div className="career-goal-card-top">
                  <div className="career-goal-card-icon">
                    <Target size={19} />
                  </div>

                  <span
                    className={`goal-status goal-status-${goal.status}`}
                  >
                    {goal.status}
                  </span>
                </div>

                <p className="section-eyebrow">
                  CAREER GOAL
                </p>

                <h2>{goal.targetRole}</h2>

                <div className="goal-meta-grid">
                  <div className="goal-meta-item">
                    <Clock3 size={15} />

                    <div>
                      <span>Timeline</span>
                      <strong>
                        {goal.timeline}
                      </strong>
                    </div>
                  </div>

                  <div className="goal-meta-item">
                    <Flag size={15} />

                    <div>
                      <span>Priority</span>
                      <strong>
                        {goal.priority}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="goal-details">
                  {goal.targetIndustry && (
                    <div className="goal-detail">
                      <BriefcaseBusiness size={15} />

                      <div>
                        <span>Industry</span>
                        <p>
                          {goal.targetIndustry}
                        </p>
                      </div>
                    </div>
                  )}

                  {goal.targetCompany && (
                    <div className="goal-detail">
                      <Building2 size={15} />

                      <div>
                        <span>Company</span>
                        <p>
                          {goal.targetCompany}
                        </p>
                      </div>
                    </div>
                  )}

                  {goal.targetLocation && (
                    <div className="goal-detail">
                      <MapPin size={15} />

                      <div>
                        <span>Location</span>
                        <p>
                          {goal.targetLocation}
                        </p>
                      </div>
                    </div>
                  )}

                  {goal.targetSalary && (
                    <div className="goal-detail">
                      <IndianRupee size={15} />

                      <div>
                        <span>Target Salary</span>
                        <p>
                          {goal.targetSalary}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {careerGoals.length === 0 && !showForm && (
        <div className="career-goal-empty">
          <Target size={30} />

          <h2>No Career Goals Yet</h2>

          <p>
            Create your first career goal to start
            receiving personalized guidance.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={17} />
            Create Career Goal
          </button>
        </div>
      )}
    </div>
  );
}

export default CareerGoals;