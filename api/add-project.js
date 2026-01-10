const {
  getFileContent,
  updateFile,
  generateConstantsFile,
  validateProject,
  getNextProjectId,
} = require("./utils/github-helpers");
const { verifyAdminPassword, corsHeaders } = require("./utils/auth-helpers");

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({});
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { password, project } = req.body;

    // Verify password
    if (!verifyAdminPassword(password)) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    // Validate project data
    const validation = validateProject(project);
    if (!validation.isValid) {
      return res
        .status(400)
        .json({ success: false, error: validation.errors.join(", ") });
    }

    // Get current constants file
    const { content, sha } = await getFileContent("src/constants/index.js");

    // Parse current data
    const projectsMatch = content.match(
      /export const myProjects = (\[[\s\S]*?\]);/
    );
    const socialsMatch = content.match(
      /export const mySocials = (\[[\s\S]*?\]);/
    );
    const experiencesMatch = content.match(
      /export const experiences = (\[[\s\S]*?\]);/
    );

    if (!projectsMatch) {
      return res
        .status(500)
        .json({ success: false, error: "Could not parse constants file" });
    }

    const currentProjects = eval(projectsMatch[1]);
    const currentSocials = socialsMatch ? eval(socialsMatch[1]) : [];
    const currentExperiences = experiencesMatch
      ? eval(experiencesMatch[1])
      : [];

    // Add new project with auto-generated ID
    const newProject = {
      ...project,
      id: project.id || getNextProjectId(currentProjects),
    };

    const updatedProjects = [...currentProjects, newProject];

    // Generate new file content
    const newContent = generateConstantsFile(
      updatedProjects,
      currentExperiences,
      currentSocials
    );

    // Commit to GitHub
    await updateFile(
      "src/constants/index.js",
      newContent,
      `Add project: ${newProject.title}`,
      sha
    );

    return res.status(200).json({
      success: true,
      data: {
        message: "Project added successfully",
        project: newProject,
      },
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message || "Internal server error",
      });
  }
};
