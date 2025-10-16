import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import assets from '../../assets/assets';

const Aside = () => {  
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentRole, setCurrentRole] = useState(localStorage.getItem('role')?.toLowerCase());
  const location = useLocation();

  // Handle role changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentRole(localStorage.getItem('role')?.toLowerCase());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to get dashboard route based on role
  const getDashboardRoute = (role) => {
    switch(role) {
      case 'agent':
      case 'creditagent':
        return '/agent-dashboard';
      case 'superadmin':
        return '/superadmin-dashboard';
      case 'user':
        return '/user-dashboard';
      default:
        return '/dashboard';
    }
  };

  // Check if link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className="m-0">
      <aside className={`hidden sm:block transition-all duration-300 ${isExpanded ? 'w-[292px]' : 'w-[108px]'} bg-white border-2 border-r-gray3 h-screen`}>
        <div className="mt-0">
          <div className="flex flex-col items-center gap-y-5 mt-[40px] mb-[46px]">
            {isExpanded ? (
              <div className="flex flex-col gap-5">
                <Link 
                  to={getDashboardRoute(currentRole)} 
                  className={`flex flex-row items-center py-[2px] pl-0 pr-20 rounded-lg hover:bg-primary2 ${isActiveLink(getDashboardRoute(currentRole)) ? 'bg-primary2' : ''}`}
                >
                  <img src={assets.dottedIcon} alt="Dashboard" className="w-[44px] p-[10px]" />
                  <span className="text-base font-bold">Dashboard</span>
                </Link>

                {(currentRole === 'user' || currentRole === 'agent' || currentRole === 'superadmin') && (
                  <Link 
                    to="/dashboard/policies" 
                    className={`flex flex-row gap-4 items-center hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/policies') ? 'bg-primary2' : ''}`}
                  >
                    <img src={isActiveLink('/dashboard/policies') ? assets.policy1 : assets.policy1} alt="Policies" className="w-[44px]" />
                    <span className="text-sm">Policies</span>
                  </Link>
                )}

                {(currentRole === 'agent' || currentRole === 'superadmin') && (
                  <Link 
                    to="/dashboard/reports" 
                    className={`flex flex-row gap-4 items-center hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/reports') ? 'bg-primary2' : ''}`}
                  >
                    <img src={isActiveLink('/dashboard/reports') ? assets.report1 : assets.report1} alt="Reports" className="w-[44px]" />
                    <span className="text-sm">Reports</span>
                  </Link>
                )}

                {currentRole === 'superadmin' && (
                  <>
                    <Link 
                      to="/dashboard/branch-agencies" 
                      className={`flex flex-row gap-4 items-center hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/branch-agencies') ? 'bg-primary2' : ''}`}
                    >
                      <img src={isActiveLink('/dashboard/branch-agencies') ? assets.branch1 : assets.branch1} alt="Branch / Agencies" className="w-[44px]" />
                      <span className="text-sm">Branch / Agencies</span>
                    </Link>

                    <Link 
                      to="/dashboard/manage-users" 
                      className={`flex flex-row gap-4 items-center hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/manage-users') ? 'bg-primary2' : ''}`}
                    >
                      <img src={isActiveLink('/dashboard/manage-users') ? assets.user1 : assets.user1} alt="Manage Users" className="w-[44px]" />
                      <span className="text-sm">Manage Users</span>
                    </Link>

                    <Link 
                      to="/dashboard/manage-agents" 
                      className={`flex flex-row gap-4 items-center hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/manage-agents') ? 'bg-primary2' : ''}`}
                    >
                      <img src={isActiveLink('/dashboard/manage-agents') ? assets.user1 : assets.user1} alt="Manage Agents" className="w-[44px]" />
                      <span className="text-sm">Manage Agents</span>
                    </Link>

                    <Link 
                      to="/dashboard/manage-roles" 
                      className={`flex flex-row gap-4 items-center hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/manage-roles') ? 'bg-primary2' : ''}`}
                    >
                      <img src={isActiveLink('/dashboard/manage-roles') ? assets.roles1 : assets.roles1} alt="Manage Roles" className="w-[44px]" />
                      <span className="text-sm">Manage Roles</span>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to={getDashboardRoute(currentRole)}>
                  <img 
                    src={assets.dottedIcon} 
                    alt="Dashboard" 
                    className={`w-[44px] p-[10px] rounded-lg hover:bg-primary2 ${isActiveLink(getDashboardRoute(currentRole)) ? 'bg-primary2' : ''}`} 
                  />
                </Link>

                {(currentRole === 'user' || currentRole === 'agent' || currentRole === 'superadmin') && (
                  <Link to="/dashboard/policies">
                    <img 
                      src={assets.policy1} 
                      alt="Policies" 
                      className={`w-[44px] hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/policies') ? 'bg-primary2' : ''}`} 
                    />
                  </Link>
                )}

                {(currentRole === 'agent' || currentRole === 'superadmin') && (
                  <Link to="/dashboard/reports">
                    <img 
                      src={assets.report1} 
                      alt="Reports" 
                      className={`w-[44px] hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/reports') ? 'bg-primary2' : ''}`} 
                    />
                  </Link>
                )}

                {currentRole === 'superadmin' && (
                  <>
                    <Link to="/dashboard/branch-agencies">
                      <img 
                        src={assets.branch1} 
                        alt="Branch / Agencies" 
                        className={`w-[44px] hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/branch-agencies') ? 'bg-primary2' : ''}`} 
                      />
                    </Link>

                    <Link to="/dashboard/manage-users">
                      <img 
                        src={assets.user1} 
                        alt="Manage Users" 
                        className={`w-[44px] hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/manage-users') ? 'bg-primary2' : ''}`} 
                      />
                    </Link>

                    <Link to="/dashboard/manage-agents">
                      <img 
                        src={assets.roles1} 
                        alt="Manage Roles" 
                        className={`w-[44px] hover:bg-primary2 rounded-lg ${isActiveLink('/dashboard/manage-roles') ? 'bg-primary2' : ''}`} 
                      />
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div
            className="box-border flex flex-row justify-center items-center p-2 gap-2.5 w-full h-[40px] bg-gray-100 border border-gray-300 border-t-0 border-r-0 flex-none order-1 self-stretch grow-0 cursor-pointer"
            onClick={handleToggle}
          >
            <img
              src={assets.doublearrow}
              alt="Toggle"
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;