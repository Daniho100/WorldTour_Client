import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/appContext';
import assets from "../../assets/assets"
import Aside from "./Aside"
import DNavbar from "./DNavbar";
import Dropdown from './Dropdown';


const UserDashboard = () => {
    
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);
  const [policyId, setPolicyId] = useState('');
  const [newPolicyData, setNewPolicyData] = useState({
    payRefId: '',
    destination: '',
    startDate: '',
    endDate: '',
    premium: '',
    passNum: ''
  });
  const [showNewPolicyModal, setShowNewPolicyModal] = useState(false);



//   Display all policy when user login
     useEffect(() => {
    const fetchPolicies = async () => {
        if (user && user.role === 'user') {
          try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            console.log('Token:', token);
            console.log('User:', user);
            
            const response = await axios.get(`http://localhost:8081/user/${user.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setPolicies(response.data.policies || []); // Ensure correct data format
            setLoading(false);
          } catch (err) {
            console.error('Error fetching policies:', err);
            setError('Failed to fetch policies');
          } finally {
            setLoading(false);
          }
        }
      };

  
      fetchPolicies();
    }, [user]);


//   Route to create a new policy for self
  const sameUserPolicy = async () => {
    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.post('http://localhost:8081/user/createpolicy', newPolicyData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPolicies([...policies, response.data]); // Append new policy to the list
       // Resetting the form after successful creation
       setNewPolicyData({
        payRefId: '',
        destination: '',
        startDate: '',
        endDate: '',
        premium: '',
        passNum: ''
      });
    } catch (err) {
        console.error('Error creating policy:', err);
        setError('Failed to create policy');
      }
    };


  // Route to get a specific policy by ID
  const getPolicyById = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8081/user/policy/${policyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Policy Details:\n${JSON.stringify(response.data)}`);
    } catch (err) {
        console.error('Error fetching policy by ID:', err);
        setError('Failed to fetch policy by ID');
      }
    };

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      {/* Navbar */}
      <DNavbar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-row mt-0">
        {/* Sidebar */}
        <Aside role={user.role}/>
        
        {/* Content */}
        <div className="flex-1 overflow-auto w-full p-6 bg-gray-100">
          <div className='flex justify-between mb-8 gap-8 '>
              <h1 className='text-xl sm:text-2xl font-bold text-black'>Dashboard</h1>
              <p className='text-black font-bold text-sm sm:text-lg'>Goodafternoon, <span className='text-primary font-bold text-base sm:text-lg'>John</span></p>
          </div>
          <h2 className="text-xl font-semibold mb-4">User Policies</h2>
  
          {/* Route 1: Display all policies */}
          {policies.length > 0 ? (
            <ul className="space-y-4">
              {policies.map((policy) => (
                <li key={policy._id} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-700"><strong>Policy ID:</strong> {policy._id}</p>
                  <p className="text-gray-700"><strong>Name:</strong> {policy.surname}</p>
                  <p className="text-gray-700"><strong>Destination:</strong> {policy.destination}</p>
                  <p className="text-gray-700"><strong>Start Date:</strong> {policy.startDate}</p>
                  <p className="text-gray-700"><strong>End Date:</strong> {policy.endDate}</p>
  
                  {/* Button to download policy certificate */}
                  <button 
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => downloadPolicyCertificate(policy._id)}>
                    Download Policy Certificate
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No policies found.</p>
          )}
  
          {/* Route 2: Create new policy */}
          <div className="mt-6">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowNewPolicyModal(true)}>
              Create New Policy
            </button>
  
            {/* Modal for new policy form */}
            {showNewPolicyModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h3 className="text-lg font-semibold mb-4">Create New Policy</h3>
                  <input 
                    className="mb-2 w-full p-2 border rounded"
                    type="text" 
                    placeholder="Pay Reference ID"
                    value={newPolicyData.payRefId}
                    onChange={(e) => setNewPolicyData({...newPolicyData, payRefId: e.target.value})}
                  />
                  <input 
                    className="mb-2 w-full p-2 border rounded"
                    type="text" 
                    placeholder="Destination"
                    value={newPolicyData.destination}
                    onChange={(e) => setNewPolicyData({...newPolicyData, destination: e.target.value})}
                  />
                  <input 
                    className="mb-2 w-full p-2 border rounded"
                    type="date" 
                    placeholder="Start Date"
                    value={newPolicyData.startDate}
                    onChange={(e) => setNewPolicyData({...newPolicyData, startDate: e.target.value})}
                  />
                  <input 
                    className="mb-2 w-full p-2 border rounded"
                    type="date" 
                    placeholder="End Date"
                    value={newPolicyData.endDate}
                    onChange={(e) => setNewPolicyData({...newPolicyData, endDate: e.target.value})}
                  />
                  <input 
                    className="mb-2 w-full p-2 border rounded"
                    type="number" 
                    placeholder="Premium"
                    value={newPolicyData.premium}
                    onChange={(e) => setNewPolicyData({...newPolicyData, premium: e.target.value})}
                  />
                  <input 
                    className="mb-4 w-full p-2 border rounded"
                    type="text" 
                    placeholder="Passport Number"
                    value={newPolicyData.passNum}
                    onChange={(e) => setNewPolicyData({...newPolicyData, passNum: e.target.value})}
                  />
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                    onClick={sameUserPolicy}>
                    Create Policy
                  </button>
                  <button 
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                    onClick={() => setShowNewPolicyModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
  
          {/* Route 3: Get policy by ID */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Get Policy by ID</h3>
            <input 
              className="mb-2 w-full p-2 border rounded"
              type="text" 
              placeholder="Enter Policy ID"
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
            />
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={getPolicyById}>
              Fetch Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default UserDashboard
