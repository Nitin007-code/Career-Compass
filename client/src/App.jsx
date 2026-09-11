import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./Profile";
import CareerGoals from "./CareerGoals";
import Resume from "./Resume";
import AIAnalysis from "./AIAnalysis";
import SkillGap from "./SkillGap";
import Roadmap from "./Roadmap";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import "./App.css";

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Navbar />

      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to={userId ? "/dashboard" : "/profile"}
              replace
            />
          }
        />

        {/* Public routes */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-goals"
          element={
            <ProtectedRoute>
              <CareerGoals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-analysis"
          element={
            <ProtectedRoute>
              <AIAnalysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-gap"
          element={
            <ProtectedRoute>
              <SkillGap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />
        <Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>

<Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to={userId ? "/dashboard" : "/profile"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;