import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const EditAgentPage = () => {
  const [agentData, setAgentData] = useState({
    surname: '',
    firstNames: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    branchName: '', // This will store the branch name or ID
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Prepare the update data
      let updatedData = { ...agentData };

      // API request to Create the agent
      const response = await axios.post(
        `http://localhost:8081/super/createagent`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Agent created successfully');
      navigate('/dashboard/manage-agents'); // Redirect to the dashboard or another page after success
    } catch (error) {
      console.error('Error creating Agent:', error);
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
    setAgentData({ ...agentData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      <DNavbar />
      <div className="flex-1 flex flex-row mt-0">
        <Aside />
        <main className="flex-1 mt-0">
          <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
            <div className="flex justify-between mb-8 gap-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Create Agent</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.role || 'Super Admin'}</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Create New Agent</h2>

                {message && (
                  <div
                    className={`p-4 mb-4 ${
                      message.includes('success') ? 'bg-green-100' : 'bg-red-100'
                    } text-sm text-center`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleCreateAgent}>
                 

                {[
                  { label: 'Surname', key: 'surname' },
                  { label: 'Other Names', key: 'firstNames' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Password', key: 'password' },
                  { label: 'Phone', key: 'phone', type: 'number' },
                  { label: 'Branch', key: 'branchName' },
                ].map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    id={field.key}
                    name={field.key}
                    value={agentData[field.key]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  />
                </div>
              ))}

                 

                  {/* Role */}
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={agentData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Role</option>
                    <option value="agent">Agent</option>
                    <option value="creditAgent">Credit Agent</option>
                    <option value="admin">Admin</option>
                    <option value="superAdmin">Super Admin</option>
                  </select>

                 
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Creating Agent...' : 'Create Agent'}
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

export default EditAgentPage;
