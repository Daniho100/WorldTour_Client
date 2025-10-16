import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useSummaryData, generateReference, premiumAmount } from '../utils/summaryHelpers';
import Footer from '../comppnents/Footer';
import Header from '../comppnents/Header';
import { payWithPaystack } from '../api/paystackPayment';
import axios from 'axios';

const AppSummary = () => {
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  const { formData, countryZones } = useContext(AppContext);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState(sessionStorage.getItem('paymentReference') || generateReference()); // Use stored reference or generate one

  const navigate = useNavigate();
  const summaryData = useSummaryData(formData, countryZones);
  const calculatedAmount = 20891; // Example premium amount
  const email = formData.loginDetails.email; // User's email

  // Function to submit form data after successful payment
  const handleSubmit = async () => {
    const formDataToSend = {
        surname: formData.personalData.surname,
        firstNames: formData.personalData.other_names,
        gender: formData.personalData.gender,
        dob: formData.personalData.dob,
        birthPlace: formData.personalData.place_of_birth,
        maritalStat: formData.personalData.marital_status,
        occupat: formData.personalData.occupat, 
        email: formData.loginDetails.email,
        password: formData.loginDetails.password,
        address: formData.personalData.residence_addr1,
        stateOfRes: formData.personalData.state_residence,
        lgaOfRes: formData.personalData.residence_lga,
        nationality: formData.personalData.nationality,
        origState: formData.personalData.stateOfOrigin,
        origLga: formData.personalData.lgaOfOrigin,
        phone: formData.personalData.telephone_number,
        fullName: formData.nextOfKin.fullName,
        relationship: formData.nextOfKin.relationship,
        kinAddress: formData.nextOfKin.address,
        passNum: formData.coverDestination.passportNo,
        issuedOn: formData.coverDestination.issuance_date,
        expires: formData.coverDestination.expiry_date,
        nin: formData.coverDestination.nin,
        destination: formData.coverDestination.destination,
        startDate: formData.coverDestination.startDate,
        endDate: formData.coverDestination.endDate,
        q1: formData.others.q1, 
        q2: formData.others.q2, 
        image: formData.others.image, 
        role: formData.role || 'user',
        payRefId: reference, // Payment reference
        premium: calculatedAmount, 
        paid: true, 
        coupon: 0,
        creditBalance: 0,
    };

    setIsLoading(true);
    setErrorMessage('');
  
    try {
      // Send data to backend endpoint
      const response = await axios.post('http://localhost:8081/register', formDataToSend, 
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 39109f7df56e1051c39YNM9e6YK85066bb852`,
        }}
      );

      console.log('User registered and policy created:', response.data);
      
      // Redirect to payment success page after successful registration and policy creation
      alert('Registration and policy creation successful!');
      navigate('/paymentsuccess');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      navigate('/paymentunsuccess');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to initiate Paystack payment
  const initiatePaystack = () => {
    payWithPaystack(
      email,
      calculatedAmount, 
      reference, // Payment reference
      (paymentReference) => {
        // If payment is successful
        setReference(paymentReference); // Save the payment reference
        sessionStorage.setItem('paymentReference', paymentReference);
        handleSubmit(); // Call form submission after successful payment
      },
      () => {
        // If payment fails or is canceled
        console.log('Payment unsuccessful or window closed');
        navigate('/paymentunsuccess');
      }
    );
  };

  return (
    <div className='bg-gray2'>
      <Header />
      <div className="my-8 max-w-[646px] w-auto mx-4 sm:mx-auto bg-white rounded-[16px] border border-gray-300" role="form">
        <h6 className="text-base sm:text-2xl font-bold text-center my-4 mt-[25px] mb-[15px]">Application Summary</h6>

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-2 rounded-lg mt-4 text-center text-xs sm:text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4 gap-4 p-4 sm:p-8">
          {Object.entries(summaryData).map(([key, value]) => (
            <div key={key} className="flex flex-col justify-between mb-4" aria-labelledby={key}>
              <span className="text-xs sm:text-sm text-gray3 font-bold" id={key}>{formatLabel(key)}</span>
              <span className="text-sm sm:text-base text-black font-medium" aria-describedby={`${key}-value`}>{value}</span>
              <hr className="border-gray-300" />
            </div>
          ))}

          <div className="bg-green-100 text-green-800 p-2 rounded-lg mt-4 text-center text-xs sm:text-sm w-full">
            <p className="p-[2px] font-medium">
              Please take note of your{' '}
              <span className="text-xs sm:text-sm font-bold">Transaction Reference</span>: {reference}. It is your payment reference and could be used to verify the status of your payment.
            </p>
          </div>

          <div className="mt-6 flex items-center space-x-2 text-xs sm:text-sm">
            <input 
              type="checkbox" 
              id="terms" 
              className="form-checkbox" 
              checked={termsAccepted} 
              onChange={() => setTermsAccepted(!termsAccepted)} 
              aria-required="true" 
            />
            <label htmlFor="terms" className="font-medium"> I agree to IGI{' '}
              <a href="/terms-and-conditions" className="text-primary underline font-bold"> Terms and Conditions</a>
            </label>
          </div>
        </div>

        <div className="mt-6 mb-10 flex justify-center gap-2">
          <button onClick={() => navigate('/')} className="bg-white border border-black text-black px-4 py-2 rounded-lg">Cancel</button>
          <button 
            onClick={initiatePaystack} 
            className={`bg-primary text-white px-4 py-2 rounded-lg ${!termsAccepted || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={!termsAccepted || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </div>
            ) : 'Pay Now'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppSummary;
