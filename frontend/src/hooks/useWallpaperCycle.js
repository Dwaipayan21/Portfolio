import { useEffect, useRef, useState } from "react";
import { WALLPAPERS, MIN_INTERVAL, MAX_INTERVAL } from "@/constants/wallpaper";

const getRandomInterval = () =>
  Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;

const getRandomIndex = (excludeIndex, length) => {
  if (length <= 1) return 0;
  let index;
  do {
    index = Math.floor(Math.random() * length);
  } while (index === excludeIndex);
  return index;
};

export default function useWallpaperCycle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // preload so switches never flash blank
  useEffect(() => {
    WALLPAPERS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => getRandomIndex(prev, WALLPAPERS.length));
        scheduleNext();
      }, getRandomInterval());
    };

    scheduleNext();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return WALLPAPERS[currentIndex];
}