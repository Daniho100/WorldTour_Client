import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const EditUserPage = () => {
  const [userData, setUserData] = useState({

    surname: '',
    firstNames: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    premium: '',
    coupon: '',
    birthPlace: '',
    nin: '',
    maritalStat: '',
    occupat: '',
    stateOfRes: '',
    lgaOfRes: '',
    nationality: '',
    origState: '',
    origLga: '',
    passNum: '',
    issuedOn: '',
    expires: '',
    destination: '',
    startDate: '',
    endDate: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        // Fetch user data from the API
        const response = await axios.get(`http://localhost:8081/super/getuser/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({

          surname: response.data.surname || '',
          firstNames: response.data.firstNames || '',
          gender: response.data.gender || '',
          dob: response.data.dob || '',
          email: response.data.email || '',
          password: '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          birthPlace: response.data.birthPlace || '',
          nin: response.data.nin || '',
          maritalStat: response.data.maritalStat || '',
          occupat: response.data.occupat || '',
          stateOfRes: response.data.stateOfRes || '',
          lgaOfRes: response.data.lgaOfRes || '',
          nationality: response.data.nationality || '',
          origState: response.data.origState || '',
          origLga: response.data.origLga || '',
          passNum: response.data.passNum || '',
          issuedOn: response.data.issuedOn || '',
          expires: response.data.expires || '',
          coupon: response.data.coupon || '',
          destination: response.data.destination || '',
          startDate: response.data.startDate || '',
          endDate: response.data.endDate || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 404) {
          setMessage('User not found.');
        } else {
          setMessage('Failed to fetch user data. Please try again.');
        }
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // API request to update the user
      const response = await axios.put(
        `http://localhost:8081/super/updateuser/${id}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('User updated successfully');
      navigate('/dashboard'); // Redirect to the dashboard or another page after success
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      <DNavbar />
      <div className="flex-1 flex flex-row mt-0">
        <Aside />
        <main className="flex-1 mt-0">
          <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
            <div className="flex justify-between mb-8 gap-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Update User</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.name || 'Super Admin'}</span>
              </p>
            </div>


            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Edit User Details</h2>

                {message && (
                  <div
                    className={`p-4 mb-4 ${
                      message.includes('success') ? 'bg-green-100' : 'bg-red-100'
                    } text-sm text-center`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleUpdateUser}>
                  
                  
                  {/* Additional Fields */}
                  {[
                    { label: 'Surname', key: 'surname' },
                    { label: 'FirstName', key: 'firstNames' },
                    { label: 'Date Of Birth', key: 'dob', type: 'date' },
                    { label: 'Email', key: 'email', type: 'email' },
                    { label: 'Phone', key: 'phone', type: 'number' },
                    { label: 'Address', key: 'address' },
                    { label: 'Birth Place', key: 'birthPlace' },
                    { label: 'NIN', key: 'nin' },
                    { label: 'Marital Status', key: 'maritalStat' },
                    { label: 'Occupation', key: 'occupat' },
                    { label: 'State of Residence', key: 'stateOfRes' },
                    { label: 'LGA of Residence', key: 'lgaOfRes' },
                    { label: 'Nationality', key: 'nationality' },
                    { label: 'State of Origin', key: 'origState' },
                    { label: 'LGA of Origin', key: 'origLga' },
                    { label: 'Passport Number', key: 'passNum' },
                    { label: 'Issued On', key: 'issuedOn', type: 'date' },
                    { label: 'Expires On', key: 'expires', type: 'date' },
                    { label: 'Coupon', key: 'coupon' },
                    { label: 'Destination', key: 'destination' },
                    { label: 'Start Date', key: 'startDate', type: 'date' },
                    { label: 'End Date', key: 'endDate', type: 'date' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type || 'text'}
                        id={field.key}
                        name={field.key}
                        value={userData[field.key]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}

                  {/* Password */}
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password (Leave blank to keep current password)
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  />

                
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>


                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Updating User...' : 'Update User'}
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

export default EditUserPage;
