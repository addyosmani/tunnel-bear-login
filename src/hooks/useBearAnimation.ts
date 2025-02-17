import { useState, useEffect } from 'react';

type InputFocus = 'EMAIL' | 'PASSWORD';

interface UseBearAnimationProps {
  watchBearImages: string[];
  hideBearImages: string[];
  emailLength: number;
}

export function useBearAnimation({ 
  watchBearImages, 
  hideBearImages, 
  emailLength 
}: UseBearAnimationProps) {
  const [currentFocus, setCurrentFocus] = useState<InputFocus>('EMAIL');
  const [currentBearImage, setCurrentBearImage] = useState<string | null>(null);

  useEffect(() => {
    if (currentFocus === 'EMAIL' && watchBearImages.length > 0) {
      // For email input, smoothly transition through watch bear images
      const progress = Math.min(emailLength / 30, 1); // Max out at 30 characters
      const index = Math.min(
        Math.ceil(progress * (watchBearImages.length - 1)),
        watchBearImages.length - 1
      );
      setCurrentBearImage(watchBearImages[Math.max(0, index)]);
    } else if (currentFocus === 'PASSWORD' && hideBearImages.length > 0) {
      // For password input, animate through hide bear images
      hideBearImages.forEach((img, index) => 
        setTimeout(() => setCurrentBearImage(img), index * 40)
      );
    }
  }, [currentFocus, hideBearImages, watchBearImages, emailLength]);

  return {
    currentFocus,
    setCurrentFocus,
    currentBearImage: currentBearImage ?? (watchBearImages.length > 0 ? watchBearImages[0] : null)
  };
}
