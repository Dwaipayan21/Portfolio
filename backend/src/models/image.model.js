import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: {
      url: String,
      publicId: String,
    },
    category: {
      type: String,
      enum: ["Memories", "Places", "People","Favourites"],
      required: true,
    },
    title: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);