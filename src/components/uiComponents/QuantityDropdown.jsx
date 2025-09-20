import React, { useState } from "react";

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
      <button
        onClick={handleToggle}
        className="flex h-[42px] w-[70px] cursor-pointer items-center justify-between rounded-[10px] border border-[#E1DFE1] pt-[9px] pr-[16px] pb-[9px] pl-[16px] text-center hover:border-2 hover:border-black"
      >
        <span className="text-gray-800">{value}</span>
        <svg
          className="ml-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
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
