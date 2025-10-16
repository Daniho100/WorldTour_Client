import React, { useState } from "react";

const CustomDropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue || "Select Branch");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option); // Call the onChange function passed down from the parent
  };

  return (
    <div className="custom-dropdown relative w-full">
      {/* Dropdown Button */}
      <button
        className="dropdown-btn w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <span className="ml-2">&#9660;</span> {/* Down arrow */}
      </button>

      {/* Options List */}
      {isOpen && (
        <ul className="dropdown-options absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {options.map((option) => (
            <li
              key={option._id}
              className="option-item px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionSelect(option.name)} // When an option is clicked, set it as selected
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
