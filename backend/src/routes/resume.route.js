import express from "express";
import { getResume, uploadResume, deleteResume } from "../controller/resume.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getResume);
router.post("/", requireAuth, upload.single("resume"), uploadResume);
router.delete("/", requireAuth, deleteResume);

export default router;