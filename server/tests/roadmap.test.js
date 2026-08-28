const mongoose = require("mongoose");
const Roadmap = require("../models/Roadmap");

describe("Roadmap Model", () => {

  test("should create a valid roadmap", () => {
    const roadmap = new Roadmap({
      user: new mongoose.Types.ObjectId(),

      careerGoal: new mongoose.Types.ObjectId(),

      title: "Software Engineer Roadmap",

      description:
        "Personalized roadmap for software engineering preparation.",

      duration: 12,

      status: "active",

      steps: [
        {
          title: "Learn DSA Fundamentals",
          description:
            "Build strong foundations in data structures and algorithms.",
          skills: ["C++", "DSA"],
          resources: [
            {
              title: "DSA Course",
              url: "https://example.com/dsa",
              type: "course",
            },
          ],
          order: 1,
          completed: false,
        },

        {
          title: "Build Full Stack Projects",
          description:
            "Develop practical projects using modern web technologies.",
          skills: ["React", "Node.js", "MongoDB"],
          resources: [
            {
              title: "Project Practice",
              url: "https://example.com/project",
              type: "project",
            },
          ],
          order: 2,
          completed: false,
        },
      ],
    });

    const error = roadmap.validateSync();

    expect(error).toBeUndefined();
    expect(roadmap.steps).toHaveLength(2);
  });


  test("should require a user reference", () => {
    const roadmap = new Roadmap({
      careerGoal: new mongoose.Types.ObjectId(),
      title: "Software Engineer Roadmap",
      duration: 12,
    });

    const error = roadmap.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.user).toBeDefined();
  });


  test("should require a career goal reference", () => {
    const roadmap = new Roadmap({
      user: new mongoose.Types.ObjectId(),
      title: "Software Engineer Roadmap",
      duration: 12,
    });

    const error = roadmap.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.careerGoal).toBeDefined();
  });


  test("should reject an invalid duration", () => {
    const roadmap = new Roadmap({
      user: new mongoose.Types.ObjectId(),
      careerGoal: new mongoose.Types.ObjectId(),
      title: "Software Engineer Roadmap",
      duration: 0,
    });

    const error = roadmap.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.duration).toBeDefined();
  });

});