import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const userId = localStorage.getItem("userId");

  /*
    If the user is already logged in,
    they do not need Login/Register again.
   */
  if (userId) {
    return <Navigate to="/dashboard" replace />;
  }

  /*
    User is logged out,
    so allow access to the public page.
   */
  return children;
}

export default PublicRoute;