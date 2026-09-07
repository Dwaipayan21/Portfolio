import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true 
    },
    description: { 
      type: String,
      required: true 
    },
    liveLink:{
      type: String,
      required:true
    },
    githubLink: {
      type: String,
      required: true
    },
    screenshot: {
      url: String,
      publicId: String,
    },
    order: { 
      type: Number,
      default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);