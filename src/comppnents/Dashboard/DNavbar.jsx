import React, { useContext, useState } from 'react';
import assets from '../../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';



const DNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useContext(AppContext);
  let displayName;

  if (user && user.role) {
    if (user.role === 'user') {
      displayName = `${user.surname} ${user.firstNames}`;
    } else if (user.role === 'agent') {
      displayName = user.agentName; // Assuming agentName is part of the user data
    } else if (user?.role === 'superadmin') {
      displayName = 'Super Admin';
    }
  } else {
    displayName = 'Super Admin'; // Or any default fallback if the user is not loaded
  }


  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <nav className="flex flex-row justify-between items-end sm:items-center mt-10 sm:mt-0 py-2 px-3 sm:px-16 border-b-2 border-gray3">
        <Link to='/dashboard'>
          <img className='w-[71px] sm:w-[106.5px] mt-6 sm:mt-0 cursor-pointer' src={assets.logo} alt="Logo" />
        </Link>

        <div className='flex flex-row justify-between gap-5 sm:gap-20'>
          <div className='flex flex-row gap-5 sm:gap-8'>
            <img className='w-5 sm:w-6 cursor-pointer' src={assets.alertIcon} alt="Alert" />
            <hr className='h-10 border border-gray3' />
            <img className='w-5 sm:w-6 cursor-pointer' src={assets.email2} alt="Email" />
            <hr className='sm:block h-10 border border-gray3' />
            {/* Show question icon based on screen size */}
            {isExpanded ? (
              <img className='w-5 sm:w-6 cursor-pointer' src={assets.questionIcon} alt="Question" />
            ) : (
              <img className='hidden sm:block w-5 sm:w-6 cursor-pointer' src={assets.questionIcon} alt="Question" />
            )}
          </div>

          <div className='shrink-1 flex items-center gap-12'>
            <div className='flex gap-3 items-center'>
              <img className='hidden sm:block w-12 cursor-pointer' src={assets.profileIcon} alt="Profile" />
              <p className='hidden sm:block'>{displayName}</p>
            </div>
            
            <img 
              onClick={handleToggle} 
              className='sm:hidden w-5 sm:w-6 mr-5 cursor-pointer' 
              src={isExpanded ? assets.exit : assets.hamburger} 
              alt={isExpanded ? "Exit" : "Toggle"} 
            />
          </div> 
        </div>
      </nav>

      {isExpanded && (
        <div className='flex flex-col bg-white shadow-lg z-10 p-4 sm:hidden'>
          <div className='flex flex-col items-start gap-5 mb-[225px]'>
            <Link to="/dashboard" className='w-full'>
              <div className='flex flex-row items-center py-[10px] gap-5 pl-3'>
                <img className='w-5 sm:w-6 cursor-pointer' src={assets.dottedIcon1} alt="Dashboard" />
                <span className='ml-2 text-gray4 text-base'>Dashboard</span>
              </div>
            </Link>
            <Link to="/dashboard/policies">
              <div className='flex flex-row items-center py-[10px] gap-5 pl-3'>
                <img className='w-5 sm:w-6 cursor-pointer' src={assets.policy3} alt="Policies" />
                <span className='ml-2 text-gray4 text-base'>Policies</span>
              </div>
            </Link>
            <Link to="/dashboard/reports">
              <div className='flex flex-row items-center py-[10px] gap-5 pl-3'>
                <img className='w-5 sm:w-6 cursor-pointer' src={assets.report3} alt="Reports" />
                <span className='ml-2 text-gray4 text-base'>Reports</span>
              </div>
            </Link>
            <Link to="/dashboard/branch-agencies">
              <div className='flex flex-row items-center py-[10px] gap-5 pl-3'>
                <img className='w-5 sm:w-6 cursor-pointer' src={assets.branch3} alt="Branch / Agencies" />
                <span className='ml-2 text-gray4 text-base'>Branch / Agencies</span>
              </div>
            </Link>
            <Link to="/dashboard/manage-users">
              <div className='flex flex-row items-center py-[10px] gap-5 pl-3'>
                <img className='w-5 sm:w-6 cursor-pointer' src={assets.user3} alt="Manage Users" />
                <span className='ml-2 text-gray4 text-base'>Manage Users</span>
              </div>
            </Link>
            <Link to="/dashboard/manage-roles">
              <div className='flex flex-row items-center py-[10px] gap-5 pl-3'>
                <img className='w-5 sm:w-6 cursor-pointer' src={assets.roles3} alt="Manage Roles" />
                <span className='ml-2 text-gray4 text-base'>Manage Roles</span>
              </div>
            </Link>
          </div>

          <div className='flex gap-3 items-center ml-5'>
            <img className='w-12 cursor-pointer' src={assets.profileIcon} alt="Profile" />
            <p>Super Admin</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DNavbar;
