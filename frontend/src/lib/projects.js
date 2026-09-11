export const fetchProjects = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};