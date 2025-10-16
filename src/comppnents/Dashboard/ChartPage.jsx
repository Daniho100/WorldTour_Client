import { useState, useEffect } from "react";
import Aside from "../../comppnents/Dashboard/Aside";
import DNavbar from "../../comppnents/Dashboard/DNavbar";
import assets from '../../assets/assets';
import Dropdown from "../../comppnents/Dashboard/Dropdown";
import Calendar from "../../comppnents/Dashboard/Calender";
import LineChart from "../../comppnents/Dashboard/LineChart";
// import { fetchData } from "../../api/dataService"; 


const allData = [
  { year: 2022, month: 'Jan', value: 173 },
  { year: 2022, month: 'Feb', value: 89 },
  { year: 2022, month: 'Mar', value: 217 },
  { year: 2022, month: 'Apr', value: 142 },
  { year: 2022, month: 'May', value: 68 },
  { year: 2022, month: 'Jun', value: 201 },
  { year: 2022, month: 'Jul', value: 155 },
  { year: 2022, month: 'Aug', value: 233 },
  { year: 2022, month: 'Sep', value: 104 },
  { year: 2022, month: 'Oct', value: 187 },
  { year: 2022, month: 'Nov', value: 92 },
  { year: 2022, month: 'Dec', value: 226 },
  { year: 2023, month: 'Jan', value: 131 },
  { year: 2023, month: 'Feb', value: 79 },
  { year: 2023, month: 'Mar', value: 245 },
  { year: 2023, month: 'Apr', value: 168 },
  { year: 2023, month: 'May', value: 203 },
  { year: 2023, month: 'Jun', value: 112 },
  { year: 2023, month: 'Jul', value: 197 },
  { year: 2023, month: 'Aug', value: 84 },
  { year: 2023, month: 'Sep', value: 239 },
  { year: 2023, month: 'Oct', value: 156 },
  { year: 2023, month: 'Nov', value: 71 },
  { year: 2023, month: 'Dec', value: 208 },
  { year: 2024, month: 'Jan', value: 124 },
  { year: 2024, month: 'Feb', value: 191 },
  { year: 2024, month: 'Mar', value: 63 },
  { year: 2024, month: 'Apr', value: 229 },
  { year: 2024, month: 'May', value: 147 },
  { year: 2024, month: 'Jun', value: 95 },
  { year: 2024, month: 'Jul', value: 212 },
  { year: 2024, month: 'Aug', value: 178 }
];


const ChartPage = ({ title }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  // const [allData, setAllData] = useState([]); // State for fetched data

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetchData();
  //       setAllData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch data:', error);
  //     }
  //   };

  //   getData();
  // }, []);

  const handleDateRangeUpdate = (selectedRange) => {
    const { startMonth, startYear, endMonth, endYear } = selectedRange;

    const filteredData = allData.filter(item => {
      const isWithinYear = item.year > startYear || (item.year === startYear && item.month >= startMonth);
      const isBeforeEnd = item.year < endYear || (item.year === endYear && item.month <= endMonth);
      return isWithinYear && isBeforeEnd;
    });

    const labels = filteredData.map(item => item.month);
    const dataValues = filteredData.map(item => item.value);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Issued',
          data: dataValues,
          borderColor: '#206247',
          backgroundColor: '#206247',
          borderWidth: 1,
          tension: 0.4,
          fill: false,
          pointBackgroundColor: '#065F46',
          pointRadius: 5,
        }
      ]
    });
  };

  const handleExport = () => {
    // Placeholder for export functionality
    alert('Export functionality not yet implemented!');
  };

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      {/* Navbar */}
      <DNavbar />

      {/* Main content */}
      <div className="flex-1 flex flex-row mt-0">
        {/* Sidebar */}
        <Aside />

        {/* Content */}
        <div className="flex-1 overflow-hidden w-full">
          <div className='mt-[40px] sm:ml-[40px] sm:mr-[64px] mx-3'>
            <h1 className='text-xl sm:text-2xl font-bold text-black mb-5'>{title}</h1>

            <div className="flex flex-col gap-4">

              {/* --- Chart Head --- */}
              <div className="flex flex-row flex-nowrap justify-between py-3 px-3 sm:px-10 border border-gray3 rounded-lg">
                <div className="flex flex-row gap-4 items-center">
                  <div className="relative">
                    <Dropdown text1="Issued" text2="Drafts" text3="Cancelled" buttonClass="h-[46px] px-3" />
                    <img className="absolute right-0" src={assets.arrowdown2} alt="" />
                  </div>

                  {/* Responsive Calendar */}
                  <div className="w-full sm:w-auto">
                    <Calendar onDateRangeUpdate={handleDateRangeUpdate} />
                  </div>
                </div>

                {/* Export button and dropdown */}
                <div className="gap-1 items-center hidden sm:flex">
                  <button className="bg-primary text-white rounded-md px-7 py-3 text-base flex items-center gap-2 h-[46px]" onClick={handleExport}>
                    <img src={assets.anchor} alt="" className=""/> <span>Export</span>
                  </button>
                  {/* Arrowdown dropdown */}
                  <div className="relative">
                    <button className="bg-ash py-5 px-3 rounded-lg h-[46px] flex items-center">
                      <img className="w-4" src={assets.arrowdown2} alt="" />
                    </button>
                    <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray3 rounded-lg shadow-lg z-10 hidden group-hover:block">
                      <button className="flex justify-between items-center px-4 py-2 w-full hover:bg-gray-100">
                        PDF
                        <img src={assets.dotIcon} alt="dot icon" className="w-2" />
                      </button>
                      <button className="flex justify-between items-center px-4 py-2 w-full hover:bg-gray-100">
                        CSV
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Line Chart --- */}
              <div className="h-[688px] p-3 sm:p-5 border border-gray3 rounded-lg">
                <LineChart chartData={chartData} />
              </div>

              {/* Bottom Export Button (visible on small screens) */}
              <div className="flex items-center justify-center sm:hidden mt-10 mb-36">
                <button className="bg-primary text-white rounded-md px-7 py-3 text-base flex items-center gap-2 h-[46px]" onClick={handleExport}>
                  <img src={assets.anchor} alt="" className=""/> <span>Export</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
