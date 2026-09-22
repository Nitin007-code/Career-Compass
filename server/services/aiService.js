/*
  AI Service

  This service contains all AI-related logic.

  Modes:

  USE_MOCK_AI=true
    -> Uses local mock AI logic
    -> No API credits required

  USE_MOCK_AI=false
    -> Uses real OpenAI API
    -> Requires OPENAI_API_KEY
*/

const OpenAI = require("openai");

const USE_MOCK_AI = process.env.USE_MOCK_AI !== "false";

/*
  Create OpenAI client only when real AI is enabled.
*/
const client =
  !USE_MOCK_AI && process.env.OPENAI_API_KEY
    ? new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    : null;


/*
  Generate a response using the LLM.
*/
const generateAIResponse = async (prompt) => {
  /*
    MOCK AI
  */
  if (USE_MOCK_AI) {
    console.log("MOCK AI USED");

    return {
      score: 82,
      strengths: [],
      weaknesses: [],
      suggestions: [
        "Focus on the missing skills required for your target role.",
      ],
      detectedSkills: [],
      missingSkills: [],
      matchedSkills: [],
    };
  }

  /*
    REAL OPENAI API
  */
  console.log(" REAL OPENAI API CALLED");

  if (!client) {
    throw new Error(
      "OpenAI client is not configured. Check OPENAI_API_KEY."
    );
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    console.log("✅ OPENAI RESPONSE RECEIVED");

    return response.output_text;
  } catch (error) {
    console.error(
      "❌ OPENAI API ERROR:",
      error.message
    );

    throw error;
  }
};


/*
  Normalize text before skill detection.
*/
const normalizeText = (value = "") => {
  return value
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};


/*
  Skill aliases.

  These allow different ways of writing the same skill to be treated as the same skill.
*/
const skillAliases = {
  Programming: [
    "programming",
    "programming fundamentals",
    "coding",
    "coding fundamentals",
  ],

  DSA: [
    "dsa",
    "data structures",
    "data structures and algorithms",
    "data structure and algorithms",
    "algorithms",
  ],

  OOP: [
    "oop",
    "object oriented programming",
    "object-oriented programming",
  ],

  "Problem Solving": [
    "problem solving",
    "problem-solving",
  ],

  DBMS: [
    "dbms",
    "database management system",
    "database management systems",
  ],

  SQL: [
    "sql",
  ],

  "Operating Systems": [
    "operating systems",
    "operating system",
    "os fundamentals",
  ],

  "Computer Networks": [
    "computer networks",
    "computer networking",
    "networking fundamentals",
  ],

  Git: [
    "git",
    "github",
    "gitlab",
  ],

  Testing: [
    "testing",
    "software testing",
    "unit testing",
    "integration testing",
    "test automation",
  ],

  "System Design": [
    "system design",
    "system architecture",
  ],

  "Software Development": [
    "software development",
    "software engineering",
    "software development lifecycle",
    "sdlc",
  ],

  JavaScript: [
    "javascript",
  ],

  TypeScript: [
    "typescript",
  ],

  Python: [
    "python",
  ],

  React: [
    "react",
    "react.js",
  ],

  "Node.js": [
    "node.js",
    "nodejs",
    "node js",
  ],

  MongoDB: [
    "mongodb",
    "mongo db",
  ],

  LLMs: [
    "llm",
    "llms",
    "large language model",
    "large language models",
  ],

  "LLM APIs": [
    "llm api",
    "llm apis",
    "llm application",
    "llm applications",
  ],

  LangChain: [
    "langchain",
  ],

  "Machine Learning": [
    "machine learning",
    "machine-learning",
  ],
};


/*
  Detect skills from resume text.

  Only skills provided in requiredSkills are checked.
*/
const detectResumeSkills = (
  resumeText = "",
  requiredSkills = []
) => {
  const text = normalizeText(resumeText);

  return requiredSkills.filter((skill) => {
    const aliases =
      skillAliases[skill] || [skill];

    return aliases.some((keyword) =>
      text.includes(normalizeText(keyword))
    );
  });
};


