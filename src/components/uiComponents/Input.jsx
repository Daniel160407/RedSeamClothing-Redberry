import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import Button from "./Button";

const Input = ({
  value,
  setValue,
  placeholder = "",
  type,
  name,
  errorMessage = "",
  style,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getInputType = () => {
    if (type !== "password") return type;
    return isPasswordVisible ? "text" : "password";
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      {type !== "file" ? (
        <div className="relative w-full">
          <div className="relative">
            <input
              type={getInputType()}
              name={name}
              className={`${style} h-[42px] w-full rounded-[8px] px-3 pr-10 ring-1 transition-all focus:outline-0 ${errorMessage !== "" ? "ring-[#FF4000]" : "ring-[#E1DFE1] focus:ring-black"} `}
              placeholder={placeholder}
              value={value}
              onChange={setValue}
            />
            {type === "password" && (
              <Button
                icon={EyeIcon}
                type="button"
                style="absolute top-1/2 right-3 z-10 -translate-y-1/2 transform cursor-pointer h-full"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          {errorMessage && (
            <p className="mt-1 ml-1 text-sm text-[#FF4000]">{errorMessage}</p>
          )}
        </div>
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
    </>
  );
};

export default Input;
