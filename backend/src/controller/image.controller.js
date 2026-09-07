import Image from "../models/image.model.js";

export const getImages = async(req,res) => {
    const images = await Image.find().sort({
        order: 1,
        createdAt: -1
    });
    res.json(images);
};

export const createImage = async (req, res) => {
  try {
    const { title, category } = req.body;
    const imageData = { title, category };

    if (req.file) {
      imageData.image = {
        url: req.file.path,       // ← the actual image URL, from Multer/Cloudinary
        publicId: req.file.filename,
      };
    }

    const image = await Image.create(imageData);
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateImage = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }
    const image = await Image.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteImage = async (req, res) => {
    await Image.findByIdAndDelete(req.params.id);
    res.json({message: "Image deleted Successfully"})
}