/*
  Parse AI response into a consistent structure.

  Real AI should return JSON, but this function also safely handles unexpected responses.
*/
const parseAIResponse = (responseText) => {
  if (!responseText) {
    return {
      score: 0,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      detectedSkills: [],
      missingSkills: [],
      matchedSkills: [],
    };
  }

  /*
    If the response is already an object, return it directly.
  */
  if (typeof responseText === "object") {
    return responseText;
  }

  try {
    /*
      Remove possible markdown code fences.
    */
    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.warn(
      "⚠️ AI response was not valid JSON."
    );

    /*
      Fallback if AI returns normal text.
    */
    return {
      score: 0,
      strengths: [],
      weaknesses: [],
      suggestions: [responseText],
      detectedSkills: [],
      missingSkills: [],
      matchedSkills: [],
    };
  }
};


/*
  Resume Analysis

  The selected career role controls which skills are considered relevant.
*/
const analyzeResume = async (
  resumeText,
  requiredSkills = []
) => {
  /*
    Detect skills locally first.

    This keeps the actual skill matching deterministic.
  */
  const detectedSkills = detectResumeSkills(
    resumeText,
    requiredSkills
  );

  const normalizedDetectedSkills =
    detectedSkills.map((skill) =>
      normalizeText(skill)
    );

  const missingSkills =
    requiredSkills.filter(
      (skill) =>
        !normalizedDetectedSkills.includes(
          normalizeText(skill)
        )
    );


  /*
    MOCK AI MODE
  */
  if (USE_MOCK_AI) {
    console.log(" MOCK AI RESUME ANALYSIS");

    /*
      Score is based on required skills covered by the resume.
    */
    const score =
      requiredSkills.length === 0
        ? 0
        : Math.round(
            (detectedSkills.length /
              requiredSkills.length) *
              100
          );

    const strengths =
      detectedSkills.slice(0, 5);

    const weaknesses =
      missingSkills.slice(0, 4);

    const suggestions =
      missingSkills.slice(0, 3).map(
        (skill) =>
          `Improve ${skill} knowledge and practical experience`
      );

    if (suggestions.length === 0) {
      suggestions.push(
        "Continue building practical projects related to your target role"
      );
    }

    return {
      score,
      strengths,
      weaknesses,
      suggestions,
      detectedSkills,
      missingSkills,
      matchedSkills: detectedSkills,
    };
  }


  /*
    REAL AI MODE
  */

  console.log(
    "🌐 REAL OPENAI RESUME ANALYSIS"
  );

  const prompt = `
You are a career analysis assistant.

Analyze the following resume specifically for the
selected career role.

Required skills for this role:
${requiredSkills.join(", ")}

Skills detected by the application:
${detectedSkills.join(", ")}

Skills missing according to the application's
skill matching system:
${missingSkills.join(", ")}

Resume:
${resumeText}

Your task:

1. Evaluate the quality and relevance of the resume
   for the selected role.

2. Identify the strongest demonstrated skills.

3. Identify weaknesses or areas that need improvement.

4. Give practical recommendations for improving
   the candidate's preparation for this role.

Important:
- Do not invent experience that is not present.
- Do not add unrelated skills.
- Focus on the selected career role.
- Keep the recommendations practical.
- The application already calculates the exact
  skill match, so do not change the detected,
  matched, or missing skills.

Return ONLY valid JSON in exactly this format:

{
  "score": number,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "suggestions": ["string"]
}
`;

  const result = await generateAIResponse(prompt);

  const aiResult = parseAIResponse(result);

  /*
    Keep deterministic skill information from our application instead of trusting the LLM to calculate it.
  */
  return {
    score:
      typeof aiResult.score === "number"
        ? aiResult.score
        : 0,

    strengths:
      Array.isArray(aiResult.strengths)
        ? aiResult.strengths
        : [],

    weaknesses:
      Array.isArray(aiResult.weaknesses)
        ? aiResult.weaknesses
        : [],

    suggestions:
      Array.isArray(aiResult.suggestions)
        ? aiResult.suggestions
        : [],

    detectedSkills,

    missingSkills,

    matchedSkills: detectedSkills,
  };
};


module.exports = {
  generateAIResponse,
  analyzeResume,
  detectResumeSkills,
};