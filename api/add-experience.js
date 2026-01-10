const {
  getFileContent,
  updateFile,
  generateConstantsFile,
  validateExperience,
} = require("./utils/github-helpers");
const { verifyAdminPassword } = require("./utils/auth-helpers");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({});
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { password, experience } = req.body;

    if (!verifyAdminPassword(password)) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const validation = validateExperience(experience);
    if (!validation.isValid) {
      return res
        .status(400)
        .json({ success: false, error: validation.errors.join(", ") });
    }

    const { content, sha } = await getFileContent("src/constants/index.js");

    const projectsMatch = content.match(
      /export const myProjects = (\[[\s\S]*?\]);/
    );
    const socialsMatch = content.match(
      /export const mySocials = (\[[\s\S]*?\]);/
    );
    const experiencesMatch = content.match(
      /export const experiences = (\[[\s\S]*?\]);/
    );

    if (!experiencesMatch) {
      return res
        .status(500)
        .json({ success: false, error: "Could not parse constants file" });
    }

    const currentProjects = projectsMatch ? eval(projectsMatch[1]) : [];
    const currentSocials = socialsMatch ? eval(socialsMatch[1]) : [];
    const currentExperiences = eval(experiencesMatch[1]);

    const updatedExperiences = [experience, ...currentExperiences];
    const newContent = generateConstantsFile(
      currentProjects,
      updatedExperiences,
      currentSocials
    );

    await updateFile(
      "src/constants/index.js",
      newContent,
      `Add experience: ${experience.title} at ${experience.job}`,
      sha
    );

    return res.status(200).json({
      success: true,
      data: {
        message: "Experience added successfully",
        experience,
      },
    });
  } catch (error) {
    console.error("Error adding experience:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message || "Internal server error",
      });
  }
};
