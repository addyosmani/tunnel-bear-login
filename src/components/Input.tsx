import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, className = "", showPassword, setShowPassword, ...props },
  ref
) {
  const inputType =
    props.type === "password" && showPassword ? "text" : props.type;
  return (
    <div className="w-full relative">
      <input
        ref={ref}
        className={`w-full px-4 py-2 rounded border border-gray-300 focus:border-tunnel-bear focus:ring-1 focus:ring-tunnel-bear focus:outline-none ${className}`}
        {...props}
        type={inputType}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {props.type === "password" && (
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword?.(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
});

export default Input;
