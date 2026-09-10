import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL; // adjust to your actual env var name

let cache = null;
let listeners = [];

const notify = () => listeners.forEach((l) => l(cache));

export const fetchResume = async () => {
  const res = await fetch(`${API_URL}/resume`);
  const data = await res.json();
  cache = data; // { fileUrl, publicId, createdAt, updatedAt, _id } or null
  notify();
  return data;
};

export const useResume = () => {
  const [resume, setResume] = useState(cache);

  useEffect(() => {
    listeners.push(setResume);
    if (!cache) fetchResume();
    return () => { listeners = listeners.filter((l) => l !== setResume); };
  }, []);

  return resume; // null while loading / no resume yet
};