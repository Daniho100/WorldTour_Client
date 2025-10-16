import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to fetch userId from URL params
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const Coupon = () => {
  const [couponData, setCouponData] = useState({
    couponCode: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();  // This will fetch userId from the URL params

  // Redirect to login if token is missing
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }

      // Call the backend to create and assign the coupon to the user using userId from URL params
      const response = await axios.post(
        `http://localhost:8081/super/createcoupon/${id}`,  // Use userId from URL params
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Coupon created and assigned successfully');
      setCouponData({ couponCode: '' }); // Reset couponCode after success
    } catch (error) {
      console.error('Error assigning coupon:', error);
      setMessage('Failed to create or assign coupon');
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
              <h1 className="text-xl sm:text-2xl font-bold text-black">Create and Assign Coupon</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Good afternoon, <span className="text-primary font-bold text-base sm:text-lg">John</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]"
              >
                <h2 className="text-lg font-bold mb-4">Assign Coupon to User</h2>

                {message && (
                  <div
                    className={`p-4 mb-4 ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'} text-sm text-center`}
                  >
                    {message}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="couponCode" className="block font-semibold text-gray-700">
                    Coupon Code (Auto-generated)
                  </label>
                  <input
                    type="text"
                    id="couponCode"
                    name="couponCode"
                    value={couponData.couponCode}
                    readOnly
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                  disabled={loading}
                >
                  {loading ? 'Assigning Coupon...' : 'Assign Coupon'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Coupon;
