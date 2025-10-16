import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgressBar = ({ currentStep = 0 }) => { 
  const navigate = useNavigate();

  const steps = [
    { name: 'Personal Data', id: 'personalData' },
    { name: 'Next of Kin', id: 'nextOfKin' },
    { name: 'Cover & Destination', id: 'coverDestination' },
    { name: 'Login Details', id: 'loginDetails' },
    { name: 'Others', id: 'others' }
  ];

  // Ensure currentStep is within bounds
  const validStep = Math.max(0, Math.min(currentStep, steps.length - 1));

  // Navigate to the respective section when clicking on the step name
  const handleSectionClick = (sectionId) => {
    navigate(`/registration/${sectionId}`);
  };

  return (
    <div className='relative'>
      {/* For small screens */}
      <div className='flex justify-center sm:hidden mb-4'>
        <p className='text-sm font-bold text-primary'>{steps[validStep].name}</p>
      </div>

      {/* Progress Bar */}
      <div className='flex flex-row sm:flex-col'>
        {steps.map((step, index) => (
          <div key={index} className={`flex flex-col-reverse sm:flex-row gap-2 sm:gap-5 sm:items-start justify-start`}>
            <div className='flex flex-row sm:flex-col gap-1 justify-center items-center'>
              {/* Circle for progress */}
              <p
                className={`w-3 h-3 ${validStep >= index ? 'bg-primary' : 'border-2 border-gray4'} rounded-full`}
              ></p>

              {/* Line indicating progress */}
              {index < steps.length - 1 && (
                <p className={`h-1 w-6 sm:w-1 sm:h-6 ${validStep > index ? 'bg-primary' : 'bg-gray4'} rounded`}></p>
              )}
            </div>

            {/* Step name for large screens, with onClick to navigate */}
            <p
              onClick={() => handleSectionClick(step.id)}
              className={`cursor-pointer hidden sm:block text-sm ${
                validStep >= index ? 'font-bold text-primary' : 'font-normal text-gray4'
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
