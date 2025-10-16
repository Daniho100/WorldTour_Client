import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to fetch userId from URL params
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const DeleteUserPage = () => {
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

  const handleDeleteUser = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }

      // Call the backend to delete the user using userId from URL params
      const response = await axios.delete(
        `http://localhost:8081/super/deleteuser/${id}`,  // Use userId from URL params
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user');
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
          <div className="mt-[40px] sm:ml-[40px] sm:mr-[64px] mx-3">
            <div className="flex justify-between mb-8 gap-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Delete User</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Good afternoon, <span className="text-primary font-bold text-base sm:text-lg">John</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this user?</h2>

                {message && (
                  <div
                    className={`p-4 mb-4 ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'} text-sm text-center`}
                  >
                    {message}
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => navigate('/superadmin-dashboard')}
                    className="w-full bg-gray-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="w-full bg-red-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DeleteUserPage;
