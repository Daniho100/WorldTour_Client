// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../../context/appContext';
// import DNavbar from '../../comppnents/Dashboard/DNavbar';
// import Aside from '../../comppnents/Dashboard/Aside';

// const CreateBranchPage = () => {
//   const [branchData, setBranchData] = useState({
//     branchName: '',
//     location: '',
//     email: '',
//     phone: '',
//   });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { user } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleCreateBranch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         throw new Error('Authentication token not found. Please log in again.');
//       }

//       // Prepare the update data
//       let updatedData = { ...branchData };

//       // API request to Create the agent
//       const response = await axios.post(
//         `http://localhost:8081/super/createbranch`,
//         updatedData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMessage('Branch created successfully');
//       navigate('/dashboard/manage-branch'); // Redirect to the dashboard or another page after success
//     } catch (error) {
//       console.log( error);
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
//     setBranchData({ ...branchData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
//       <DNavbar />
//       <div className="flex-1 flex flex-row mt-0">
//         <Aside />
//         <main className="flex-1 mt-0">
//           <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
//             <div className="flex justify-between mb-8 gap-8">
//               <h1 className="text-xl sm:text-2xl font-bold text-black">Create Branch</h1>
//               <p className="text-black font-bold text-sm sm:text-lg">
//                 Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.role || 'Super Admin'}</span>
//               </p>
//             </div>

//             <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
//               <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
//                 <h2 className="text-lg font-bold mb-4">Create New Branch</h2>

//                 {message && (
//                   <div
//                     className={`p-4 mb-4 ${
//                       message.includes('success') ? 'bg-green-100' : 'bg-red-100'
//                     } text-sm text-center`}
//                   >
//                     {message}
//                   </div>
//                 )}

//                 <form onSubmit={handleCreateBranch}>
                 

//                 {[
//                   { label: 'Branch', key: 'branchName' },
//                   { label: 'Location', key: 'location' },
//                   { label: 'Email', key: 'email', type: 'email' },
//                   { label: 'Phone', key: 'phone', type: 'number' },
//                 ].map((field) => (
//                 <div key={field.key}>
//                   <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-2">
//                     {field.label}
//                   </label>
//                   <input
//                     type={field.type || 'text'}
//                     id={field.key}
//                     name={field.key}
//                     value={branchData[field.key]}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-primary"
//                   />
//                 </div>
//                     ))}

                 
//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
//                     disabled={loading}
//                   >
//                     {loading ? 'Creating Branch...' : 'Create Branch'}
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

// export default CreateBranchPage;








import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';

const CreateBranchPage = () => {
  const [branchData, setBranchData] = useState({
    branchName: '',
    location: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!branchData.branchName) errors.branchName = 'Branch name is required';
    if (!branchData.location) errors.location = 'Location is required';
    if (!branchData.email) errors.email = 'Email is required';
    if (!branchData.phone || branchData.phone.length < 10)
      errors.phone = 'Phone number must be at least 10 digits';
    return errors;
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found. Please log in again.');

      const response = await axios.post(
        'http://localhost:8081/super/createbranch',
        branchData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Branch created successfully');
      setBranchData({ branchName: '', location: '', email: '', phone: '' });
      navigate('/dashboard/branch-agencies'); // Redirect after success
    } catch (error) {
      console.error('Error creating branch:', error);
      setMessage(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBranchData({ ...branchData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen flex flex-col box-border">
      <DNavbar />
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 mt-0">
          <div className="mt-[40px] sm:ml-[300px] sm:mr-[64px] mx-3">
            <div className="flex justify-between mb-8 gap-8">
              <h1 className="text-xl sm:text-2xl font-bold text-black">Create Branch</h1>
              <p className="text-black font-bold text-sm sm:text-lg">
                Welcome, <span className="text-primary font-bold text-base sm:text-lg">{user?.role || 'Super Admin'}</span>
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[600px]">
                <h2 className="text-lg font-bold mb-4">Create New Agent</h2>

          
            {message && <div className="mb-4">{message}</div>}

            <form onSubmit={handleCreateBranch}>
              {[
                { label: 'Branch Name', key: 'branchName' },
                { label: 'Location', key: 'location' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'number' },
              ].map((field) => (
                <div key={field.key} className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor={field.key}>
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    name={field.key}
                    id={field.key}
                    value={branchData[field.key]}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded ${
                      errors[field.key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[field.key] && <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
                disabled={loading}
              >
                {loading ? 'Creating Branch...' : 'Create Branch'}
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

export default CreateBranchPage;
