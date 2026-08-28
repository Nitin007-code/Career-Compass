const mongoose = require("mongoose");
const CareerGoal = require("../models/CareerGoal");

describe("Career Goal Model", () => {

  test("should create a valid career goal", () => {
    const goal = new CareerGoal({
      user: new mongoose.Types.ObjectId(),
      targetRole: "Software Engineer",
      targetIndustry: "Technology",
      targetCompany: "Google",
      targetLocation: "India",
      targetSalary: 2500000,
      timeline: "1-year",
      priority: "high",
      status: "active",
    });

    const error = goal.validateSync(); // Validate the career goal object without saving to the database.   

    expect(error).toBeUndefined();
  });


  test("should require a target role", () => {
    const goal = new CareerGoal({
      user: new mongoose.Types.ObjectId(),
    });

    const error = goal.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.targetRole).toBeDefined();
  });


  test("should reject an invalid timeline", () => {
    const goal = new CareerGoal({
      user: new mongoose.Types.ObjectId(),
      targetRole: "Software Engineer",
      timeline: "10-days",
    });

    const error = goal.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.timeline).toBeDefined();
  });


  test("should reject negative salary", () => {
    const goal = new CareerGoal({
      user: new mongoose.Types.ObjectId(),
      targetRole: "Software Engineer",
      targetSalary: -50000,
    });

    const error = goal.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.targetSalary).toBeDefined();
  });

});