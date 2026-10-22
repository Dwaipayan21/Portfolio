
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import imageRoutes from "./routes/image.route.js";
import blogRoutes from "./routes/blog.route.js";
import resumeRoutes from "./routes/resume.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://portfolio-ch7m.onrender.com",
  "https://portfolio-5na9.vercel.app",
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin.replace(/\/$/, ""))
      ) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments for this frontend project only.
      const isPortfolioPreview =
        /^https:\/\/portfolio-5na9-[a-z0-9-]+-dwaipayan21s-projects\.vercel\.app$/.test(
          origin
        );

      if (isPortfolioPreview) {
        return callback(null, true);
      }

      console.error("Blocked CORS origin:", origin);
      return callback(new Error(`CORS error: Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB on demand in Vercel's serverless runtime.
let vercelDbPromise;

if (process.env.VERCEL) {
  app.use(async (req, res, next) => {
    if (
      !req.path.startsWith("/api/") ||
      req.path === "/api/health"
    ) {
      return next();
    }

    try {
      if (!vercelDbPromise) {
        vercelDbPromise = connectDB();
      }

      await vercelDbPromise;
      next();
    } catch (error) {
      vercelDbPromise = undefined;
      next(error);
    }
  });
}

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/resume", resumeRoutes);

// Health-check endpoint for uptime monitoring
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Handle unmatched API routes with JSON 404
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(
    __dirname,
    "../../frontend/dist"
  );

  app.use(express.static(frontendPath));

  app.get(/^(?!\/api(?:\/|$)).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;