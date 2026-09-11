import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  /*
    If the user is not logged in,
    redirect them to the login page.
   */
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  /*
    User is logged in,
    so allow access to the requested page.
   */
  return children;
}

export default ProtectedRoute;