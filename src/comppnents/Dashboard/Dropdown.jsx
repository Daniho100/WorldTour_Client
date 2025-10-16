import React, { useState, useEffect, useRef } from 'react';
import assets from '../../assets/assets';

const Dropdown = ({ 
  text1 = 'Today', 
  text2 = 'Last 7 days', 
  text3 = 'Last 30 days', 
  buttonClass = '', 
  icon = assets.arrowdown // Default icon
}) => {
  const [selected, setSelected] = useState(text1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const options = [
    { label: text1, value: text1 },
    { label: text2, value: text2 },
    { label: text3, value: text3 },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`inline-flex justify-between items-center w-[114px] p-2 border border-gray3 rounded-md shadow-sm text-xs font-medium hover:bg-opacity-80 focus:outline-none whitespace-nowrap ${buttonClass}`}
      >
        {selected}
        <img src={icon} alt="" className="w-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-[114px] rounded-md shadow-lg bg-white border border-gray3 z-10">
          <div className="py-1 flex flex-col gap-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button 
                key={option.value} 
                onClick={() => handleSelect(option.label)} 
                className={`w-full px-2 py-2 text-xs font-medium text-gray4 whitespace-nowrap flex justify-between items-center hover:bg-gray-50`}
              >
                {option.label}
                {selected === option.label && (
                  <span className="w-[6px] h-[6px] bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
