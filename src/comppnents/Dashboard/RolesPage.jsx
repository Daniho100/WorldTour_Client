import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Aside from "../Dashboard/Aside";
import DNavbar from "../Dashboard/DNavbar";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the roles data from the backend
    axios
      .get('http://localhost:8081/api/roles') // Replace with your actual API endpoint
      .then((response) => {
        setRoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the roles data!', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (roleId) => {
    console.log(`Edit role with ID: ${roleId}`);
    // Logic for editing the role
  };

  const handleDelete = (roleId) => {
    console.log(`Delete role with ID: ${roleId}`);
    // Logic for deleting the role
  };

  return (
    <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <DNavbar />

      <div className="flex h-screen">
        {/* Sidebar */}
        <Aside />

      {/* Main content */}
      

        {/* Page Content */}
        <div className="p-4 overflow-x-auto w-full">
          {/* Flexbox container for title and button */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Roles</h1>
            <Link
              to="/add-role"
              className="bg-primary text-white p-2 rounded hover:bg-green-600 transition-shadow duration-200 hover:shadow-lg"
            >
              + Add new
            </Link>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p>Loading roles...</p>
            ) : (
              <table className="min-w-full bg-primary2 shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">Role Name</th>
                    <th className="py-2 px-4 border-b">Role Description</th>
                    <th className="py-2 px-4 border-b"># of Users</th>
                    <th className="py-2 px-4 border-b">Organisation</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={role.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b">{role.roleName}</td>
                      <td className="py-2 px-4 border-b">{role.roleDescription}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {role.numberOfUsers}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {role.organization || '-'}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={() => handleEdit(role.id)}
                          className="mr-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPage;
