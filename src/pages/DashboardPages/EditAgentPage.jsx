// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../../context/appContext';
// import DNavbar from '../../comppnents/Dashboard/DNavbar';
// import Aside from '../../comppnents/Dashboard/Aside';

// const EditAgentPage = () => {
//   const [agentData, setAgentData] = useState({
//     surname: '',
//     firstNames: '',
//     email: '',
//     password: '',
//     phone: '',
//     agentCode: '',
//     totalCommission: '',
//     role: '',
//     branch: '',
//   });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { user } = useContext(AppContext);
//   const { id } = useParams(); // Get the user ID from the URL
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAgentData = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           throw new Error('Authentication token not found. Please log in again.');
//         }

//         // Fetch user data from the API
//         const response = await axios.get(`http://localhost:8081/super/getagent/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setAgentData({

//           surname: response.data.surname || '',
//           firstNames: response.data.firstNames || '',
//           email: response.data.email || '',
//           password: '',
//           phone: response.data.phone || '',
//           agentCode: response.data.agentCode || '',
//           role: response.data.role ||  '',
//           totalCommission: response.data.totalCommission || '',
//           branch: response.data.branch?.branchName || '',
          
//         });
//       } catch (error) {
//         console.error('Error fetching Agent data:', error);
//         if (error.response?.status === 404) {
//           setMessage('Agent not found.');
//         } else {
//           setMessage('Failed to fetch Agent data. Please try again.');
//         }
//       }
//     };

//     fetchAgentData();
//   }, [id]);

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         throw new Error('Authentication token not found. Please log in again.');
//       }

//       // API request to update the user
//       const response = await axios.put(
//         `http://localhost:8081/super/updateagent/${id}`,
//         agentData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMessage('Agent updated successfully');
//       navigate('/dashboard'); // Redirect to the dashboard or another page after success
//     } catch (error) {
//       console.error('Error updating Agent:', error);
//       if (error.response?.data?.message) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setAgentData({ ...agentData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
//       <DNavbar />
//       <div className="flex-1 flex flex-row mt-0">
//         <Aside />
//         <main className="flex-1 mt-0">
//           <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
//             <div className="flex justify-between mb-8 gap-8">
//               <h1 className="text-xl sm:text-2xl font-bold text-black">UpdateAgent</h1>
//               <p className="text-black font-bold text-sm sm:text-lg">
//                 Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.role || 'Super Admin'}</span>
//               </p>
//             </div>

//             <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
//               <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
//                 <h2 className="text-lg font-bold mb-4">Edit This Agent Details</h2>

//                 {message && (
//                   <div
//                     className={`p-4 mb-4 ${
//                       message.includes('success') ? 'bg-green-100' : 'bg-red-100'
//                     } text-sm text-center`}
//                   >
//                     {message}
//                   </div>
//                 )}

//                 <form onSubmit={handleUpdateUser}>
//                   {/* Surname */}
//                   <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="surname"
//                     name="surname"
//                     value={agentData.surname}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                     required
//                   />

//                   {/* First Names */}
//                   <label htmlFor="firstNames" className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstNames"
//                     name="firstNames"
//                     value={agentData.firstNames}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                     required
//                   />

//                   {/* Email */}
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={agentData.email}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                     required
//                   />

//                   {/* Password */}
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                     Password (Leave blank to keep current password)
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={agentData.password}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                   />

//                   {/* Phone */}
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="text"
//                     id="phone"
//                     name="phone"
//                     value={agentData.phone}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                     required
//                   />

//                   {/* Address */}
//                   <label htmlFor="agentCode" className="block text-sm font-medium text-gray-700 mb-2">
//                     Agent Code
//                   </label>
//                   <input
//                     type="text"
//                     id="agentCode"
//                     name="agentCode"
//                     value={agentData.agentCode}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                     required
//                   />


