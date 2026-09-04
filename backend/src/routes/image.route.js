import express from "express";
import {
  getImages,
  createImage,
  updateImage,
  deleteImage,
} from "../controller/image.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", requireAuth, upload.single("image"), createImage);
router.put("/:id", requireAuth, upload.single("image"), updateImage);
router.delete("/:id", requireAuth, deleteImage);

export default router;