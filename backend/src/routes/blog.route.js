import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", requireAuth, upload.single("coverImage"), createBlog);
router.put("/:id", requireAuth, upload.single("coverImage"), updateBlog);
router.delete("/:id", requireAuth, deleteBlog);

export default router;