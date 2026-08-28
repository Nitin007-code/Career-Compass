const mongoose = require("mongoose");
const Profile = require("../models/Profile"); 

describe("Profile Model", () => {

  test("should create a valid profile object", () => {
    const profile = new Profile({
      user: new mongoose.Types.ObjectId(),
      education: {
        degree: "B.Tech",
        branch: "Computer Science",
        college: "CareerCompass College",
        graduationYear: 2027,
      },
      experienceLevel: "student",
      skills: ["C++", "React", "Node.js"],
      targetRole: "Software Engineer",
      bio: "Computer science student interested in software development.",
    });

    const error = profile.validateSync();

    expect(error).toBeUndefined();
  });


  test("should require a user reference", () => {
    const profile = new Profile({
      targetRole: "Software Engineer",
    });

    const error = profile.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.user).toBeDefined();
  });


  test("should reject an invalid experience level", () => {
    const profile = new Profile({
      user: new mongoose.Types.ObjectId(),
      experienceLevel: "expert",
    });

    const error = profile.validateSync();

    expect(error).toBeDefined();
    expect(error.errors.experienceLevel).toBeDefined();
  });

});