import { useEffect, useState } from 'react';
import { fetchResume as apiFetchResume } from '@/lib/portfolioApi';

let cache = null;
let listeners = [];

const notify = () => listeners.forEach((l) => l(cache));

export const fetchResume = async () => {
  try {
    const data = await apiFetchResume();
    cache = data; // { fileUrl, publicId, createdAt, updatedAt, _id } or null
    notify();
    return data;
  } catch (err) {
    console.error("Failed to fetch resume:", err);
    return null;
  }
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