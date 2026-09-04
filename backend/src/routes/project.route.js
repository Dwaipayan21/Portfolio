import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;