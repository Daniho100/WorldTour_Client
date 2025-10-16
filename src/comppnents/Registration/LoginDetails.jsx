import { useContext, useState, useEffect } from "react";
import { AppContext } from '../../context/appContext';
import { validatePasswordMatch, hashPassword, validateEmail } from '../../utils/validationHelper'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginDetails = ({ handleNextSection, onProgressUpdate }) => {
  const { formData, handleChange } = useContext(AppContext);

  const questions = [
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your Email Address', validate: validateEmail },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your Password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your Password', validate: validatePasswordMatch },
  ];

  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  

  const validateField = (name, value) => {
    const question = questions.find(q => q.name === name);
    if (question.validate) return question.validate(value, formData.loginDetails.password);
    return value ? '' : `Please fill out the ${question.label}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setValidationErrors(prev => ({ ...prev, [name]: error }));
    handleChange('loginDetails', name, value);
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const errors = {};
    questions.forEach(({ name }) => {
      const value = formData.loginDetails[name];
      const error = validateField(name, value);
      if (error) errors[name] = error;
    });
    setValidationErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

 

  const handleNext = async () => {
    if (isFormValid) {
      try {
        // Hash the password before sending it
        const hashedPassword = await hashPassword(formData.loginDetails.password);
        
        // Send login request
        const response = await axios.post('http://localhost:8081/superadmin/login', {
          email: formData.loginDetails.email,
          password: hashedPassword,
        });
        
        // Check if response contains token and store it
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          
          // Clear password fields
          formData.loginDetails.password = '';
          formData.loginDetails.confirmPassword = '';
          
          // Proceed to the next section
          handleNextSection();
        } else {
          throw new Error("Token not found in response");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setValidationErrors(prev => ({
          ...prev,
          form: "Login failed. Please check your credentials and try again.",
        }));
      }
    }
  };
  






  const handlePrev = () => {
    navigate('/registration/coverDestination'); // Navigate to the PersonalData component
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-accent">Login Details</h2>
        <form className="grid grid-cols-3 gap-6">
          {questions.map((field, index) => (
            <div className="relative col-span-1" key={index}>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData.loginDetails[field.name] || ''}
                onChange={handleInputChange}
                className="peer w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none p-2 placeholder-transparent"
                placeholder={field.label}
              />
              <label
                htmlFor={field.name}
                className={`absolute left-2 transition-all duration-300 ease-in-out ${
                  formData.loginDetails[field.name]
                    ? '-top-2.5 text-sm text-primary'
                    : 'top-2.5 text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary'
                }`}
              >
                {field.label}
              </label>
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

export default LoginDetails;
