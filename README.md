# 🚀 Career-Compass

An AI-powered career guidance platform built to help students and early-career professionals understand their current career position, identify skill gaps, analyze their resume, and follow a personalized learning roadmap.

> ✅ This project has completed its core MVP development and is ready for final documentation and portfolio presentation.

------------------------------------------------------------------------

## 📌 Current Progress

### ✅ Backend — 100%

- React/Node project structure
- Express.js server setup
- REST API structure
- Health Check API
- Environment configuration
- MongoDB Atlas integration
- Mongoose integration
- Database models
- User Registration API
- User Login API
- Password hashing with bcryptjs
- Profile API
- Create Profile API
- Get Profile API
- Update Profile API
- Career Goal API
- Resume API
- Resume PDF upload
- PDF text extraction
- AI Career Intelligence service
- Skill Gap service
- Role-based skill knowledge base
- Case-insensitive skill matching
- Skill alias matching
- Personalized Roadmap service
- Error handling

### ✅ Frontend — 100%

- React + Vite setup
- React Router
- Dashboard
- Profile
- Career Goals
- Resume
- AI Analysis
- Skill Gap
- Roadmap
- Login
- Register
- Navbar
- Protected Routes
- Public Routes
- User-specific data handling
- Responsive UI
- Loading states
- Empty states
- Error states
- Final UI polish

### ✅ Database — 100%

- MongoDB Atlas
- Mongoose
- User data
- Career profile data
- Resume data
- Career goal data
- AI analysis data
- Roadmap data
- Model relationships
- User-specific data isolation
- MongoDB integration verification

### ✅ Authentication & Authorization — 100%

- User Registration
- User Login
- Secure Password Hashing
- Logout
- Protected Routes
- Public Authentication Routes
- User-specific data handling
- Login/Register redirect handling

> Note: The current MVP uses a simple user-ID based authentication flow. Production-grade JWT or HTTP-only cookie authentication can be added in a future version.

### ✅ AI Integration — 90%

- Resume-aware mock AI analysis
- Resume scoring
- Resume strengths
- Resume weaknesses
- Improvement suggestions
- Career intelligence
- Career-role analysis
- Skill-gap identification
- Personalized recommendations
- Personalized learning roadmap generation

> The current MVP uses a resume-aware mock AI service. Real LLM API integration is planned as a future enhancement.

### ✅ Resume Processing — 100%

- Resume upload
- PDF processing
- PDF text extraction
- Resume text storage
- User-specific resume handling
- Resume analysis
- Resume scoring

### ✅ Skill Gap Analysis — 100%

- Role-based skill requirements
- 18 supported career roles
- Case-insensitive role matching
- Case-insensitive skill matching
- Skill aliases
- Matched skills
- Missing skills
- Match percentage
- Personalized skill gap analysis

### ✅ Testing & Security — 90%

- API testing
- Authentication testing
- User isolation testing
- Resume user-ID verification
- AI analysis verification
- Skill Gap verification
- Roadmap verification
- Protected route testing
- Login/Register flow testing
- Logout testing
- Error handling
- Environment variable protection

### ⏳ Deployment — 0%

- Production Backend Deployment
- Production Frontend Deployment
- Production MongoDB Configuration
- Environment Variable Configuration
- Production API Configuration
- Final Production Testing

------------------------------------------------------------------------

# 📂 Project Structure

