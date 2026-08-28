const mongoose = require("mongoose");
const Resume = require("../models/Resume");

describe("Resume Model", () => { 

  test("should create a valid resume object", () => {
    const resume = new Resume({
      user: new mongoose.Types.ObjectId(),
      title: "Software Engineer Resume",
      summary: "Computer science student interested in software development.",

      education: [
        {
          degree: "B.Tech CSE",
          institution: "CareerCompass College",
          graduationYear: 2027,
        },
      ],

      experience: [
        {
          company: "Tech Company",
          role: "Software Intern",
          description: "Worked on web development projects.",
        },
      ],

      projects: [
        {
          name: "CareerCompass",
          description: "AI-powered career guidance platform.",
          technologies: ["React", "Node.js", "MongoDB"],
        },
      ],

      certifications: [
        {
          name: "React JS",
          issuer: "Infosys Springboard",
          year: 2026,
        },
      ],
    });

    const error = resume.validateSync();

    expect(error).toBeUndefined();
  });


  test("should require a user reference", () => {
    const resume = new Resume({
      title: "Software Engineer Resume",
    });

    const error = resume.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.user).toBeDefined();
  });


  test("should require a resume title", () => {
    const resume = new Resume({
      user: new mongoose.Types.ObjectId(),
    });

    const error = resume.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.title).toBeDefined();
  });

});