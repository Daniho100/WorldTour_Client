import React, { useState } from 'react';
import Aside from '../Dashboard/Aside';
import DNavbar from '../Dashboard/DNavbar';

const NewRoleForm = () => {
  const [organization, setOrganization] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [isSystemRole, setIsSystemRole] = useState(false);

  const handleSave = () => {
    // Logic to save the new role
    const newRole = {
      organization,
      roleName,
      roleDescription,
      isSystemRole,
    };
    console.log("New Role Data:", newRole);
    // Make API call to save the role here
  };

  const handleCancel = () => {
    // Reset the form or navigate back to the previous page
    console.log('Cancelled');
  };

  return (
    <div className="flex flex-col w-full overflow-auto">
      {/* Top Navbar */}
      <DNavbar />

      <div className="flex h-screen">
        {/* Sidebar */}
        <Aside />

        {/* Main Content */}
        <div className="p-6 flex-1">
          <div className="p-4 max-w-xl mx-auto bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">New Role</h2>

            {/* Organisation Dropdown */}
            <div className="mb-4">
              <label className="block font-bold mb-1" htmlFor="organization">
                Organisation <span className="text-red-500">(Required)</span>
              </label>
              <select
                id="organization"
                className="border w-full p-2 rounded"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                <option value="">==[Global]==</option>
                <option value="Head Office">Head Office</option>
                {/* Add other organization options here */}
              </select>
            </div>

            {/* Role Name Input */}
            <div className="mb-4">
              <label className="block font-bold mb-1" htmlFor="roleName">
                Role Name
              </label>
              <input
                id="roleName"
                type="text"
                className="border w-full p-2 rounded"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>

            {/* System Role Checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={isSystemRole}
                  onChange={(e) => setIsSystemRole(e.target.checked)}
                />
                <span className="ml-2">System Role</span>
              </label>
            </div>

            {/* Role Description Textarea */}
            <div className="mb-4">
              <label className="block font-bold mb-1" htmlFor="roleDescription">
                Role Description
              </label>
              <textarea
                id="roleDescription"
                className="border w-full p-2 rounded"
                rows="4"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoleForm;
