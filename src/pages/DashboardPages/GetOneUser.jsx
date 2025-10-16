import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const GetOneUser = () => {
  const [userData, setUserData] = useState(null); // Expecting an object, not an array
  const [message, setMessage] = useState('');
  const { id } = useParams(); // Get the user ID from the URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        const response = await axios.get(`http://localhost:8081/super/getuser/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 404) {
          setMessage('User not found.');
        } else if (error.response?.status === 401) {
          setMessage('Unauthorized access. Please log in.');
        } else {
          setMessage('Failed to fetch user data. Please try again.');
        }
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <div className="h-screen w-screen overflow-auto flex flex-col box-border">
        <DNavbar />
        <div className="flex-1 flex flex-row">
          <Aside />
          <main className="flex-1">

                {message && (
                    <div className={`p-4 mb-4 ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'
                    } text-sm text-center`}>
                        {message}
                    </div>
                )}

                {userData ? (
                    <div className="mt-[10px] sm:ml-[100px] sm:mr-[64px] mx-3">
                        <div className=" mb-8 gap-8">
                            <h1 className="text-xl sm:text-2xl font-bold text-black">User Info</h1>
                        </div>

                        <div className="flex justify-between">
                            <img
                                src={userData.profilePicture || 'https://via.placeholder.com/80'}
                                alt="Profile"
                                className="w-[400px] h-[400px] mr-[60px] ml-[-30px] rounded-md border-2 border-green-600"
                            />

                            <div className="bg-green-300 w-[800px] bg-opacity-40 shadow-lg rounded-lg p-6 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-4 p-4 rounded-md">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div>
                                            <h2 className="font-bold text-center text-3xl text-green-800">{userData.surname} {userData.firstNames}</h2>
                                            <p className="text-xl text-green-500">{userData.role || 'User'}</p>
                                        </div>
                                    </div>
                                </div>
                        
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Email</h3>
                                    <p className="text-sm text-gray-700 mb-4">{userData.email}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Phone</h3>
                                    <p className="text-sm text-gray-700">{userData.phone || 'N/A'}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Date Of Birth</h3>
                                    <p className="text-sm text-gray-700 mb-4">{userData.dob}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Address</h3>
                                    <p className="text-sm text-gray-700">{userData.address}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Occupation</h3>
                                    <p className="text-sm text-gray-700 mb-4">{userData.occupat}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Place Of Birth</h3>
                                    <p className="text-sm text-gray-700">{userData.birthPlace}</p>
                                </div>


                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Marital Status</h3>
                                    <p className="text-sm text-gray-700 mb-4">{userData.maritalStat}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">State Of Residence</h3>
                                    <p className="text-sm text-gray-700">{userData.stateOfRes}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">LGA Of Residence</h3>
                                    <p className="text-sm text-gray-700 mb-4">{userData.lgaOfRes}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Nationality</h3>
                                    <p className="text-sm text-gray-700">{userData.nationality}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">State Of Origin</h3>
                                    <p className="text-sm text-gray-700 mb-4">{userData.origState}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Policies Issued</h3>
                                    <p className="text-sm text-gray-700">{userData.policiesIssued || 0}</p>
                                </div>
                                </div>

                        
                                <div className="mt-6 px-20 flex justify-between">
                                <Link to={`/superadmin-edituser/${userData._id}`}>
                                    <img src="/edit-icon.svg" alt="Edit" className="w-5 ml-7" />
                                    <h4 className='text-center text-green-500'>Edit user</h4>
                                </Link>

                                <Link to={`/superadmin-coupon/${userData._id}`}>
                                    <img src="/voucher-icon.svg" alt="Edit" className="w-5 ml-10" />
                                    <h4 className='text-center text-green-700'>Issue Coupon</h4>
                                </Link>

                                <Link to={`/superadmin-deleteuser/${userData._id}`}>
                                    <img src="/delete-icon.png" alt="Edit" className="w-5 ml-10" />
                                    <h4 className='text-center text-red-800'>Delete user</h4>
                                </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                !message && <p>Loading user data...</p>
              )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default GetOneUser;
