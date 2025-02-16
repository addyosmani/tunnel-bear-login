import { FormEvent, useRef, useState } from "react";
import { useBearImages } from "../hooks/useBearImages";
import { useBearAnimation } from "../hooks/useBearAnimation";
import BearAvatar from "./BearAvatar";
import Input from "./Input";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({ email: "", password: "" });
  const [cursorPosition, setCursorPosition] = useState(0);

  const { watchBearImages, hideBearImages } = useBearImages();
  const { currentBearImage, setCurrentFocus, currentFocus } = useBearAnimation({
    watchBearImages,
    hideBearImages,
    emailLength: values.email.length,
    cursorPosition,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    alert("Voilà~");
  };

  const handleChange = (
    field: "email" | "password",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((values) => ({ ...values, [field]: e.target.value }));

    setCursorPosition(e.target.selectionStart || 0);
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
        onChange={(e) => handleChange("email", e)}
      />

      <Input
        placeholder="Password"
        type="password"
        ref={passwordRef}
        onFocus={() => setCurrentFocus("PASSWORD")}
        autoComplete="current-password"
        value={values.password}
        onChange={(e) => handleChange("password", e)}
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
