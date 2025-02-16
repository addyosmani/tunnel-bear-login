import { FormEvent, useRef, useState } from "react";
import { useBearImages } from "../hooks/useBearImages";
import { useBearAnimation } from "../hooks/useBearAnimation";
import BearAvatar from "./BearAvatar";
import Input from "./Input";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const { watchBearImages, hideBearImages } = useBearImages();
  const { currentBearImage, setCurrentFocus, currentFocus } = useBearAnimation({
    watchBearImages,
    hideBearImages,
    emailLength: values.email.length,
    showPassword,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    alert("Voilà~");
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
        ref={emailRef}
        autoFocus
        onFocus={() => setCurrentFocus("EMAIL")}
        autoComplete="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />

      <Input
        placeholder="Password"
        type="password"
        ref={passwordRef}
        onFocus={() => setCurrentFocus("PASSWORD")}
        autoComplete="current-password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <button
        type="submit"
        className="py-4 w-full rounded-lg bg-tunnel-bear font-semibold text-lg focus:outline-tunnel-bear outline-offset-2"
      >
        Log In
      </button>
    </form>
  );
}
