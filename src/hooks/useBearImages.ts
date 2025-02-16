import { useState, useEffect } from 'react';

interface BearImages {
  watchBearImages: string[];
  hideBearImages: string[];
  shoutBearImages: string[];
}

export function useBearImages(): BearImages {
  const [watchBearImages, setWatchBearImages] = useState<string[]>([]);
  const [hideBearImages, setHideBearImages] = useState<string[]>([]);
  const [shoutBearImages, setShoutBearImages] = useState<string[]>([]);

  useEffect(() => {
    type ImageModule = { default: string };
    
    const watchImages = import.meta.glob<ImageModule>("/src/assets/img/watch_bear_*.png", { eager: true });
    const hideImages = import.meta.glob<ImageModule>("/src/assets/img/hide_bear_*.png", { eager: true });
    const shoutImages = import.meta.glob<ImageModule>("/src/assets/img/shout_bear_*.png", { eager: true });

    const sortImages = (images: Record<string, ImageModule>) => {
      return Object.values(images)
        .map(img => img.default)
        .sort((a, b) => {
          const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
          const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
          return aNum - bNum;
        });
    };

    setWatchBearImages(sortImages(watchImages));
    setHideBearImages(sortImages(hideImages));
    setShoutBearImages(sortImages(shoutImages));
  }, []);

  return {
    watchBearImages,
    hideBearImages,
    shoutBearImages,
  };
}
