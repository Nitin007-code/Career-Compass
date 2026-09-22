import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", formData);

      setMessage(
        "Registration successful! Please login to continue."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <p className="section-eyebrow">
            CAREER-COMPASS
          </p>

          <h1>Create Account</h1>

          <p>
            Create your account and start building your personalized career journey.
          </p>
        </div>

        <div className="profile-header-icon">
          <UserPlus size={30} />
        </div>
      </div>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >
        <div className="profile-form-section">
          <div className="profile-form-heading">
            <div className="profile-form-icon">
              <UserPlus size={20} />
            </div>

            <div>
              <p className="section-eyebrow">
                ACCOUNT
              </p>

              <h2>Get Started</h2>
            </div>
          </div>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {message && (
          <p className="success-text">
            {message}
          </p>
        )}

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            <UserPlus size={17} />

            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;