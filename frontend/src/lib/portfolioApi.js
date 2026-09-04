import api from "./api";
export const fetchProjects = () => api.get("/projects").then(r => r.data);
export const fetchBlogs = () => api.get("/blogs").then(r => r.data);
export const fetchGallery = () => api.get("/images").then(r => r.data);
export const fetchResume = () => api.get("/resume").then(r => r.data);