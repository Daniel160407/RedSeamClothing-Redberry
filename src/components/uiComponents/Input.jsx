import { useState } from "react";
import EyeIcon from "../../icons/EyeIcon";

const Input = ({
  value,
  setValue,
  placeholder = "",
  type,
  name,
  showPassword = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword);

  const getInputType = () => {
    if (type) return type;
    return isPasswordVisible ? "text" : "password";
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <input
        type={getInputType()}
        name={name}
        className="h-[42px] w-[554px] rounded-[8px] border border-gray-300 px-3 pr-10"
        required
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />

      {!type && (
        <button
          type="button"
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 transform"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          <EyeIcon isOpen={isPasswordVisible} />
        </button>
      )}
    </div>
  );
};

export default Input;
