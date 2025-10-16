import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import Header from '../comppnents/Header';
import Footer from '../comppnents/Footer';
import PaystackIntegration from '../comppnents/PaystackIntegration';

const PaymentPage = () => {
  const { formData, summaryData } = useContext(AppContext);
  const navigate = useNavigate();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = (reference) => {
    console.log('Payment successful. Reference:', reference);
    setPaymentSuccess(true);
    navigate('/paymentsuccess');
  };

  const handlePaymentClose = () => {
    console.log('Payment closed');
    navigate('/paymentunsuccess');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray2">
        <div className="mt-4 p-6 sm:p-12 bg-white rounded-lg shadow-lg w-full max-w-[646px] sm:h-auto flex flex-col justify-center items-center">
          {/* Payment Method Section */}
          <div className="flex flex-col items-center justify-center w-full max-w-[534px]">
            <h2 className="text-2xl font-bold mb-4 text-accent">Payment Method</h2>
            <p className="bg-primary h-1 rounded w-[182px]"></p>
          </div>

          {/* Payment State Indicator */}
          {paymentSuccess ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-500 mb-4"></div>
              <h3 className="text-green-500 font-bold">Payment Successful!</h3>
            </div>
          ) : (
            <div className="w-full sm:max-w-[534px]">
              {/* Payment Summary */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium text-gray3">Name:</span>
                  <span>{formData.personalData?.firstName} {formData.personalData?.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium text-gray3">Amount:</span>
                  <span>₦{summaryData.premium || 0}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span className="font-medium text-gray3">Email:</span>
                  <span>{formData.personalData?.email || 'example@mail.com'}</span>
                </div>
              </div>

              {/* Paystack Integration Component */}
              <PaystackIntegration
                email={formData.personalData?.email || 'example@mail.com'}
                amount={summaryData.premium || 0}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
