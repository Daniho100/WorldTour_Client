import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegistrationPage from './pages/RegistrationPage';
import DashBoard from './pages/DashBoard';
import BranchesAgencies from './pages/DashboardPages/BranchesAgencies';
import ManageRoles from './pages/DashboardPages/ManageRoles';
import ManageUsers from './pages/DashboardPages/ManageUsers';
import ManageAgents from './pages/DashboardPages/ManageAgents';
import Policies from './pages/DashboardPages/Policies';
import Reports from './pages/DashboardPages/Reports';
// import LineChart from './comppnents/Dashboard/LineChart';
import AppSummary from './pages/AppSummary';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentUnsuccess from './pages/PaymentUnsuccess';
import UserDashboard from './comppnents/Dashboard/UserDashboard';
import SuperAdminDashboard from './comppnents/Dashboard/SuperAdminDashboard';
import AgentDashboard from './comppnents/Dashboard/AgentDashboard';
import Coupon from './pages/DashboardPages/Coupon';
import Voucher from './pages/DashboardPages/Voucher';
import VoucherTopup from './pages/DashboardPages/VoucherTopup';
import DeleteUserPage from './pages/DashboardPages/DeleteUserPage'
import EditUserPage from './pages/DashboardPages/EditUserPage'
import EditAgentPage from './pages/DashboardPages/EditAgentPage'
import CreateAgentPage from './pages/DashboardPages/CreateAgentPage'
import DeleteAgentPage from './pages/DashboardPages/DeleteAgentPage'
import EditPolicyPage from './pages/DashboardPages/EditPolicyPage'
import DeletePolicyPage from './pages/DashboardPages/DeletePolicyPage'
import CreateBranch from './pages/DashboardPages/CreateBranch'
import GetOneUser from './pages/DashboardPages/GetOneUser';
import GetOnePolicy from './pages/DashboardPages/GetOnePolicy';


import CompliantForm from './comppnents/CompliantForm'
import InsuranceTable from './comppnents/Dashboard/ReportTable';
import UserTable from './comppnents/Dashboard/UserTable';
import RolesPage from './comppnents/Dashboard/RolesPage';
import AddUser from './comppnents/Dashboard/AddUser';
import AddRoles from './comppnents/Dashboard/AddRoles'



const App = () => {

  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration/:sectionId' element={<RegistrationPage />} />
        {/* <Route path='/registration' element={<Navigate to='/registration/personalData' />} />  */}
        <Route path='/registration' element={<RegistrationPage />} /> 
        <Route path='/registration/appsummary' element={<AppSummary />} />

        {/* Dashboard default route redirects to the main dashboard page */}
        <Route path='/dashboard' element={<DashBoard />} />
        {/* Protected routes */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/superadmin-coupon/:id" element={<Coupon />} />
        <Route path="/superadmin-voucher/:id" element={<Voucher />} />
        <Route path="/superadmin-topup/:id" element={<VoucherTopup />} />
        <Route path="/superadmin-createAgent" element={<CreateAgentPage />} />
        <Route path="/superadmin-deleteuser/:id" element={<DeleteUserPage />} />
        <Route path="/superadmin-edituser/:id" element={<EditUserPage />} />
        <Route path="/superadmin-editagent/:id" element={<EditAgentPage />} />
        <Route path="/superadmin-deleteagent/:id" element={<DeleteAgentPage />} />
        <Route path="/superadmin-editpolicy/:id" element={<EditPolicyPage />} />
        <Route path="/superadmin-deletepolicy/:id" element={<DeletePolicyPage />} />
        <Route path="/superadmin-createbranch" element={<CreateBranch />} />
        <Route path="/superadmin-getoneuser/:id" element={<GetOneUser />} />
        <Route path="/superadmin-getonepolicy/:id" element={<GetOnePolicy />} />

        
        {/* Define routes for different sections */}
        <Route path='/dashboard/policies' element={<Policies />} />
        <Route path='/dashboard/reports' element={<Reports />} />
        <Route path='/dashboard/branch-agencies' element={<BranchesAgencies />} />
        <Route path='/dashboard/manage-users' element={<ManageUsers />} />
        <Route path='/dashboard/manage-agents' element={<ManageAgents />} />
        <Route path='/dashboard/manage-roles' element={<ManageRoles />} />

        <Route path='/compliant' element={<CompliantForm />} />
        <Route path='/roles' element={<InsuranceTable/>} />
        <Route path='/userTable' element={<UserTable/>} />
        <Route path='/rolesPage' element={<RolesPage/>} />
        <Route path='/add-User' element={<AddUser/>} />
        <Route path='/add-Role' element={<AddRoles/>}/>



        {/* Payment Related Routes */}
        <Route path='/paymentpage' element={<PaymentPage />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymentunsuccess' element={<PaymentUnsuccess />} />
      </Routes>
    </div>
  );
};

export default App;
