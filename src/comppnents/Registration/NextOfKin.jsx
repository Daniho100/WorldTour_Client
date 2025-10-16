import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AppContext } from '../../context/appContext';
import CustomSelect from '../CustomSelect';

const NextOfKin = ({ handleNextSection }) => {
  const { formData, handleChange } = useContext(AppContext);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const questions = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your Full Name' },
    { name: 'relationship', label: 'Relationship', type: 'select', options: [
      'Spouse', 'Parent', 'Child', 'Sibling', 'Guardian', 'Grandparent', 'Aunt', 'Uncle', 
      'Cousin', 'Niece', 'Nephew', 'Partner', 'Friend'
    ]},
    { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your Address' },
  ];

  const validateField = (name, value) => {
    return value ? '' : `Please fill out the ${questions.find(q => q.name === name).label}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setValidationErrors(prev => ({ ...prev, [name]: error }));
    handleChange('nextOfKin', name, value);
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const errors = {};
    questions.forEach(({ name }) => {
      const value = formData.nextOfKin[name];
      const error = validateField(name, value);
      if (error) errors[name] = error;
    });
    setValidationErrors(errors);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const isFormValid = Object.keys(validationErrors).every(key => !validationErrors[key]);

  const handlePrev = () => {
    navigate('/registration/personalData'); // Navigate to the PersonalData component
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-accent">Next of Kin</h2>
        <form className="grid grid-cols-3 gap-6">
          {questions.map((field, index) => (
            <div className="relative col-span-1" key={index}>
              {(field.type === 'select') ? (
                <>
                  <CustomSelect
                    name={field.name}
                    options={field.options}
                    value={formData.nextOfKin[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-primary p-2 focus:outline-none peer"
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
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData.nextOfKin[field.name] || ''}
                    onChange={handleInputChange}
                    className="peer w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none p-2 placeholder-transparent"
                    placeholder={field.label}
                  />
                  <label
                    htmlFor={field.name}
                    className={`absolute left-2 transition-all duration-300 ease-in-out ${
                      formData.nextOfKin[field.name]
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
            <button
              onClick={handlePrev}
              className="mt-4 py-2 px-4 rounded bg-primary text-white"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextSection}
              className={`mt-4 w-20 py-2 rounded ${isFormValid ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NextOfKin;
