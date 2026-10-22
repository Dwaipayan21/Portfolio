import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "frontend", "dist");
const publicDir = path.join(root, "public");

if (!fs.existsSync(path.join(dist, "index.html"))) {
  throw new Error("Frontend build not found. Run the Vite build first.");
}

fs.mkdirSync(publicDir, { recursive: true });
fs.cpSync(dist, publicDir, { recursive: true });

console.log("Vercel frontend files prepared in /public");