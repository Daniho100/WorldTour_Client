import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import DNavbar from '../../comppnents/Dashboard/DNavbar';
import Aside from '../../comppnents/Dashboard/Aside';
import BranchTable from '../../comppnents/Dashboard/BranchTable';



const initialDashboardState = {
  users: {
    data: [],
    loading: true,
    error: null
  },
  agents: {
    data: [],
    loading: true,
    error: null
  },
  policies: {
    data: [],
    loading: true,
    error: null
  },
  branches: {
    data: null,
    loading: true,
    error: null
  }
   //Add similar initial state for agents, policies, branches if needed
};

const ManageBranch = () => {
  const [dashboardState, setDashboardState] = useState(initialDashboardState);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const updateState = (section, updates) => {
    setDashboardState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };



  useEffect(() => {
    // Redirect to login if token is missing
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {

      const fetchBranch = async () => {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            throw new Error("Token not found in localStorage");
          }
      
          const response = await axios.get('http://localhost:8081/super/branches', {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache',
             }
          });
          updateState('branches', { data: response.data.branchStatistics, loading: false, error: null });
          console.log('Updated branches state:', dashboardState.branches);
          
        } catch (error) {
          console.error('Error fetching branches:', error);
      
          // Handle the specific JWT errors if token is malformed or missing
          if (error.response?.status === 401 || error.message.includes("Token")) {
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            updateState('branches', { data: [], loading: false, error: 'Failed to fetch branches' });
          }
        }
      };
      

      // Call other fetch functions (agents, policies, branches) if needed...
      await Promise.allSettled([/*fetchUsers(),  fetchAgents() , fetchPolicies()*/ fetchBranch() ]);

      Object.keys(initialDashboardState).forEach(key => {
        setDashboardState(prev => ({
          ...prev,
          [key]: { ...prev[key], loading: false },
        }));
      });
    };

    fetchDashboardData();
  }, [navigate, user?.role]);

  const isLoading = Object.values(dashboardState).some(section => section.loading);
  const hasErrors = Object.values(dashboardState).some(section => section.error);

  if (isLoading) return <div>Loading...</div>;
  if (hasErrors) return <div>Some dashboard sections failed to load</div>;

  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      <DNavbar />
      <div className="flex-1 flex flex-row mt-0">
        <Aside onManageAgentsClick={() => setActiveTable("branches")} />
        <main className="flex-1 mt-0">
          <div className='mt-[40px] sm:ml-[40px] sm:mr-[64px] mx-3'>
            <div className='flex justify-between mb-8 gap-8'>
              {/* <h1 className='text-xl sm:text-2xl font-bold text-black'>Dashboard</h1> */}
              <p className='text-black font-bold text-sm sm:text-lg'>
                Welcome, <span className='text-primary font-bold text-base sm:text-lg'>{user?.role}</span>
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
             <BranchTable branches={dashboardState.branches.data} />
             
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageBranch;
