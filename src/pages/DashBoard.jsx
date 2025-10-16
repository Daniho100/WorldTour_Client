import React, { useContext } from "react";
// import Aside from "../comppnents/Dashboard/Aside";
// import DNavbar from "../comppnents/Dashboard/DNavbar";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import AgentDashboard from "../comppnents/Dashboard/AgentDashboard";
import SuperAdminDashboard from "../comppnents/Dashboard/SuperAdminDashboard";
import UserDashboard from "../comppnents/Dashboard/UserDashboard";

const DashBoard = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle the case where the user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Authentication Required</h2>
          <p className="mb-4">Please log in to access the dashboard.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (user.role) { // Use user.role to determine the content
      case 'user':
        return <UserDashboard />;
      case 'agent':
      case 'creditAgent':
        return <AgentDashboard />;
      case 'superadmin':
      case 'admin':
        return <SuperAdminDashboard />;
      default:
        return <div>Error: Unknown user role</div>;
    }
  };

  return (
    // <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
    //   {/* Navbar */}
    //   <DNavbar />
      
    //   {/* Main content */}
    //   <div className="flex-1 flex flex-row mt-0">
    //     {/* Sidebar */}
    //     <Aside />
        
    //     {/* Content */}
    //     <div className="flex-1 overflow-auto w-full">
    //       {renderContent()} {/* Removed the semicolon here */}
    //     </div>
    //   </div>
    // </div>
    <div>
      {renderContent()} 
    </div>
  );
};

export default DashBoard;