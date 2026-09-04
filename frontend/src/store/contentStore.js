import { create } from "zustand";

import {
  fetchProjects,
  fetchBlogs,
  fetchGallery,
  fetchResume,
} from "../lib/portfolioApi";

const useContentStore = create((set) => ({
  // Data
  projects: [],
  blogPosts: [],
  gallery: [],
  resume: null,

  // State
  loading: false,
  error: null,

  // Fetch everything
  loadContent: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const [
        projects,
        blogPosts,
        gallery,
        resume,
      ] = await Promise.all([
        fetchProjects(),
        fetchBlogs(),
        fetchGallery(),
        fetchResume(),
      ]);

      set({
        projects,
        blogPosts,
        gallery,
        resume,
        loading: false,
      });

      console.log("CONTENT LOADED:", {
        projects,
        blogPosts,
        gallery,
        resume,
      });
    } catch (error) {
      console.error("CONTENT LOAD ERROR:", error);

      set({
        loading: false,
        error: error,
      });
    }
  },
}));

export default useContentStore;