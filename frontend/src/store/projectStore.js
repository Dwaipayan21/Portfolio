import { create } from "zustand";
import { fetchProjects } from "@/lib/projects";
import { locations } from "@/constants";

const POSITIONS = [
  { position: "top-10 left-5", windowPosition: "top-[5vh] left-5" },
  { position: "top-52 right-80", windowPosition: "top-[20vh] left-7" },
  { position: "top-10 left-80", windowPosition: "top-[33vh] left-7" },
];

const projectToFolderItem = (project, idx) => {
  const pos = POSITIONS[idx % POSITIONS.length];
  let hostname = project.liveLink;
  try { hostname = new URL(project.liveLink).hostname.replace("www.", ""); } catch {}

  return {
    id: project._id,
    name: project.title,
    icon: "/images/folder.png",
    kind: "folder",
    position: pos.position,
    windowPosition: pos.windowPosition,
    children: [
      {
        id: `${project._id}-txt`,
        name: `${project.title} Project.txt`,
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-5 left-10",
        description: project.description.split("\n").filter(Boolean),
      },
      {
        id: `${project._id}-url`,
        name: hostname,
        icon: "/images/safari.png",
        kind: "file",
        fileType: "url",
        href: project.liveLink,
        position: "top-10 right-20",
      },
      {
        id: `${project._id}-img`,
        name: `${project.title.toLowerCase().replace(/\s+/g, "-")}.png`,
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        imageUrl: project.screenshot?.url || "/images/project-placeholder.png",
        position: "top-52 right-80",
      },
      {
        id: `${project._id}-github`,
        name: "GitHub Repo",
        icon: "/images/github.png",
        kind: "file",
        fileType: "url",
        href: project.githubLink,
        position: "top-60 right-20",
      },
    ],
  };
};

const useProjectStore = create((set) => ({
  workChildren: locations.work.children, // fallback until fetch resolves
  loaded: false,
  loadProjects: async () => {
    try {
      const projects = await fetchProjects();
      set({ workChildren: projects.map(projectToFolderItem), loaded: true });
    } catch (err) {
      console.error("Failed to load projects:", err);
      set({ loaded: true });
    }
  },
}));

export default useProjectStore;