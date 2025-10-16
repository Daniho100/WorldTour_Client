import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CustomSelect from '../CustomSelect';
import {
  validatePassportNo,
  validateIssueDate,
  validateExpiryDate,
  validateNIN,
  validateStartDate,
  validateEndDate
} from '../../utils/validationHelper';

const CoverDestination = ({ handleNextSection, onProgressUpdate }) => {
  const { formData, handleChange, countryZones } = useContext(AppContext);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate


  const questions = [
    { name: 'passportNo', label: 'Passport No', type: 'text', placeholder: 'Enter your Passport No', validate: validatePassportNo },
    { name: 'issuance_date', label: 'Issuance Date', type: 'date', placeholder: 'Select issuance date', validate: validateIssueDate },
    { name: 'expiry_date', label: 'Expiry Date', type: 'date', placeholder: 'Select expiry date', validate: (value) => validateExpiryDate(formData.coverDestination.issuance_date, value) },
    {
      name: 'destination',
      label: 'Destination',
      type: 'select',
      options: [
        { header: "SCHENGEN", countries: countryZones.zone1.schengen },
        { header: "AFRICA", countries: countryZones.zone1.africa },
        { header: "MIDDLE EAST", countries: countryZones.zone1.middleEast },
        { header: "EUROPE", countries: countryZones.zone1.europe },
        { header: "ALL OTHERS", countries: countryZones.zone2.allOthers },
        { header: "WORLDWIDE", countries: ["Worldwide"] }
      ],
      groupedOptions: true
    },
    { name: 'startDate', label: 'Arrival Date', type: 'date', placeholder: 'Arrival', validate: validateStartDate },
    { name: 'endDate', label: 'Departure Date', type: 'date', placeholder: 'Departure', validate: validateEndDate },
    { name: 'nin', label: 'NIN', type: 'text', placeholder: 'Enter your NIN', validate: validateNIN },

  ];

  const validateField = (name, value) => {
    const question = questions.find(q => q.name === name);
    return question.validate ? question.validate(value) : value ? '' : `Please fill out the ${question.label}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setValidationErrors(prev => ({ ...prev, [name]: error }));
    handleChange('coverDestination', name, value);
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const errors = {};
    questions.forEach(({ name }) => {
      const value = formData.coverDestination[name];
      const error = validateField(name, value);
      if (error) errors[name] = error;
    });
    setValidationErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleNext = () => {
    if (isFormValid) {
      handleNextSection();
    }
  };

  const handlePrev = () => {
    navigate('/registration/nextOfKin'); // Navigate to the PersonalData component
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-accent">Cover & Destination</h2>
        <form className="grid grid-cols-3 gap-6">
          {questions.map((field, index) => (
            <div className="relative col-span-1" key={index}>
              {field.type === 'select' ? (
                <>
                  <CustomSelect
                    name={field.name}
                    options={field.options}
                    value={formData.coverDestination[field.name] || ''}
                    onChange={handleInputChange}
                    groupedOptions={field.groupedOptions}
                    className="w-full border-b-2 border-gray-300 focus:border-primary p-2 focus:outline-none peer"
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-2 -top-2.5 text-sm text-primary"
                  >
                    {field.label}
                  </label>
                </>
              ) : field.type === 'date' ? (
                <>
                <input
                    type="date"
                    id={field.name}
                    name={field.name}
                    value={formData.coverDestination[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none p-2 peer"
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-2 -top-2.5 text-sm text-primary"
                  >
                    {field.label}
                  </label>

                </>
              ) : (
                <>
                  <input type={field.type} id={field.name} name={field.name} value={formData.coverDestination[field.name] || ''}
                    onChange={handleInputChange}
                    className="peer w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none p-2 placeholder-transparent"
                    placeholder={field.label}
                  />
                  <label
                    htmlFor={field.name}
                    className={`absolute left-2 transition-all duration-300 ease-in-out ${
                      formData.coverDestination[field.name] || touchedFields[field.name]
                        ? '-top-2.5 text-sm text-primary'
                        : 'top-2.5 text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary'
                    }`}
                  >
                    {field.label}
                  </label>
                </>
              )}
              {validationErrors[field.name] && touchedFields[field.name] && (
                <p className="text-red-500 text-xs italic mt-1">{validationErrors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="col-span-3 flex justify-between">
            <button onClick={handlePrev} className="mt-4 py-2 px-4 rounded bg-primary text-white">Previous</button>
            <button type="button" onClick={handleNext}
              className={`mt-4 w-20 py-2 rounded ${isFormValid ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
              disabled={!isFormValid}> Next </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoverDestination;
