import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const VoucherTopUp = () => {
  const [amount, setAmount] = useState(''); // Store the top-up amount
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { id } = useParams(); // Retrieve the voucherId from URL params

  // Handle the top-up request
  const handleTopUpVoucher = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Make the API call to top up the voucher
      const response = await axios.post(
        `http://localhost:8081/super/voucher/topup/${id}`, 
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Voucher topped up successfully');
    } catch (error) {
      console.error('Error topping up voucher:', error);

      // Display specific backend error messages if available
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      <DNavbar />
      <div className="flex-1 flex flex-row mt-0">
        <Aside />
        <main className="flex-1 mt-0">
          <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
            <div className="flex justify-between mb-8 gap-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Top-Up Voucher</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Hello, <span className="text-primary font-bold text-base sm:text-lg">{user?.name || 'Super Admin'}</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Add Funds to Voucher</h2>

                {message && (
                  <div
                    className={`p-4 mb-4 ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'} text-sm text-center`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleTopUpVoucher}>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Top-Up Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    required
                    placeholder="Enter top-up amount"
                  />

                  <button
                    type="submit"
                    className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Topping Up Voucher...' : 'Top-Up Voucher'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoucherTopUp;
