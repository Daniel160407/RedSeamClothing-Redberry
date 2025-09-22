import { useState } from "react";
import Button from "./Button";
import DownArrowIcon from "../icons/DownArrowIcon";

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    onChange("quantity", option);
  };

  return (
    <div className="relative inline-block cursor-pointer">
      <Button
        icon={DownArrowIcon}
        iconPosition={"RIGHT"}
        title={value}
        style="flex h-[42px] w-[70px] cursor-pointer items-center rounded-[10px] border border-[#E1DFE1] py-[9px] px-[16px] gap-[10px] text-gray-800 text-center hover:border-2 hover:border-black"
        onClick={handleToggle}
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-[70px] rounded-[10px] border border-gray-300 bg-white shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="cursor-pointer rounded-[10px] pt-[9px] pr-[16px] pb-[9px] pl-[16px] text-center hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
