/*
  AI Service

  This service contains all AI-related logic.
  For development, we use mock AI responses.
*/

const OpenAI = require("openai");

/*
  Mock AI is enabled by default.

  To use the real OpenAI API later:
  USE_MOCK_AI=false
*/
const USE_MOCK_AI = process.env.USE_MOCK_AI !== "false";

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
    Use mock response during development.
  */
  if (USE_MOCK_AI) {
    return {
      careerMatch: 82,
      strengths: [
        "Problem solving",
        "JavaScript",
        "React",
      ],
      weaknesses: [
        "System Design",
        "Advanced DSA",
      ],
      recommendation:
        "Focus on DSA and System Design.",
    };
  }

  /*
    Use OpenAI only when explicitly enabled.
  */
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return response.output_text;
};


/*
  Resume Analysis
*/
const analyzeResume = async (resumeText) => {
  const prompt = `
Analyze the following resume.

Resume:
${resumeText}

Return:
- Resume score
- Strengths
- Weaknesses
- Improvement suggestions
`;

  /*
    Resume-aware mock analysis for MVP development.

    Instead of returning the same result for every user,
    we check the actual extracted resume text.
  */
  if (USE_MOCK_AI) {
    const text = (resumeText || "").toLowerCase();

    /*
      Skills we can recognize from the resume.
    */
    const skillKeywords = [
      {
        name: "JavaScript",
        keywords: ["javascript"],
      },
      {
        name: "TypeScript",
        keywords: ["typescript"],
      },
      {
        name: "Python",
        keywords: ["python"],
      },
      {
        name: "React",
        keywords: ["react"],
      },
      {
        name: "Node.js",
        keywords: ["node.js", "nodejs"],
      },
      {
        name: "MongoDB",
        keywords: ["mongodb", "mongo db"],
      },
      {
        name: "LLMs",
        keywords: [
          "llm",
          "large language model",
          "large language models",
        ],
      },
      {
        name: "LLM APIs",
        keywords: [
          "llm api",
          "llm apis",
          "llm application",
        ],
      },
      {
        name: "LangChain",
        keywords: ["langchain"],
      },
      {
        name: "Machine Learning",
        keywords: [
          "machine learning",
          "ml",
        ],
      },
      {
        name: "System Design",
        keywords: ["system design"],
      },
      {
        name: "Git",
        keywords: ["git", "github"],
      },
    ];


    /*
      Find skills actually mentioned in the resume.
    */
    const detectedSkills = skillKeywords
      .filter((skill) =>
        skill.keywords.some((keyword) =>
          text.includes(keyword)
        )
      )
      .map((skill) => skill.name);


    /*
      Important skills for a software/AI engineering
      profile.

      These are only used by our MVP mock analysis.
    */
    const importantSkills = [
      "Programming",
      "System Design",
      "Machine Learning",
      "LLMs",
      "Git",
    ];


    /*
      Create strengths from skills actually found
      in the resume.
    */
    const strengths = detectedSkills.slice(0, 5);


    /*
      Find important areas that are not mentioned.
    */
    const weaknesses = importantSkills
      .filter((skill) => {
        if (skill === "Programming") {
          return !(
            text.includes("javascript") ||
            text.includes("typescript") ||
            text.includes("python") ||
            text.includes("java") ||
            text.includes("c++")
          );
        }

        if (skill === "System Design") {
          return !text.includes("system design");
        }

        if (skill === "Machine Learning") {
          return !(
            text.includes("machine learning") ||
            text.includes("ml")
          );
        }

        if (skill === "LLMs") {
          return !(
            text.includes("llm") ||
            text.includes("large language model")
          );
        }

        if (skill === "Git") {
          return !(
            text.includes("git") ||
            text.includes("github")
          );
        }

        return true;
      })
      .slice(0, 4);


    /*
      Calculate a simple resume score.

      This is not real AI.
      It is only a useful MVP mock until we connect
      a real LLM.
    */
    const score = Math.min(
      95,
      50 + detectedSkills.length * 6
    );


    /*
      Generate suggestions based on missing areas.
    */
    const suggestions = weaknesses.map(
      (weakness) => {
        if (weakness === "System Design") {
          return "Improve System Design knowledge";
        }

        if (weakness === "Machine Learning") {
          return "Strengthen Machine Learning fundamentals";
        }

        if (weakness === "LLMs") {
          return "Build more practical LLM applications";
        }

        if (weakness === "Git") {
          return "Improve Git and GitHub workflow";
        }

        if (weakness === "Programming") {
          return "Strengthen core programming fundamentals";
        }

        return `Improve ${weakness}`;
      }
    );


    /*
      Add a project-building suggestion for
      engineering-focused resumes.
    */
    if (suggestions.length < 3) {
      suggestions.push(
        "Build practical projects to demonstrate your skills"
      );
    }

    if (suggestions.length < 3) {
      suggestions.push(
        "Keep improving your technical portfolio"
      );
    }


    return {
      score,
      strengths,
      weaknesses,
      suggestions: suggestions.slice(0, 3),
    };
  }


  /*
    Real AI analysis.
  */
  const result = await generateAIResponse(prompt);

  return result;
};


module.exports = {
  generateAIResponse,
  analyzeResume,
};