/*
  Roadmap Service :-
 Converts skill gaps into a simple
  personalized learning roadmap.
 */

const generateRoadmap = (skillGap) => {
  const phases = skillGap.missingSkills.map((skill, index) => ({
    phase: index + 1,
    title: `Learn ${skill}`,
    skill,
    status: "not-started",
  }));

  return {
    targetRole: skillGap.targetRole,
    totalPhases: phases.length,
    phases,
  };
};

module.exports = {
  generateRoadmap,
};