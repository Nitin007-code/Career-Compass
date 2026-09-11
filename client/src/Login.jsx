import { useState } from "react";
import { LogIn, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await API.post(
        "/auth/login",
        formData
      );

      const user = response.data.data;

      // Store the logged-in user's real ID
      localStorage.setItem("userId", user.id);

      setMessage("Login successful!");

      // Go to dashboard
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed."
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

          <h1>Welcome Back</h1>

          <p>
            Login to continue your personalized
            career journey.
          </p>
        </div>

        <div className="profile-header-icon">
          <UserRound size={30} />
        </div>
      </div>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >
        <div className="profile-form-section">
          <div className="profile-form-heading">
            <div className="profile-form-icon">
              <LogIn size={20} />
            </div>

            <div>
              <p className="section-eyebrow">
                ACCOUNT ACCESS
              </p>

              <h2>Login to Career-Compass</h2>
            </div>
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
              placeholder="Enter your password"
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
            <LogIn size={17} />

            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;