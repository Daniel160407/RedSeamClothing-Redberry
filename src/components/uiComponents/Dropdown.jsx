import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Dropdown = ({
  title,
  options,
  onChange,
  buttonStyle = "",
  contentStyle = "",
  icon: Icon,
  iconPosition = "LEFT",
  defaultValue = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div ref={dropdownRef} className={"relative inline-block cursor-pointer"}>
      <Button
        icon={Icon}
        iconPosition={iconPosition}
        title={selectedValue}
        style={buttonStyle}
        onClick={handleToggle}
      />

      {isOpen && (
        <div className={contentStyle}>
          <div className="gap-[10px] px-[16px]">
            {title && (
              <p className="font-poppins text-[16px] leading-[100%] font-semibold tracking-normal text-[#10151F]">
                {title}
              </p>
            )}
          </div>
          <ul className="max-h-60 overflow-auto">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`gap-[10px] px-[16px] py-[8px] ${
                  option === selectedValue ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
