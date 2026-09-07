import Blog from "../models/blog.model.js";

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ order: 1, createdAt: -1 });
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const blogData = { title, url, description };

    if (req.file) {
      blogData.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog Deleted Successfully" });
};