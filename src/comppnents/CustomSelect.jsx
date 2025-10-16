import { useState, useEffect, useRef } from "react";

const CustomSelect = ({ name, options, value, onChange, groupedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderOptions = () => {
    if (groupedOptions) {
      // Render grouped options with headers
      return options.map((group, index) => (
        <div key={index}>
          <div className="font-bold px-4 py-2">{group.header}</div> {/* Zone header */}
          {group.countries.map((country, idx) => (
            <div
              key={idx}
              onClick={() => handleOptionClick(country)}
              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
            >
              {country}
            </div>
          ))}
        </div>
      ));
    }

    // Render normal options
    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleOptionClick(option)}
        className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
      >
        {option}
      </div>
    ));
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="border rounded w-full py-2 px-3 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Select"}
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white border rounded w-full mt-1 shadow-lg">
          <div className="max-h-48 overflow-y-auto">
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
