import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", requireAuth, createBlog);
router.put("/:id", requireAuth, updateBlog);
router.delete("/:id", requireAuth, deleteBlog);

export default router;