import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserTable = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        // Check if token exists, else redirect to login
        if (!token) {
          console.error("No token found, redirecting to login.");
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8081/super/getagents', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });

        if (response.status === 200) {
          setAgents(response.data);
        } else {
          console.error("Failed to fetch users:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [navigate]);

 
  const filteredUsers = agents.filter(agent =>
    agent.firstNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="p-5 overflow-x-auto w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Agents</h1>
            <div className='flex justify-between '>
              {Array.from({ length: 1 }, (_, index) => (
                  <div key={index} className="mr-4 mt-2">
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="border h-10 p-2 w-full " 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                  </div>
                ))}
              <Link to="/superadmin-createAgent" className="bg-primary text-white py-2 px-4 rounded transition-shadow duration-200 hover:shadow-lg">+ Add new user</Link>
            </div>
      </div>

      <div className="inline-block min-w-full overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-primary2">
              <th className="border px-4 py-2">Firstname</th>
              <th className="border px-4 py-2">Lastname</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Telephone</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
              {/* <th className="border px-2 py-1">Voucher</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((agent, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{agent.firstNames}</td>
                <td className="border px-4 py-2">{agent.surname}</td>
                <td className="border px-4 py-2">
                  <a href={`mailto:${agent.email}`} className="text-blue-500 hover:underline">{agent.email}</a>
                </td>
                <td className="border px-4 py-2">{agent.phone}</td>
                <td className="border px-4 py-2">{agent.role}</td>
                <td className="border px-4 py-2 flex justify-between space-x-2">
                    <Link to={`/superadmin-editagent/${agent._id}`}>
                        <img src="/edit-icon.svg" alt="Edit" className="w-5" />
                    </Link>

                    <Link to={`/superadmin-deleteagent/${agent._id}`}>
                        <img src="/delete-icon.png" alt="Edit" className="w-5" />
                    </Link>

                    <Link to={`/superadmin-voucher/${agent._id}`}>
                        <img src="/voucher-icon.svg" alt="Edit" className="w-5" />
                    </Link>

                    <td className=" px-1 py-1 mx-auto">
                      {/* Conditionally render the Top-Up link if the agent is a creditAgent */}
                      {agent.role === 'creditAgent' && (
                          <Link to={`/superadmin-topup/${agent._id}`}>
                            <img src="/voucher.svg" alt="Top-Up" className="w-5" />
                          </Link>
                        )}
                    </td>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
