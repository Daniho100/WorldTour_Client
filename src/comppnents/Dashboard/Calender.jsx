import { useEffect, useState, useRef } from 'react';
import assets from '../../assets/assets';

const Calendar = ({ onDateRangeUpdate }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('From Date - To Date'); // Changed default text

  const calendarRef = useRef(null);

  const toggleMonthSelection = (month) => {
    const isSelected = selectedMonths.find((m) => m.month === month && m.year === selectedYear);
    if (isSelected) {
      setSelectedMonths(selectedMonths.filter((m) => m.month !== month || m.year !== selectedYear));
    } else if (selectedMonths.length < 2) {
      setSelectedMonths([...selectedMonths, { month, year: selectedYear }]);
    }
  };

  const handleCancel = () => {
    setSelectedMonths([]);
    setDisplayedText('From Date - To Date'); // Reset to default text
    setDropdownVisible(false);
  };

  const handleUpdate = () => {
    if (selectedMonths.length > 0) {
      const startMonth = selectedMonths[0].month;
      const startYear = selectedMonths[0].year;
      const endMonth = selectedMonths.length > 1 ? selectedMonths[1].month : startMonth;
      const endYear = selectedMonths.length > 1 ? selectedMonths[1].year : startYear;

      onDateRangeUpdate({ startMonth, startYear, endMonth, endYear });
      setDisplayedText(`${startMonth}, ${startYear} - ${endMonth}, ${endYear}`); // Update displayed text
    }
    setDropdownVisible(false);
  };

  const handleYearChange = (change) => {
    const newYear = selectedYear + change;
    if (newYear <= 2024 && newYear >= 2020) {
      setSelectedYear(newYear);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarRef]);

  return (
    <div className="inline-block relative w-full" ref={calendarRef}>
      <div className="flex items-center justify-between w-full sm:w-[240px] h-[46px] border border-gray3 active:border-primary rounded-md px-3 py-2 cursor-pointer" onClick={() => setDropdownVisible(!dropdownVisible)}>
        <button className="bg-white text-sm sm:text-base text-accent"> {displayedText} </button>
        <img className="w-4" src={assets.arrowdown} alt="dropdown icon" />
      </div>

      {dropdownVisible && (
        <div className="absolute mt-2 w-full sm:w-[240px] h-[297px] border border-gray3 rounded-md shadow-lg bg-white p-6 z-10">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => handleYearChange(-1)}>←</button>
            <span>{selectedYear}</span>
            <button onClick={() => handleYearChange(1)} disabled={selectedYear === 2024}>→</button>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
            {months.map((month) => (
              <button
                key={month}
                className={`text-xs text-accent text-center flex justify-center px-5 py-2 rounded-lg ${
                  selectedMonths.some((m) => m.month === month && m.year === selectedYear)
                    ? 'bg-primary2'
                    : 'bg-white border rounded-lg'
                }`}
                onClick={() => toggleMonthSelection(month)}
                disabled={selectedMonths.length >= 2 && !selectedMonths.some((m) => m.month === month && m.year === selectedYear)}
              >
                {month}
              </button>
            ))}
          </div>

          <div className="flex justify-between gap-3">
            <button className="border border-accent rounded-md px-4 py-2 text-base" onClick={handleCancel}>Cancel</button>
            <button className="bg-primary text-white rounded-md px-4 py-2 text-base" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
