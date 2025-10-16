import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import CustomSelect from '../CustomSelect';
import { validatePhoneNumber, validateDateOfBirth } from '../../utils/validationHelper';

const PersonalData = ({ onProgressUpdate, handleNextSection }) => {
  const { countryList, stateList, handleChange, formData } = useContext(AppContext);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  const questions = [
    { name: 'surname', label: 'Surname', type: 'text', placeholder: 'Enter your surname' },
    { name: 'other_names', label: 'Other Names', type: 'text', placeholder: 'Enter your other names' },
    { name: 'gender', label: 'Gender', type: 'select', options: ['', 'Male', 'Female', 'Prefer not to say'] },
    { 
      name: 'dob', 
      label: 'Date of Birth', 
      type: 'date', 
      placeholder: 'Enter your date of birth',
      validate: validateDateOfBirth
    },
    { 
      name: 'telephone_number', 
      label: 'Telephone Number', 
      type: 'text', 
      placeholder: 'Enter your telephone number',
      validate: validatePhoneNumber
    },    
    { name: 'marital_status', label: 'Marital Status', type: 'select', options: ['', 'Single', 'Married', 'Divorced', 'Widowed', 'Separated'] },
    { name: 'residence_addr1', label: 'Residence Address', type: 'text', placeholder: 'Enter your residence address' },
    { name: 'state_residence', label: 'State of Residence', type: 'select', options: ['', ...stateList] },
    { name: 'residence_lga', label: 'L.G.A of Residence', type: 'text', placeholder: 'Enter your L.G.A of residence' },
    { name: 'nationality', label: 'Nationality', type: 'select', options: ['', ...countryList] },
    { name: 'stateOfOrigin', label: 'State of Origin', type: 'select', options: ['', ...stateList] },
    { name: 'lgaOfOrigin', label: 'L.G.A of Origin', type: 'text', placeholder: 'Enter your L.G.A of origin' },

  ];

  const validateField = (name, value) => {
    const question = questions.find(q => q.name === name);
    if (question.validate) {
      return question.validate(value);
    }
    return value ? '' : `Please fill out the ${question.label}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setValidationErrors(prev => ({ ...prev, [name]: error }));
    handleChange('personalData', name, value);
    setTouchedFields(prev => ({ ...prev, [name]: true })); // Mark field as touched
  };

  const validateForm = () => {
    const errors = {};
    questions.forEach(({ name }) => {
      const value = formData.personalData[name];
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-accent">Personal Data</h2>
        <form className="grid grid-cols-3 gap-6">
          {questions.map((field, index) => (
            <div className="relative col-span-1" key={index}>
              {(field.type === 'select' || field.type === 'date') ? (
                <>
                  {field.type === 'select' ? (
                    <CustomSelect
                      name={field.name}
                      options={field.options}
                      value={formData.personalData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 focus:border-primary p-2 focus:outline-none peer"
                    />
                  ) : (
                    <input
                      type="date"
                      id={field.name}
                      name={field.name}
                      value={formData.personalData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none p-2 peer"
                    />
                  )}
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
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData.personalData[field.name] || ''}
                    onChange={handleInputChange}
                    className="peer w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none p-2 placeholder-transparent"
                    placeholder={field.label}
                  />
                  <label
                    htmlFor={field.name}
                    className={`absolute left-2 transition-all duration-300 ease-in-out ${
                      formData.personalData[field.name]
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
          <div className="col-span-3 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className={`mt-4 w-20 py-2 rounded ${
                isFormValid ? 'bg-primary text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'
              }`}
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

export default PersonalData;
