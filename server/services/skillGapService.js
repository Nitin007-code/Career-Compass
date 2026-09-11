const roleSkills = require("./roleSkills");

/*
  Skill aliases help us recognize common
  abbreviations and alternative skill names.
 */
const skillAliases = {
  ml: "machine learning",
  llm: "llms",
  "llm api": "llm apis",
  github: "git",
  node: "node.js",
  nodejs: "node.js",
  mongo: "mongodb",
  "mongo db": "mongodb",
  api: "apis",
};

/*
  Normalize a skill or role so comparisons
  are case-insensitive.
 */
const normalizeText = (value = "") => {
  return value.toLowerCase().trim();
};

/*
  Convert common skill aliases into
  their standard skill names.
 */
const normalizeSkill = (skill = "") => {
  const normalizedSkill = normalizeText(skill);

  return skillAliases[normalizedSkill] || normalizedSkill;
};

/*
  Find the required skills for a role
  regardless of capitalization.
 */
const getRequiredSkills = (targetRole) => {
  const normalizedRole = normalizeText(targetRole);

  const roleKey = Object.keys(roleSkills).find(
    (role) => normalizeText(role) === normalizedRole
  );

  return roleKey ? roleSkills[roleKey] : [];
};

/*
  Analyze the gap between the user's
  current skills and the target role.
 */
const analyzeSkillGap = (
  userSkills = [],
  targetRole
) => {
  const requiredSkills =
    getRequiredSkills(targetRole);

  /*
    Normalize user skills before comparison.
    This makes aliases such as ML and LLM work.
   */
  const normalizedUserSkills =
    userSkills.map(normalizeSkill);

  /*
    Find skills the user already has.
   */
  const matchedSkills =
    requiredSkills.filter((skill) =>
      normalizedUserSkills.includes(
        normalizeSkill(skill)
      )
    );

  /*
    Find skills the user still needs.
   */
  const missingSkills =
    requiredSkills.filter(
      (skill) =>
        !normalizedUserSkills.includes(
          normalizeSkill(skill)
        )
    );

  return {
    targetRole,

    matchedSkills,

    missingSkills,

    totalRequiredSkills:
      requiredSkills.length,

    totalMatchedSkills:
      matchedSkills.length,

    totalMissingSkills:
      missingSkills.length,

    matchPercentage:
      requiredSkills.length === 0
        ? 0
        : Math.round(
            (matchedSkills.length /
              requiredSkills.length) *
              100
          ),
  };
};

module.exports = {
  analyzeSkillGap,
};