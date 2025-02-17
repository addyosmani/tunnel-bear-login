import { useState, useEffect, useRef } from 'react';

type InputFocus = 'EMAIL' | 'PASSWORD';

interface UseBearAnimationProps {
  watchBearImages: string[];
  hideBearImages: string[];
  peakBearImages: string[];
  emailLength: number;
  showPassword: boolean;
}

export function useBearAnimation({
  watchBearImages,
  hideBearImages,
  peakBearImages,
  emailLength,
  showPassword,
}: UseBearAnimationProps) {
  const [currentFocus, setCurrentFocus] = useState<InputFocus>('EMAIL');
  const [currentBearImage, setCurrentBearImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevFocus = useRef(currentFocus);
  const prevShowPassword = useRef(showPassword);
  const timeouts = useRef<number[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    // Clear existing timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    const animateImages = (
      images: string[],
      interval: number,
      reverse = false,
      onComplete?: () => void,
    ) => {
      if (images.length === 0) {
        onComplete?.();
        return;
      }

      setIsAnimating(true);
      const imageSequence = reverse ? [...images].reverse() : images;

      imageSequence.forEach((img, index) => {
        const timeoutId = setTimeout(() => {
          setCurrentBearImage(img);
          if (index === imageSequence.length - 1) {
            setIsAnimating(false);
            onComplete?.();
          }
        }, index * interval);
        timeouts.current.push(timeoutId);
      });
    };

    // For password input, animate through hide bear images
    const animateWatchingBearImages = () => {
      const progress = Math.min(emailLength / 30, 1);
      const index = Math.min(
 fix/bear-animation-initial-focus
        Math.ceil(progress * (watchBearImages.length - 1)),
        watchBearImages.length - 1

      );
      setCurrentBearImage(watchBearImages[Math.max(0, index)]);
      setIsAnimating(false);
    };

    // Animation Logic based on Focus and ShowPassword
    if (currentFocus === 'EMAIL') {
      if (prevFocus.current === 'PASSWORD') {
        // Reverse hideBearImages when moving from PASSWORD to EMAIL
        animateImages(hideBearImages, 60, true, animateWatchingBearImages);
      } else {
        animateWatchingBearImages();
      }
    } else if (currentFocus === 'PASSWORD') {
      if (prevFocus.current !== 'PASSWORD') {
        // First time entering password field
        animateImages(hideBearImages, 40, false, () => {
          if (showPassword) {
            animateImages(peakBearImages, 50);
          }
        });
      } else if (showPassword && prevShowPassword.current === false) {
        // Show password selected
        animateImages(peakBearImages, 50);
      } else if (!showPassword && prevShowPassword.current === true) {
        // Hide password selected
        animateImages(peakBearImages, 50, true);
      }
    }

    prevFocus.current = currentFocus;
    prevShowPassword.current = showPassword;
  }, [
    currentFocus,
    showPassword,
    emailLength,
    watchBearImages,
    hideBearImages,
    peakBearImages,
  ]);

  return {
    currentFocus,
    setCurrentFocus,
    currentBearImage:
      currentBearImage ?? (watchBearImages.length > 0 ? watchBearImages[0] : null),
    isAnimating,
  };
}