//                    {/* Gender */}
//                   <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//                     Role
//                   </label>
//                   <select
//                     id="role"
//                     name="role"
//                     value={agentData.role}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option value="agent">Agent</option>
//                     <option value="creditAgent">Credit Agent</option>
//                     <option value="admin">Admin</option>
//                     <option value="superAdmin">Super Admin</option>
//                   </select>


//                   {/* Total Commission */}
//                   <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-2">
//                     Total Commission
//                   </label>
//                   <input
//                     type="number"
//                     id="total"
//                     name="total"
//                     value={agentData.totalCommission}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                   />

//                   {/* Branch */}
//                   <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
//                     Branch
//                   </label>
//                   <input
//                     type="text"
//                     id="branch"
//                     name="branch"
//                     value={agentData.branch}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                   />


//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
//                     disabled={loading}
//                   >
//                     {loading ? 'Updating Agent...' : 'Update Agent'}
//                   </button>
//                 </form>
//               </div>
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditAgentPage;















import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
    agentCode: '',
    totalCommission: '',
    role: '',
    branch: '', // This will store the branch name or ID
  });
  const [existingAgentData, setExistingAgentData] = useState(null); // Store the original agent data
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        // Fetch agent data from the API
        const response = await axios.get(`http://localhost:8081/super/getagent/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Store the existing agent data
        setExistingAgentData(response.data);

        // Set the form data using the response, but display branchName (not branch ID)
        setAgentData({
          surname: response.data.surname || '',
          firstNames: response.data.firstNames || '',
          email: response.data.email || '',
          password: '', // Password remains empty for security reasons
          phone: response.data.phone || '',
          agentCode: response.data.agentCode || '',
          role: response.data.role || '',
          totalCommission: response.data.totalCommission || '',
          branch: response.data.branch?.branchName || '', // Display branchName in the form
        });
      } catch (error) {
        console.error('Error fetching Agent data:', error);
        if (error.response?.status === 404) {
          setMessage('Agent not found.');
        } else {
          setMessage('Failed to fetch Agent data. Please try again.');
        }
      }
    };

    fetchAgentData();
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

      // Prepare the update data
      let updatedData = { ...agentData };

      // If the branch is not changed, keep the original branch ID (from existingAgentData)
      if (agentData.branch === existingAgentData?.branch?.branchName) {
        updatedData.branch = existingAgentData.branch._id; // Send the original branch ID
      }

      // Remove fields that haven't changed (to avoid sending them in the request)
      for (const key in updatedData) {
        if (updatedData[key] === '' || updatedData[key] === existingAgentData[key]) {
          delete updatedData[key];
        }
      }

      // API request to update the agent
      const response = await axios.put(
        `http://localhost:8081/super/updateagent/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Agent updated successfully');
      navigate('/dashboard/manage-agents'); // Redirect to the dashboard or another page after success
    } catch (error) {
      console.error('Error updating Agent:', error);
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
              <h1 className="text-xl sm:text-2xl font-bold text-black">Update Agent</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.role || 'Super Admin'}</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Edit This Agent Details</h2>

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
                  {/* Surname */}
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={agentData.surname}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    
                  />

                  {/* First Names */}
                  <label htmlFor="firstNames" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstNames"
                    name="firstNames"
                    value={agentData.firstNames}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    
                  />

                  {/* Email */}
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={agentData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    
                  />

                  {/* Password */}
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password (Leave blank to keep current password)
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={agentData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  />

                  {/* Phone */}
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={agentData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    
                  />

                  {/* Agent Code */}
                  <label htmlFor="agentCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Code
                  </label>
                  <input
                    type="text"
                    id="agentCode"
                    name="agentCode"
                    value={agentData.agentCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  
                  />

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

                  {/* Total Commission */}
                  <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Commission
                  </label>
                  <input
                    type="number"
                    id="total"
                    name="total"
                    value={agentData.totalCommission}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                  />

                  {/* Branch */}
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    value={agentData.branch}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
                    
                  />

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

export default EditAgentPage;
