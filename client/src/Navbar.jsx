import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Target,
  FileText,
  BrainCircuit,
  ChartNoAxesCombined,
  Route,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    /*
      Remove the logged-in user's ID.
     */
    localStorage.removeItem("userId");

    /*
      Send the user back to Profile.
     */
    navigate("/profile");

    /*
      Refresh so the Navbar immediately switches to Login/Register state.
     */
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <Route size={18} />
        </div>

        <span>Career-Compass</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/" className={navClass}>
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <UserRound size={16} />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/career-goals" className={navClass}>
          <Target size={16} />
          <span>Career Goals</span>
        </NavLink>

        <NavLink to="/resume" className={navClass}>
          <FileText size={16} />
          <span>Resume</span>
        </NavLink>

        <NavLink to="/ai-analysis" className={navClass}>
          <BrainCircuit size={16} />
          <span>AI Analysis</span>
        </NavLink>

        <NavLink to="/skill-gap" className={navClass}>
          <ChartNoAxesCombined size={16} />
          <span>Skill Gap</span>
        </NavLink>

        <NavLink to="/roadmap" className={navClass}>
          <Route size={16} />
          <span>Roadmap</span>
        </NavLink>

        {!userId ? (
          <>
            <NavLink
              to="/register"
              className={navClass}
            >
              <UserPlus size={16} />
              <span>Register</span>
            </NavLink>

            <NavLink
              to="/login"
              className={navClass}
            >
              <LogIn size={16} />
              <span>Login</span>
            </NavLink>
          </>
        ) : (
          <button
            type="button"
            className="nav-link"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;