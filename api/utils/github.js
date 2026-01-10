import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = process.env.GITHUB_REPO_OWNER || "nishanshrestha04";
const REPO_NAME = process.env.GITHUB_REPO_NAME || "nishanshrestha.com";
const BRANCH = process.env.GITHUB_BRANCH || "main";

/**
 * Get the current content and SHA of a file from GitHub
 */
export async function getFileContent(path) {
  try {
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      ref: BRANCH,
    });

    if (data.type !== "file") {
      throw new Error("Path is not a file");
    }

    return {
      content: Buffer.from(data.content, "base64").toString("utf-8"),
      sha: data.sha,
    };
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
}

/**
 * Update a file in GitHub repository
 */
export async function updateFile(path, content, message, sha) {
  try {
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch: BRANCH,
    });

    return data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
}

/**
 * Upload an image to GitHub repository
 */
export async function uploadImage(path, base64Content, message) {
  try {
    // Check if file exists first
    let sha;
    try {
      const existing = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        ref: BRANCH,
      });
      sha = existing.data.sha;
    } catch (error) {
      // File doesn't exist, that's fine
      sha = undefined;
    }

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      content: base64Content,
      ...(sha && { sha }),
      branch: BRANCH,
    });

    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Generate formatted constants file content
 */
export function generateConstantsFile(projects, experiences, socials) {
  return `export const myProjects = ${JSON.stringify(projects, null, 2)};

export const mySocials = ${JSON.stringify(socials, null, 2)};

export const experiences = ${JSON.stringify(experiences, null, 2)};
`;
}

/**
 * Validate project data
 */
export function validateProject(project) {
  const errors = [];

  if (!project.title || project.title.trim() === "") {
    errors.push("Title is required");
  }

  if (!project.description || project.description.trim() === "") {
    errors.push("Description is required");
  }

  if (
    !Array.isArray(project.subDescription) ||
    project.subDescription.length === 0
  ) {
    errors.push("At least one sub-description is required");
  }

  if (!project.href || project.href.trim() === "") {
    errors.push("Project URL is required");
  }

  if (!project.image || project.image.trim() === "") {
    errors.push("Project image is required");
  }

  if (!Array.isArray(project.tags) || project.tags.length === 0) {
    errors.push("At least one tag is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate experience data
 */
export function validateExperience(experience) {
  const errors = [];

  if (!experience.title || experience.title.trim() === "") {
    errors.push("Job title is required");
  }

  if (!experience.job || experience.job.trim() === "") {
    errors.push("Company/organization is required");
  }

  if (!experience.date || experience.date.trim() === "") {
    errors.push("Date is required");
  }

  if (!Array.isArray(experience.contents) || experience.contents.length === 0) {
    errors.push("At least one content item is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get next project ID
 */
export function getNextProjectId(projects) {
  if (!projects || projects.length === 0) return 1;
  return Math.max(...projects.map((p) => p.id)) + 1;
}
