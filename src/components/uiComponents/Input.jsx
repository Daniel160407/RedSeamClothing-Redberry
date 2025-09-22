import { useState } from "react";
import EyeIcon from "../../icons/EyeIcon";
import Button from "./Button";

const Input = ({
  value,
  setValue,
  placeholder = "",
  type,
  name,
  style = "",
  errorMessage,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getInputType = () => {
    if (type) return type;
    return isPasswordVisible ? "text" : "password";
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      {type !== "file" ? (
        <>
          <div className="relative w-[554px]">
            <input
              type={getInputType()}
              name={name}
              className={`h-[42px] w-full rounded-[8px] border px-3 pr-10 ${style}`}
              required
              placeholder={placeholder}
              value={value}
              onChange={setValue}
            />

            {!type && (
              <Button
                icon={EyeIcon}
                style="absolute top-1/2 right-3 z-10 -translate-y-1/2 transform cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}

            {errorMessage && (
              <p className="absolute top-[46px] left-0 text-sm text-[#FF4000]">
                {errorMessage}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <label htmlFor="fileInput" className="cursor-pointer">
            {placeholder}
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={setValue}
          />
        </>
      )}
    </div>
  );
};

export default Input;
