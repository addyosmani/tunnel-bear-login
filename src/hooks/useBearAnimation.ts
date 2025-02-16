import { useState, useEffect } from "react";

type InputFocus = "EMAIL" | "PASSWORD";

interface UseBearAnimationProps {
  watchBearImages: string[];
  hideBearImages: string[];
  emailLength: number;
  showPassword: boolean;
}

export function useBearAnimation({
  watchBearImages,
  hideBearImages,
  emailLength,
  showPassword,
}: UseBearAnimationProps) {
  const [currentFocus, setCurrentFocus] = useState<InputFocus>("EMAIL");
  const [currentBearImage, setCurrentBearImage] = useState<string | null>(null);

  useEffect(() => {
    if (currentFocus === "EMAIL" && watchBearImages.length > 0) {
      // For email input, smoothly transition through watch bear images
      const progress = Math.min(emailLength / 30, 1); // Max out at 30 characters
      const index = Math.min(
        Math.floor(progress * (watchBearImages.length - 1)),
        watchBearImages.length - 1
      );
      setCurrentBearImage(watchBearImages[Math.max(0, index)]);
    } else if (currentFocus === "PASSWORD" && hideBearImages.length > 0) {
      if (showPassword) {
        // If password is shown, reverse the animation
        hideBearImages
          .slice()
          .reverse()
          .forEach((img, index) =>
            setTimeout(() => setCurrentBearImage(img), index * 40)
          );
      } else {
        // Otherwise, animate through hide bear images in order
        hideBearImages.forEach((img, index) =>
          setTimeout(() => setCurrentBearImage(img), index * 40)
        );
      }
    }
  }, [
    currentFocus,
    hideBearImages,
    watchBearImages,
    emailLength,
    showPassword,
  ]);

  return {
    currentFocus,
    setCurrentFocus,
    currentBearImage:
      currentBearImage ??
      (watchBearImages.length > 0 ? watchBearImages[0] : null),
  };
}
