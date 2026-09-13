import React, { useEffect, useRef, useState } from "react";
import useWallpaperCycle from "@/hooks/useWallpaperCycle";

const Wallpaper = () => {
  const wallpaper = useWallpaperCycle();
  const [layers, setLayers] = useState([{ src: wallpaper, visible: true }]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // add new layer on top, invisible first
    setLayers((prev) => [...prev, { src: wallpaper, visible: false }]);

    const raf = requestAnimationFrame(() => {
      setLayers((prev) =>
        prev.map((layer, i) =>
          i === prev.length - 1 ? { ...layer, visible: true } : layer
        )
      );
    });

    // drop old layers once fade completes
    const cleanup = setTimeout(() => {
      setLayers((prev) => prev.slice(-1));
    }, 2100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cleanup);
    };
  }, [wallpaper]);

  return (
    <div id="wallpaper-root">
      {layers.map((layer, i) => (
        <div
          key={layer.src + i}
          className="wallpaper-layer"
          style={{
            backgroundImage: `url(${layer.src})`,
            opacity: layer.visible ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};

export default Wallpaper;