import { useState, useEffect } from "react";

type InputFocus = "EMAIL" | "PASSWORD";

interface UseBearAnimationProps {
  watchBearImages: string[];
  hideBearImages: string[];
  emailLength: number;
  cursorPosition: number;
}

export function useBearAnimation({
  watchBearImages,
  hideBearImages,
  emailLength,
  cursorPosition,
}: UseBearAnimationProps) {
  const [currentFocus, setCurrentFocus] = useState<InputFocus>("EMAIL");
  const [currentBearImage, setCurrentBearImage] = useState<string | null>(null);

  useEffect(() => {
    if (currentFocus === "EMAIL" && watchBearImages.length > 0) {
      // Use the emailLenght by default
      let lengthToUse = emailLength;

      // If the cursor position is not at the end of the email, means the user is editing previous characters
      // So we should use the cursor position instead to focus the bear on the current character
      if (cursorPosition !== emailLength) {
        lengthToUse = cursorPosition;
      }

      // For email input, smoothly transition through watch bear images
      const progress = Math.min(lengthToUse / 30, 1); // Max out at 30 characters
      const index = Math.min(
        Math.floor(progress * (watchBearImages.length - 1)),
        watchBearImages.length - 1
      );
      setCurrentBearImage(watchBearImages[Math.max(0, index)]);
    } else if (currentFocus === "PASSWORD" && hideBearImages.length > 0) {
      // For password input, animate through hide bear images
      hideBearImages.forEach((img, index) =>
        setTimeout(() => setCurrentBearImage(img), index * 40)
      );
    }
  }, [
    currentFocus,
    hideBearImages,
    watchBearImages,
    emailLength,
    cursorPosition,
  ]);

  return {
    currentFocus,
    setCurrentFocus,
    currentBearImage:
      currentBearImage ??
      (watchBearImages.length > 0 ? watchBearImages[0] : null),
  };
}
