import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import Header from '../comppnents/Header';
import Footer from '../comppnents/Footer';
import { useSummaryData } from '../utils/summaryHelpers';
import { useNavigate } from 'react-router-dom';


const PayentUnsuccess = () => {
  const { formData, countryZones } = useContext(AppContext);
  const navigate = useNavigate();

  // Use the useSummaryData hook to get all the summary data
  const summaryData = useSummaryData(formData, countryZones);

  // useEffect(() => {
  //   console.log('Summary Data:', summaryData);
  // }, [summaryData]);

  return (
    <>
      <Header />


      <div className="min-h-screen flex flex-col justify-center items-center bg-gray2">
        <div className='flex flex-col items-center gap-2 mt-8'>
          <h1 className='text-xl sm:text-3xl font-bold'>IGI Travel Insurance</h1>
          <p className='text-sm sm:text-base'>Proposal {'('}Registration{')'} Form</p>
        </div>

        {/* Transaction Reference */}
        <div className="w-auto flex flex-col py-10 items-center justify-center sm:w-[400px] h-[45px] bg-red2 text-red1 p-2 rounded-[8px] mt-4 text-center text-xs sm:text-sm">
          <p className="p-[2px] font-medium">
            <span className="text-xs sm:text-sm font-bold">Transaction Status: </span>
            UNSUCCESSFUL
          </p>
          <p className="p-[2px]">
            <span className="text-sm sm:text-base font-bold">Reason: </span>
            Unable to complete payment
          </p>
        </div>

        {/* Payment Success Message */}
        {/* <div className="w-auto flex items-center justify-center sm:w-[400px] h-[45px] text-primary p-2 mt-2 text-center text-xs sm:text-sm">
        </div> */}

        <div className="my-8 max-w-[646px] w-auto sm:w-full mx-4 bg-white rounded-[16px] border border-gray-300">
          <h6 className="text-base sm:text-2xl font-bold text-center my-4 mt-[25px] mb-[15px]">
            Payment Summary
          </h6>

          <div className="space-y-4 gap-4 p-4 sm:p-8">
            {/* Name Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Name</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1">
                {summaryData.name || 'N/A'}
              </span>
              <hr className="border-gray-300" />
            </div>

            {/* Age Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Age</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1">
                {summaryData.age || 'N/A'} years
              </span>
              <hr className="border-gray-300" />
            </div>

            {/* Destination Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Destination</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1">
                {summaryData.destination || 'N/A'}
              </span>
              <hr className="border-gray-300" />
            </div>

            {/* Nationality Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Nationality</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1">
                {summaryData.nationality || 'N/A'}
              </span>
              <hr className="border-gray-300" />
            </div>

            {/* Period Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Period</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1 whitespace-nowrap overflow-hidden">
                {summaryData.period || 'N/A'}
              </span>
              <hr className="border-gray-300" />
            </div>

            {/* Duration Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Duration</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1">
                {summaryData.duration || 'N/A'}
              </span>
              <hr className="border-gray-300" />
            </div>

            {/* Premium Section */}
            <div className="flex flex-col justify-between">
              <span className="text-xs sm:text-sm text-gray3 font-bold">Premium</span>
              <span className="text-sm sm:text-base text-black font-medium mb-1">
                {summaryData.premium || 'N/A'}
              </span>
              <hr className="border-gray-300" />
            </div>
          </div>

          <div className="mt-6 mb-10 flex justify-center gap-2">
            <button className="bg-white border border-black text-black px-4 py-2 rounded-lg">Retry</button>
            <button onClick={() => navigate('/registration')} className="bg-primary text-white px-4 py-2 rounded-lg">Start New Application</button>
          </div>
        </div>
      </div>

      <Footer className="mb-8" />
    </>
  );
};

export default PayentUnsuccess;
