const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const careerGoalRoutes = require("./routes/careerGoalRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiAnalysisRoutes = require("./routes/aiAnalysisRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const careerIntelligenceRoutes = require( "./routes/careerIntelligenceRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");


const app = express();

/*
 * Middleware :-
  Middleware functions run between the incoming request and our route/controller logic.
  Middleware sits between the request and the final response. { important middle factor}
  React
  │
  │ GET /api/health
  ↓
Express
  │
  ├── CORS middleware
  │
  ├── JSON middleware
  │
  ├── Authentication middleware (later)
  │
  ├── Validation middleware (later)
  │
  ↓
Route
  ↓
Controller
  ↓
Response
 *    
 */
// Global middleware down here {These middleware functions apply to incoming requests
  // before they reach our individual routes.}

// it Allows our React frontend to communicate with the Express API.
app.use(cors());

// it Allows Express to read JSON request bodies.
app.use(express.json());

// it Allows Express to read URL-encoded form data.
app.use(express.urlencoded({ extended: true }));

/*
 Health Check - just for checkup 
  A simple endpoint used to verify that the backend is alive and responding to requests.
  
 */

app.use("/api/health", healthRoutes); 
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/career-goals", careerGoalRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai-analysis", aiAnalysisRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/career-intelligence",careerIntelligenceRoutes);
app.use("/api/roadmap", roadmapRoutes);
/*
  404 Handler. If no registered route matches the request, return a consistent "not found" response.
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Career-Compass API is running",
  });
});

// Centralized error handler must remain last.

app.use(errorHandler); // If a route calls next(error), Express passes the error to this middleware.
 ///*
//  * API Routes
// Keeping routes in separate files prevents app.js from
 //becoming a large collection of endpoints.


module.exports = app;


    //              CareerCompass
    //                   │
    //    ┌──────────────┼──────────────┐
    //    ▼              ▼              ▼
    // Profile         Resume       Career Goal
    //    │              │              │
    //    └──────────────┼──────────────┘
    //                   ▼
    //             AI Analysis
    //                   │
    //                   ▼
    //              Skill Gap
    //                   │
    //                   ▼
    //           Learning Roadmap