```text
career-compass/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── AIAnalysis.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── CareerGoals.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   ├── Register.jsx
│   │   ├── Resume.jsx
│   │   ├── Roadmap.jsx
│   │   ├── SkillGap.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── aiService.js
│   │   ├── careerIntelligenceService.js
│   │   ├── roadmap.services.js
│   │   ├── roleSkills.js
│   │   └── skillGapService.js
│   │
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md

------------------------------------------------------------------------
🚀 Features
🔐 Authentication
User Registration
User Login
Secure Password Hashing
Logout
Protected Routes
Public Routes
Login/Register Redirect Handling
User-specific Data Handling
👤 Career Profile
Personal Information
Education
Degree
Branch
College
Graduation Year
Experience Level
Technical Skills
Target Career
Career Goals
Profile Creation
Profile Viewing
Profile Updating
🎯 Career Goals
Target Role
Target Industry
Target Company
Target Location
Target Salary
Career Timeline
Priority
Goal Status
📄 Resume
Resume Upload
PDF Processing
PDF Text Extraction
Resume Text Storage
User-specific Resume Handling
Resume Analysis
Resume Score
Strength Identification
Weakness Identification
Improvement Suggestions
🤖 AI Career Analysis
Resume Analysis
Resume Scoring
Career-Role Analysis
Career Match
Strength Analysis
Weakness Analysis
Skill Analysis
Skill Gap Identification
AI Recommendations
Career Intelligence
📊 Skill Gap
Role-based Skill Requirements
Matched Skills
Missing Skills
Required Skill Count
Matched Skill Count
Missing Skill Count
Match Percentage
Case-insensitive Matching
Skill Alias Matching
Personalized Skill Gap
🗺️ Personalized Roadmap
Personalized Learning Roadmap
Missing-skill Based Roadmap
Learning Phases
Career-role Based Roadmap
Phase Status
Roadmap Progress
User-specific Roadmap
📈 Dashboard
Career Progress
Resume Score
Career Match
Skill Gap Summary
Roadmap Progress
Career Goal Overview
Recommended Next Action
Quick Access to Career Features
📱 Responsive UI
Desktop Support
Tablet Support
Mobile Support
Responsive Forms
Responsive Cards
Responsive Navigation
Mobile Roadmap Layout
🛠️ Tech Stack
Frontend
React
Vite
JavaScript
React Router
Axios
Lucide React
CSS
Backend
Node.js
Express.js
REST APIs
bcryptjs
Multer
PDF Parser
Database
MongoDB Atlas
Mongoose
AI / Career Intelligence
Resume-aware Mock AI
Resume Analysis
Role-based Skill Matching
Skill Gap Analysis
Personalized Recommendations
Roadmap Generation
Tools
Git
GitHub
VS Code
Postman / Thunder Client
MongoDB Atlas
🚧 Upcoming Features
Phase 1 — Real AI Integration
 Real LLM API integration
 Dynamic resume analysis
 Advanced resume scoring
 Dynamic career-role analysis
 AI-powered recommendations
 Dynamic learning roadmap
Phase 2 — Career Intelligence
 Job description analysis
 Job-market skill analysis
 Career demand analysis
 Skill priority recommendations
 Industry-specific career recommendations
Phase 3 — Career Development
 Job recommendations
 Resume improvement assistant
 Interview preparation
 AI career assistant
 Personalized learning resources
Phase 4 — Production
 Production authentication
 Production backend deployment
 Production frontend deployment
 Production MongoDB configuration
 Security hardening
 Performance optimization
 Final production testing

📊 Project Status

🟢 This project has successfully completed its core MVP development phase.

The initial React frontend and Node/Express backend have been successfully developed and connected with MongoDB Atlas.

The application now provides a complete career-guidance workflow including authentication, profile management, career goals, resume processing, AI-powered resume analysis, personalized skill-gap analysis, and learning roadmap generation.

The current AI system uses a resume-aware mock AI approach for the MVP. Real LLM integration and advanced career intelligence are planned for future versions.

### Progress

Overall Progress        ███████████████████░ 90%

Project Foundation      ████████████████████ 100%

Frontend                ████████████████████ 100%

Backend                 ████████████████████ 100%

Database                ████████████████████ 100%

Authentication           ████████████████████ 100%

Resume Processing        ████████████████████ 100%

AI Career Intelligence   ██████████████████░░ 90%

Skill Gap Analysis       ████████████████████ 100%

Learning Roadmap         ████████████████████ 100%

Testing & Security       ██████████████████░░ 90%

Deployment               ░░░░░░░░░░░░░░░░░░░░ 0%

------------------------------------------------------------------------

# 🎯 Learning Goals
🎯 Learning Goals

This project is being built to master:

✅ MERN Stack

✅ React + Vite

✅ React Router

✅ Node.js & Express.js

✅ REST APIs

✅ MongoDB & Mongoose

✅ Authentication & Password Security

✅ File Upload Handling

✅ PDF Processing

✅ Resume Analysis

✅ AI/LLM Integration Concepts

✅ Prompt Engineering Concepts

✅ Skill Gap Analysis

✅ Personalized Recommendation Systems

✅ Learning Roadmap Generation

✅ User-specific Data Architecture

✅ Responsive UI Development

⏳ Real LLM Integration

⏳ Advanced Career Intelligence

⏳ Production Deployment

⏳ Advanced Security

🤝 Contributing

Suggestions and feedback are welcome.

If you find a bug or have an idea for improving Career-Compass, feel free to open an issue or submit a pull request.

⭐ Author

Nitin Raj Singh

B.Tech CSE Student

Career-Compass — AI-powered career g