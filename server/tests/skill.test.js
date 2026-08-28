const mongoose = require("mongoose");
const Skill = require("../models/Skill");

describe("Skill Model", () => {

  test("should create a valid skill", () => {
    const skill = new Skill({
      user: new mongoose.Types.ObjectId(),
      name: "React",
      category: "frontend",
      proficiency: "intermediate",
      yearsOfExperience: 1,
      source: "user",
    });

    const error = skill.validateSync();

    expect(error).toBeUndefined();
    expect(skill.name).toBe("react");
  });


  test("should require a skill name", () => {
    const skill = new Skill({
      user: new mongoose.Types.ObjectId(),
    });

    const error = skill.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });


  test("should reject an invalid proficiency", () => {
    const skill = new Skill({
      user: new mongoose.Types.ObjectId(),
      name: "React",
      proficiency: "master",
    });

    const error = skill.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.proficiency).toBeDefined();
  });


  test("should reject negative experience", () => {
    const skill = new Skill({
      user: new mongoose.Types.ObjectId(),
      name: "React",
      yearsOfExperience: -2,
    });

    const error = skill.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.yearsOfExperience).toBeDefined();
  });

});