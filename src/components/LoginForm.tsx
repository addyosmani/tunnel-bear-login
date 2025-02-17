import { FormEvent, useRef, useState } from 'react';
import { useBearImages } from '../hooks/useBearImages';
import { useBearAnimation } from '../hooks/useBearAnimation';
import BearAvatar from './BearAvatar';
import Input from './Input';
import EyeIconSrc from '/src/assets/icons/eye_on.svg';
import EyeOffIconSrc from '/src/assets/icons/eye_off.svg';

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { watchBearImages, hideBearImages, peakBearImages } =
    useBearImages();
  const {
    currentBearImage,
    setCurrentFocus,
    currentFocus,
    isAnimating,
  } = useBearAnimation({
    watchBearImages,
    hideBearImages,
    peakBearImages,
    emailLength: values.email.length,
    showPassword,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    alert('Voilà~');
  };

  const togglePassword = () => {
    // Only toggle if we're not currently animating
    if (!isAnimating) {
      setShowPassword((prev) => !prev);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="w-full flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="w-[130px] h-[130px] relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          {currentBearImage && (
            <BearAvatar
              currentImage={currentBearImage}
              key={`${currentFocus}-${values.email.length}`}
            />
          )}
        </div>
      </div>
      <Input
        placeholder="Email"
        name="email"
        type="email"
        ref={emailRef}
        autoFocus
        onFocus={() => setCurrentFocus('EMAIL')}
        autoComplete="email"
        value={values.email}
        onChange={handleInputChange}
      />
      <div className="w-full relative">
        <Input
          placeholder="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          ref={passwordRef}
          onFocus={() => setCurrentFocus('PASSWORD')}
          autoComplete="current-password"
          value={values.password}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={`absolute right-3 top-1/2 -translate-y-1/2
           text-gray-500 focus:outline-none transition-all duration-300
           hover:text-gray-700`}
        >
          {showPassword ? (
            <img
              src={EyeOffIconSrc}
              alt="Hide password"
              className="w-5 h-5 transition-transform transform rotate-0 hover:scale-110"
            />
          ) : (
            <img
              src={EyeIconSrc}
              alt="Show password"
              className="w-5 h-5 transition-transform transform rotate-0 hover:scale-110"
            />
          )}
        </button>
      </div>
      <button
        type="submit"
        className="py-4 w-full rounded-lg bg-tunnel-bear font-semibold text-lg focus:outline-tunnel-bear outline-offset-2"
      >
        Log In
      </button>
    </form>
  );
}
