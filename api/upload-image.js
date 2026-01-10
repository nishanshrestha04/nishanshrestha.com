import { uploadImage } from "../utils/github.js";
import {
  verifyAdminPassword,
  successResponse,
  errorResponse,
} from "../utils/auth.js";

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json(errorResponse("Method not allowed", 405));
  }

  try {
    const { password, fileName, base64Content, type } = req.body;

    // Verify password
    if (!verifyAdminPassword(password)) {
      return res.status(401).json(errorResponse("Unauthorized", 401));
    }

    if (!fileName || !base64Content || !type) {
      return res
        .status(400)
        .json(errorResponse("Missing required fields", 400));
    }

    // Determine path based on type
    let path;
    if (type === "project") {
      path = `public/assets/projects/${fileName}`;
    } else if (type === "logo") {
      path = `public/assets/logos/${fileName}`;
    } else {
      return res.status(400).json(errorResponse("Invalid image type", 400));
    }

    // Upload to GitHub
    await uploadImage(path, base64Content, `Upload ${type} image: ${fileName}`);

    return res.status(200).json(
      successResponse({
        message: "Image uploaded successfully",
        path: `/assets/${
          type === "project" ? "projects" : "logos"
        }/${fileName}`,
      })
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return res
      .status(500)
      .json(errorResponse(error.message || "Internal server error", 500));
  }
}
