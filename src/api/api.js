import axios from 'axios';

const apiBase = 'http://localhost:8081/super';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
  };
};

const api = axios.create({
  baseURL: apiBase,
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - please log in again');
          localStorage.removeItem('token');
          break;
        case 403:
          console.error('Forbidden access - insufficient permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        default:
          console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ============================================== SUPERADMIN DASHBOARD ==============================================
// ================================================================================================================================
// User-related functions
export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/getuser/${userId}`, { headers: getAuthHeaders() });
    console.log('User API Response:', response);
    return response.data;
  } catch (error) {
    console.error('User API Error:', error.response || error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/getusers', { headers: getAuthHeaders() });
    console.log('Users API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Users API Error:', error.response || error);
    throw error;
  }
};

export const updateUserInfo = async (userId, userData) => {
  try {
    const response = await api.put(`/updateuser/${userId}`, userData, { headers: getAuthHeaders() });
    console.log('Update User API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Update User API Error:', error.response || error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/deleteuser/${userId}`, { headers: getAuthHeaders() });
    console.log('Delete User API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Delete User API Error:', error.response || error);
    throw error;
  }
};




// Agent-related functions
export const fetchAllAgents = async () => {
  try {
    const response = await api.get('/getagents', { headers: getAuthHeaders() });
    console.log('Agents API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Agents API Error:', error.response || error);
    throw error;
  }
};

export const updateAgentInfo = async (agentId, agentData) => {
  try {
    const response = await api.put(`/updateagent/${agentId}`, agentData, { headers: getAuthHeaders() });
    console.log('Update Agent API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Update Agent API Error:', error.response || error);
    throw error;
  }
};

export const deleteAgent = async (agentId) => {
  try {
    const response = await api.delete(`/deleteagent/${agentId}`, { headers: getAuthHeaders() });
    console.log('Delete Agent API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Delete Agent API Error:', error.response || error);
    throw error;
  }
};

export const createAgent = async (agentData) => {
  try {
    const response = await api.post('/createagent', agentData, { headers: getAuthHeaders() });
    console.log('Create Agent API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Create Agent API Error:', error.response || error);
    throw error;
  }
};



// Policy-related functions
export const fetchPolicyById = async (policyId) => {
  try {
    const response = await api.get(`/getpolicy/${policyId}`, { headers: getAuthHeaders() });
    console.log('Policy API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Policy API Error:', error.response || error);
    throw error;
  }
};

export const fetchAllPolicies = async () => {
  try {
    const response = await api.get('/policies', { headers: getAuthHeaders() });
    console.log('Policies API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Policies API Error:', error.response || error);
    throw error;
  }
};

export const updatePolicy = async (policyId, policyData) => {
  try {
    const response = await api.put(`/updatepolicy/${policyId}`, policyData, { headers: getAuthHeaders() });
    console.log('Update Policy API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Update Policy API Error:', error.response || error);
    throw error;
  }
};



// Branch-related functions
export const createBranch = async (branchData) => {
  try {
    const response = await api.post('/branch', branchData, { headers: getAuthHeaders() });
    console.log('Create Branch API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Create Branch API Error:', error.response || error);
    throw error;
  }
};

export const getBranchById = async (branchId) => {
  try {
    const response = await api.get(`/branch/${branchId}`, { headers: getAuthHeaders() });
    console.log('Branch API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Branch API Error:', error.response || error);
    throw error;
  }
};

export const getBranchStatistics = async () => {
  try {
    const response = await api.get('/allbranchinfo', { headers: getAuthHeaders() });
    console.log('Branch Statistics API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Branch Statistics API Error:', error.response || error);
    throw error;
  }
};



// Coupon and Voucher functions
export const createAndAssignCoupon = async (userId, couponData) => {
  try {
    const response = await api.post(`/createcoupon/${userId}`, couponData, { headers: getAuthHeaders() });
    console.log('Create Coupon API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Create Coupon API Error:', error.response || error);
    throw error;
  }
};

export const createVoucher = async (agentId, voucherData) => {
  try {
    const response = await api.post(`/voucher/${agentId}`, voucherData, { headers: getAuthHeaders() });
    console.log('Create Voucher API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Create Voucher API Error:', error.response || error);
    throw error;
  }
};

export const topUpVoucher = async (agentId, voucherData) => {
  try {
    const response = await api.post(`/voucher/topup/${agentId}`, voucherData, { headers: getAuthHeaders() });
    console.log('Top Up Voucher API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Top Up Voucher API Error:', error.response || error);
    throw error;
  }
};


// ============================================== AGENT DASHBOARD =========================================================

export const createPolicy = async (policyData) => {
  try {
    const endpoint = policyData?.role === 'creditagent'
      ? '/credit/users'
      : '/agent/users';

    const response = await api.post(endpoint, policyData, {
      headers: getAuthHeaders(),
    });

    return response.data; // Just return the data from the API response
  } catch (error) {
    console.error('Create Policy Error:', error.response || error);
    throw error; // Throw the error to be handled by the caller
  }
};

export const existingUserPolicy = async (policyData, userId) => {
  try {
    const response = await api.post(`/agent/userpolicy/${userId}`, policyData, {
      headers: getAuthHeaders(),
    });

    return response.data; // Just return the data from the API response
  } catch (error) {
    console.error('Existing User Policy Error:', error.response || error);
    throw error; // Throw the error to be handled by the caller
  }
};

export const fetchPolicyDetails = async (policyId) => {
  try {
    const response = await api.get(`/agent/policies/${policyId}`, {
      headers: getAuthHeaders(),
    });

    return response.data; // Return the policy data
  } catch (error) {
    console.error('Fetch Policy Details Error:', error.response || error);
    throw error; // Throw the error to be handled by the caller
  }
};
