import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true },
    publicId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);