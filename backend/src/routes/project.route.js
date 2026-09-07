import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", requireAuth, upload.single("coverImage"), createProject);
router.put("/:id", requireAuth, upload.single("coverImage"), updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;