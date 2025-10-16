import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from './DNavbar';
import Aside from './Aside';
import PoliciesTable from './PoliciesTable';
import PolicyForm from './PolicyForm';
import { createPolicy, existingUserPolicy } from '../../api/api';
import { payWithPaystack } from '../../api/paystackPayment';



const initialDashboardState = {
  policies: {
    data: [],
    loading: true,
    error: null
  },
  users: {
    data: [],
    loading: true,
    error: null
  },
  selectedPolicy: {
    data: null,
    loading: false,
    error: null
  }
};

const AgentDashboard = () => {
  const [dashboardState, setDashboardState] = useState(initialDashboardState);
  const [activeView, setActiveView] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formType, setFormType] = useState('policy'); // 'user' or 'policy'
  const [searchQuery, setSearchQuery] = useState(''); // for tracking search input
  const [loading, setLoading] = useState(false); // Add loading state
  const [ reference, setReference ] = useState(null);
  const [policyData, setPolicyData] = useState({
  surname: '',
  firstNames: '',
  gender: '',
  dob: '',
  birthPlace: '',
  nin: '',
  maritalStat: '',
  occupat: '',
  email: '',
  password: '',
  address: '',
  stateOfRes: '',
  lgaOfRes: '',
  nationality: '',
  origState: '',
  origLga: '',
  phone: '',
  passNum: '',
  issuedOn: '',
  expires: '',
  payRefId: '',
  destination: '',
  startDate: '',
  endDate: '',
  premium: '',
  creditBalance: 0,
  couponCode: '',
  voucherCode: '',
  });

  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const updateState = (section, updates) => {
    setDashboardState(prev => ({
      ...prev, [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };


// =================================== USE EFFECTS =====================================================================
  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);



  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      
      const fetchPolicies = async () => {
          try {
            const token = localStorage.getItem('authToken');  // Consistent token name
            if (!token) {
              throw new Error("Token not found in localStorage");
            }

            const response = await axios.get('http://localhost:8081/agent/policies', {
              headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Fetched policies:", response.data);

            updateState('policies', { data: response.data.policies, loading: false, error: null });
          } catch (error) {
            console.error('Error fetching policies:', error);
           
            // Handle the specific JWT errors if token is malformed or missing
            if (error.response?.status === 401 || error.message.includes("Token")) {
              localStorage.removeItem('authToken');
              navigate('/login');
            } else {
              updateState('policies', { data: [], loading: false, error: 'Failed to fetch users' });
            }
          }
        };
  
        await fetchPolicies(); // Ensure it waits for the function to complete before updating state
  
        // Object.keys(initialDashboardState).forEach(key => {
        //   setDashboardState(prev => ({
        //     ...prev,
        //     [key]: { ...prev[key], loading: false },
        //   }));
        // });
      } 

  
    fetchDashboardData();
  }, [navigate, user?.role]);

// =====================================================================================================================


  // const isLoading = Object.values(dashboardState).some(section => section.loading);
  // const hasErrors = Object.values(dashboardState).some(section => section.error);

  // if (isLoading) {
  //   console.log('Loading state:', dashboardState);
  //   return <div>Loading...</div>;
  // }  

  // if (hasErrors) return <div>Some dashboard sections failed to load</div>;
  
  // if (dashboardState.policies.data.length === 0) {
  //   return <div>No policies available.</div>;
  // }


// ================================ AGENT/CREDIT-AGENT ACTIONS =========================================================

  // Create new user and policy
  // const handleCreatePolicy = async (policyData) => {
  //   try {
  //     const newUserPolicy = await createPolicy(policyData);
  
  //     // After successfully creating the policy, handle UI updates
  //     updateState('policies', {
  //       data: [...dashboardState.policies.data, newUserPolicy],
  //       error: null,
  //     });
  //     setShowCreateForm(false); // Close the form after success
  //     // Optionally, show a success notification
  //   } catch (error) {
  //     updateState('users', { error: 'Failed to create user' });
  //     console.error('Error creating policy:', error);
  //   }
  // };


  // Create policy for existing user
  const handleCreatePolicyForExistingUser = async (policyData, userId) => {
    try {
      const newPolicy = await existingUserPolicy(policyData, userId);
  
      // Update the state to include the new policy data
      updateState('policies', {
        data: [...dashboardState.policies.data, newPolicy],
        error: null,
      });
      setShowCreateForm(false);
    } catch (error) {
      updateState('policies', { error: 'Failed to create policy' });
      console.error('Error creating policy for existing user:', error);
    }
  };
  

  // Fetch specific policy details
  const getPolicyDetails = async (policyId) => {
    try {
      const policyDetails = await fetchPolicyDetails(policyId);
  
      // Update state with fetched policy details
      updateState('selectedPolicy', {
        data: policyDetails,
        loading: false,
        error: null,
      });
    } catch (error) {
      updateState('selectedPolicy', {
        data: null,
        loading: false,
        error: 'Failed to fetch policy details',
      });
      console.error('Error fetching policy details:', error);
    }
  };
  

  
// ========================================= HANDLE PAYMENT AND SUBMISSIONS ===============================================
// Paystack Payment
const initiatePaystack = () => {
  payWithPaystack(
    policyData.email,      // Use email from policyData
    policyData.premium,    // Use premium amount from policyData
    null,                  // Paystack generates the reference automatically
    (generatedReference) => {
      // If payment is successful
      setReference(generatedReference); // Save the payment reference
      sessionStorage.setItem('paymentReference', generatedReference); // Store reference in sessionStorage for future use

      // Update policyData with the generated payment reference (payRefId)
      setPolicyData(prevData => ({
        ...prevData,
        payRefId: generatedReference, // Update the payRefId in policyData
      }));

      // Call form submission after successful payment
      handleSubmit();
    },
    () => {
      // If payment fails or is canceled
      console.log('Payment unsuccessful or window closed');
      setLoading(false); // Stop loading state
      alert('Payment failed. Please try again.');
      navigate('/paymentunsuccess'); // Navigate to payment failure page
    }
  );
};

// Handle form submission (post-payment)
const handleSubmit = async () => {
  try {
    // Check if payRefId exists in policyData (to ensure payment was made)
    if (!policyData.payRefId) {
      throw new Error('Payment not completed or reference not found');
    }

    // Set loading state for the submission process
    setLoading(true);

    const policyDataToSend = {
      surname: policyData.surname,
      firstNames: policyData.firstNames,
      gender: policyData.gender,
      dob: policyData.dob,
      birthPlace: policyData.birthPlace,
      maritalStat: policyData.maritalStat,
      occupat: policyData.occupat, 
      email: policyData.email,
      password: policyData.password,
      address: policyData.address,
      stateOfRes: policyData.stateOfRes,
      lgaOfRes: policyData.lgaOfRes,
      nationality: policyData.nationality,
      origState: policyData.origState,
      origLga: policyData.origLga,
      phone: policyData.phone,
      passNum: policyData.passNum,
      issuedOn: policyData.issuedOn,
      expires: policyData.expires,
      payRefId: policyData.payRefId,
      destination: policyData.destination,
      startDate: policyData.startDate,
      endDate: policyData.endDate,
      premium: policyData.premium,
      creditBalance: policyData.creditBalance,
      couponCode: policyData.couponCode,
      voucherCode: policyData.voucherCode,
    };
  
    try {
      const newPolicy = await createPolicy(policyDataToSend);
      
      updateState('policies', {
        data: [...dashboardState.policies.data, newPolicy],
        error: null,
      });

      setShowCreateForm(false); // Close the form after success
    } catch (error) {
      console.error('Error creating policy:', error);
    }

    alert('Policy created successfully'); // Temporary alert until actual submission logic is added
    setLoading(false); // Stop loading state after submission
  } catch (error) {
    setLoading(false); // Stop loading state if error occurs
    console.error('Form submission error:', error);
    alert(`Error: ${error.message}`);
  }
};

// Function to start the payment process
const handlePolicySubmission = () => {
  console.log("Policy Data before submission:", policyData); // Log policyData
  setLoading(true); // Start loading state before payment
  initiatePaystack(); // Trigger the Paystack payment flow
};
  // =====================================================================================================




// ================================ SEARCH BOX =========================================================
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // capture user input
  };

  const handleSearch = () => {
    // Trigger filtering on search action
    const filteredData = dashboardState.policies.data.filter((policy) => 
      policy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    updateState('policies', { data: filteredData, loading: false, error: null });
  };
// =========================================================================================


  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      <DNavbar />

      <div className="flex-1 flex flex-row mt-0">
        <Aside onViewPoliciesClick={() => setActiveView('policies')} 
              onCreatePolicyClick={() => { setFormType('user'); setShowCreateForm(true); }}
              onexistingUserPolicyClick={() => { setFormType('policy'); setShowCreateForm(true); }}
        />

        <main className="flex-1 mt-0">
          <div className='mt-[40px] sm:ml-[40px] sm:mr-[64px] mx-3'>
            <div className='flex justify-between mb-8 gap-8'>
              <h1 className='text-xl sm:text-2xl font-bold text-black'>
                {user?.role === 'creditagent' ? 'Credit Agent Dashboard' : 'Agent Dashboard'}
              </h1>
              <p className='text-black font-bold text-sm sm:text-lg'>
                Welcome, <span className='text-primary font-bold text-base sm:text-lg'>{user?.role}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex gap-4">
              <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => {
                  setFormType('user');
                  setShowCreateForm(true);
                }}> Create New Policy</button>

              <button className="bg-secondary text-white px-4 py-2 rounded" onClick={() => {
                  setFormType('policy');
                  setShowCreateForm(true);
                }}> Create New Policy </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <input 
                type="text" 
                placeholder="Search policies..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="border px-4 py-2 rounded-md"
              />
              <button onClick={handleSearch} className="bg-primary text-white px-4 py-2 rounded-md" > 
                Search </button>
            </div>

            {/* Main Content Area */}
            <main className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
              {dashboardState.policies.loading ? (
                <div>Loading policies...</div>
              ) : dashboardState.policies.error ? (
                <div>Error fetching policies: {dashboardState.policies.error}</div>
              ) : showCreateForm ? (
                <PolicyForm 
                  type="user"
                  onSubmit={handlePolicySubmission}
                  onClose={() => setShowCreateForm(false)}
                  userRole={user?.role}
                  policyData={policyData}
                  setPolicyData={setPolicyData}
                />
              ) : (
                <PoliciesTable policies={dashboardState.policies.data} />
              )}
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
