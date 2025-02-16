import { FormEvent, useRef, useState } from 'react';
import { useBearImages } from '../hooks/useBearImages';
import { useBearAnimation } from '../hooks/useBearAnimation';
import { isValidEmail } from '../utils/validation';
import BearAvatar from './BearAvatar';
import Input from './Input';

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({ email: '', password: '' });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // Destructure all bear images
  const { watchBearImages, hideBearImages, shoutBearImages } = useBearImages();

  // Use bear animation hook
  const { currentBearImage, setCurrentFocus, currentFocus } = useBearAnimation({
    watchBearImages,
    hideBearImages,
    emailLength: values.email.length,
  });

  // Handle email validation on blur
  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    if (values.email) {
      setIsEmailValid(isValidEmail(values.email));
    }
  };

  // Handle focus on email input
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setCurrentFocus('EMAIL');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Voilà~');
  };

  return (
    <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      {/* Bear Avatar */}
      <div className="w-[130px] h-[130px] relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          {!isEmailFocused && !isEmailValid ? (
            shoutBearImages.length > 0 && (
              <BearAvatar currentImage={shoutBearImages[0]} key="shout-bear" />
            )
          ) : (
            currentBearImage && (
              <BearAvatar 
                currentImage={currentBearImage} 
                key={`${currentFocus}-${values.email.length}`} 
              />
            )
          )}
        </div>
      </div>

      {/* Email Input */}
      <Input
        placeholder="Email"
        ref={emailRef}
        autoFocus
        autoComplete="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
        className="form-input"
  error={!isEmailFocused && !isEmailValid ? 'Invalid email address' : undefined}
/>

      {/* Password Input */}
      <Input
        placeholder="Password"
        type="password"
        ref={passwordRef}
        onFocus={() => setCurrentFocus('PASSWORD')}
        autoComplete="current-password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        className="form-input"
      />

      {/* Submit Button */}
      <button type="submit" className="form-button">
        Log In
      </button>
    </form>
  );
}
