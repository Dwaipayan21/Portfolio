import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // resume needs raw resource_type since it's a PDF/doc, not an image
    const isResume = file.fieldname === "resume";

    return {
      folder: isResume ? "portfolio/resumes" : "portfolio/images",
      resource_type: isResume ? "raw" : "image",
      allowed_formats: isResume
        ? ["pdf", "doc", "docx"]
        : ["jpg", "jpeg", "png", "webp"],
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;