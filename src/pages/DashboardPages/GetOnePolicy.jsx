import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const GetOnePolicy = () => {
  const [policyData, setPolicyData] = useState(null); // Expecting an object, not an array
  const [message, setMessage] = useState('');
  const { id } = useParams(); // Get the policy ID from the URL

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        const response = await axios.get(`http://localhost:8081/super/getonepolicy/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPolicyData(response.data);
      } catch (error) {
        console.error('Error fetching policy data:', error);
        if (error.response?.status === 404) {
          setMessage('policy not found.');
        } else if (error.response?.status === 401) {
          setMessage('Unauthorized access. Please log in.');
        } else {
          setMessage('Failed to fetch policy data. Please try again.');
        }
      }
    };

    fetchPolicyData();
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

                {policyData ? (
                    <div className="mt-[10px] sm:ml-[100px] sm:mr-[64px] mx-3">
                        <div className=" mb-8 gap-8">
                            <h1 className="text-xl sm:text-2xl font-bold text-black">Policy Info</h1>
                        </div>

                        <div className="flex justify-between">
                            {/* <img
                                src={policyData.profilePicture || 'https://via.placeholder.com/80'}
                                alt="Profile"
                                className="w-[400px] h-[400px] mr-[60px] ml-[-30px] rounded-md border-2 border-green-600"
                            /> */}

                            <div className="bg-green-300 w-[1000px] bg-opacity-40 shadow-lg rounded-lg p-6 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-4 p-4 rounded-md">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div>
                                            <h2 className="font-bold text-center text-3xl text-green-800">{policyData.surname} {policyData.otherNames}</h2>
                                            {/* <p className="text-xl text-green-500">{policyData.role || 'Client'}</p> */}
                                        </div>
                                    </div>
                                </div>

                        
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Email</h3>
                                    <p className="text-sm text-gray-700 mb-4">{policyData.email}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">PassPort No</h3>
                                    <p className="text-sm text-gray-700">{policyData.passportNo || 'N/A'}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Destination</h3>
                                    <p className="text-sm text-gray-700 mb-4">{policyData.destination}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Cost</h3>
                                    <p className="text-sm text-gray-700">{policyData.premium}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Paid Amount</h3>
                                    <p className="text-sm text-gray-700 mb-4">{policyData.paid}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Payment Reference</h3>
                                    <p className="text-sm text-gray-700">{policyData.paymentRef}</p>
                                </div>


                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Commission</h3>
                                    <p className="text-sm text-gray-700 mb-4">{policyData.commission}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Cert No</h3>
                                    <p className="text-sm text-gray-700">{policyData.certNo}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Verification Code</h3>
                                    <p className="text-sm text-gray-700 mb-4">{policyData.vcode}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Reference No</h3>
                                    <p className="text-sm text-gray-700">{policyData.refNo}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Start Date</h3>
                                    <p className="text-sm text-gray-700 mb-4">{new Date(policyData.startDate).toLocaleDateString('en-NG')}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">EndDate</h3>
                                    <p className="text-sm text-gray-700">{new Date(policyData.endDate).toLocaleDateString('en-NG')}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Issue Date</h3>
                                    <p className="text-sm text-gray-700 mb-4">{new Date(policyData.issueDate).toLocaleDateString('en-NG')}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Agent</h3>
                                    <p className="text-sm text-gray-700">{policyData.agent}</p>
                                </div>

                                <div className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-sm font-bold text-green-600">Status</h3>
                                    <p className="text-sm text-gray-700 mb-4">{policyData.status}</p>
                                
                                    <h3 className="text-sm font-bold text-green-600">Discount</h3>
                                    <p className="text-sm text-gray-700">{policyData.discount || 0}</p>
                                </div>
                                </div>

                        
                                <div className="mt-6 px-20 flex justify-between">
                                <Link to={`/superadmin-editpolicy/${policyData._id}`}>
                                    <img src="/edit-icon.svg" alt="Edit" className="w-5 ml-7" />
                                    <h4 className='text-center text-green-500'>Edit policy</h4>
                                </Link>

                                <Link to={`/superadmin-deletepolicy/${policyData._id}`}>
                                    <img src="/delete-icon.png" alt="Edit" className="w-5 ml-10" />
                                    <h4 className='text-center text-red-800'>Delete policy</h4>
                                </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                !message && <p>Loading policy data...</p>
              )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default GetOnePolicy;
