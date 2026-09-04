import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import imageRoutes from "./routes/image.route.js";
import blogRoutes from "./routes/blog.route.js";
import resumeRoutes from "./routes/resume.route.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// app.get("/api/projects", (req, res) => {
//   res.send("Projects route working");
// });

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/resume", resumeRoutes);

export default app;