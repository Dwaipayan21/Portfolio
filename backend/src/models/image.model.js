import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: {
      url: String,
      publicId: String,
    },
    category: {
      type: String,
      enum: ["Library", "Memories", "Places", "People","Favourites"],
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);