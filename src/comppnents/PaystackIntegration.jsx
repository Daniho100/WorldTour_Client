// src/components/PaystackIntegration.js

import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackIntegration = ({ email, amount, onSuccess, onClose }) => {
  const publicKey = 'your-public-key-here'; // Replace with your Paystack public key
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSuccess = (reference) => {
    setErrorMessage(null); // Clear any previous errors on success
    console.log('Payment successful. Reference:', reference);
    onSuccess(reference); // Trigger parent callback
  };

  const handleError = (error) => {
    console.error('Payment Error:', error);
    setErrorMessage('An error occurred while processing your payment. Please try again or contact support.');
  };

  const handleClose = () => {
    setErrorMessage(null); // Clear error on close
    console.log('Payment closed by the user.');
    onClose(); // Trigger parent callback
  };

  const componentProps = {
    email,
    amount: amount * 100, // Convert to kobo (smallest denomination for Paystack)
    publicKey,
    text: 'Pay Now',
    onSuccess: (reference) => handleSuccess(reference),
    onClose: () => handleClose(),
    onError: (error) => handleError(error), // Use the new error handler
  };



  return (
    <div className="w-full flex flex-col justify-center items-center my-4">
      {errorMessage && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <strong className="font-bold">Error:</strong> <span>{errorMessage}</span>
        </div>
      )}
      <PaystackButton
        {...componentProps}
        className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer transition duration-300 hover:bg-primary-dark"
      />
    </div>
  );
};

export default PaystackIntegration;
