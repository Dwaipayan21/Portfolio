import Image from "../models/image.model.js";

export const getImages = async(req,res) => {
    const images = await Image.find().sort({
        order: 1,
        createdAt: -1
    });
    res.json(images);
};

export const createImage = async(req, res) => {
    const image = await Image.create(req.body);
    res.status(201).json(image);
}

export const updateImage = async(req, res) => {
    const image = await Image.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(image);
}

export const deleteImage = async (req, res) => {
    await Image.findByIdAndDelete(req.params.id);
    res.json({message: "Image deleted Successfully"})
}