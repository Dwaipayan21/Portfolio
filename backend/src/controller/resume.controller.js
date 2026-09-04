import Resume from "../models/resume.model.js";
import { v2 as cloudinary } from "cloudinary";

// GET latest resume (public)
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST upload/replace resume (protected)
export const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // remove old resume(s) so only one ever exists
  const existing = await Resume.find();
  for (const doc of existing) {
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId, { resource_type: "raw" });
    }
  }
  await Resume.deleteMany();

  const resume = await Resume.create({
    fileUrl: req.file.path,        // cloudinary gives back the hosted URL
    publicId: req.file.filename,   // multer-storage-cloudinary sets this
  });

  res.status(201).json(resume);
};

// DELETE resume (protected)
export const deleteResume = async (req, res) => {
  const resume = await Resume.findOne();
  if (!resume) return res.status(404).json({ message: "No resume to delete" });

  if (resume.publicId) {
    await cloudinary.uploader.destroy(resume.publicId, { resource_type: "raw" });
  }
  await Resume.deleteMany();

  res.json({ message: "Resume deleted" });
};