import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const EditPolicyPage = () => {
  const [policyData, setPolicyData] = useState({
    vcode: '',
    certNo: '',
    refNo: '',
    surname: '',
    otherNames: '',
    email: '',
    paymentRef: '',
    sessionId: '',
    passportNo: '',  // Can also be extracted from User
    destination: '',
    startDate: '',
    endDate: '',
    premium: '',
    commission: '',
    paid: '',
    issueDate: '',
    agent: '',  // Reference to the agent issuing the policy
    policyHolder: '', // Reference to the policyholder
    status: '',
    discount: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        // Fetch policy data from the API
        const response = await axios.get(`http://localhost:8081/super/getpolicy/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        
         setPolicyData({
             vcode: response.data.vcode || '',
             certNo: response.data.certNo || '',
             refNo: response.data.refNo || '',
             surname: response.data.surname || '',
             otherNames: response.data.otherNames || '',
             email: response.data.email || '',
             paymentRef: response.data.paymentRef || '',
             sessionId: response.data.sessionId || '',
             passportNo: response.data.passportNo || '',  // Can also be extracted from User
             destination: response.data.destination || '',
             startDate: response.data.startDate || '',
             endDate: response.data.endDate || '',
             premium: response.data.premium || '',
             commission: response.data.commission || '',
             paid: response.data.paid || '',
             issueDate: response.data.issueDate || '',
             agent: response.data.agent || '',   // Reference to the agent issuing the policy
             policyHolder: response.data.policyHolder || '',  //Reference to the policyholder
             status: response.data.status || '',
             discount: response.data.discount || '',



         });
      } catch (error) {
        console.error('Error fetching Policy data:', error);
        if (error.response?.status === 404) {
          setMessage('Policy not found.');
        } else {
          setMessage('Failed to fetch Policy data. Please try again.');
        }
      }
    };

    fetchPolicyData();
  }, [id]);

  const handleUpdatePolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Prepare the update data
      let updatedData = { ...policyData };

      // API request to update the agent
      const response = await axios.put(
        `http://localhost:8081/super/updatepolicy/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Policy updated successfully');
      navigate('/dashboard/policies'); // Redirect to policy page after success
    } catch (error) {
      console.error('Error updating Policy:', error);
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
    setPolicyData({ ...policyData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      <DNavbar />
      <div className="flex-1 flex flex-row mt-0">
        <Aside />
        <main className="flex-1 mt-0">
          <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
            <div className="flex justify-between mb-8 gap-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Update Policy</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.role || 'Super Admin'}</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Edit This Policy</h2>

                {message && (
                  <div
                    className={`p-4 mb-4 ${
                      message.includes('success') ? 'bg-green-100' : 'bg-red-100'
                    } text-sm text-center`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleUpdatePolicy}>
                  
                {[
                  { label: 'Vcode', key: 'vcode' },
                  { label: 'Cert Number', key: 'certNo' },
                  { label: 'Reference No', key: 'refNo' },
                  { label: 'Surname', key: 'surname' },
                  { label: 'Other Names', key: 'otherNames' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Payment Reference', key: 'paymentRef' },
                  { label: 'Session', key: 'sessionId' },
                  { label: 'Passport No', key: 'passportNo' },
                  { label: 'Destination', key: 'destination' },
                  { label: 'Start Date', key: 'startDate', type: 'date' },
                  { label: 'End Date', key: 'endDate', type: 'date' },
                  { label: 'Premium paid', key: 'premium' },
                  { label: 'Commission', key: 'commission' },
                  { label: 'Paid', key: 'paid', type: 'date' },
                  { label: 'Issue Date', key: 'issueDate', type: 'date' },
                  { label: 'agent', key: 'agent' },
                  { label: 'PolicyHolder', key: 'policyHolder'},
                  { label: 'Status', key: 'status' },
                  { label: 'Discount', key: 'discount' },
                ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    id={field.key}
                    name={field.key}
                    value={policyData[field.key]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
               

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Updating Agent...' : 'Update Agent'}
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

export default EditPolicyPage;
