import Project from "../models/project.model.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json(projects);
};

export const createProject = async (req, res) => {
  try {
    const { title, description, liveLink, githubLink, order } = req.body;

    if (!title || !description || !liveLink || !githubLink) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const projectData = { title, description, liveLink, githubLink, order };

    if (req.file) {
      projectData.screenshot = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.screenshot = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project Deleted Successfully" });
};