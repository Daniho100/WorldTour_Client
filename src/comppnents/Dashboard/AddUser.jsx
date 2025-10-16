import React, { useState } from 'react';
import Aside from '../Dashboard/Aside';
import DNavbar from '../Dashboard/DNavbar';

const AddUser = () => {
  const [user, setUser] = useState({
    branch: '',
    userType: 'System Administrator',
    photo: null,
    photoPreview: null, // For image preview
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address: '',
    country: 'Nigeria',
    state: '',
    city: '',
    username: '',
    randomPassword: true,
    forcePasswordChange: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      photo: file,
      photoPreview: URL.createObjectURL(file), // Generate a preview URL
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    // You can send the user data to your backend here
  };

  return (
    <div className="flex flex-col w-full overflow-auto">
    {/* Top Navbar */}
    <DNavbar />

    <div className="flex h-screen">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}

        

        {/* Page Content */}
        <div className="p-6 flex-1">
          <div className="p-3 max-w-2xl mx-auto bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-3">New User</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Branch */}
              <div>
                <label className="block mb-1">Branch</label>
                <select
                  name="branch"
                  value={user.branch}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
                >
                  <option value="">----</option>
                  {/* Add other branch options here */}
                </select>
              </div>

              {/* User Type */}
              <div>
                <label className="block mb-1">User type</label>
                <select
                  name="userType"
                  value={user.userType}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
                >
                  <option value="System Administrator">System Administrator</option>
                  {/* Add other user type options here */}
                </select>
              </div>

              {/* Photo Upload with Preview */}
              <div>
                <label className="block mb-1">Your Photo</label>
                <div
                  className="border border-dashed p-3 rounded flex flex-col items-center justify-center"
                  style={{ width: '240px', height: '240px' }}
                >
                  {user.photoPreview ? (
                    <img
                      src={user.photoPreview}
                      alt="Preview"
                      className="object-cover rounded"
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7M16 3H8m4 12l-4-4m0 0l4-4m-4 4h12"
                        />
                      </svg>
                      <p>
                        Preferred Size: 240px x 240px
                        <br />
                        Max 2MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    Upload Image
                  </label>
                </div>
              </div>

              {/* Other Inputs */}
              {[
                { label: 'Firstname', name: 'firstname', type: 'text' },
                { label: 'Lastname', name: 'lastname', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Telephone', name: 'telephone', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'City', name: 'city', type: 'text' },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={user[name]}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
                  />
                </div>
              ))}

              {/* Country and State */}
              {[
                { label: 'Country', name: 'country', options: ['Nigeria'] },
                { label: 'State', name: 'state', options: ['Select an Option'] },
              ].map(({ label, name, options }) => (
                <div key={name}>
                  <label className="block mb-1">{label}</label>
                  <select
                    name={name}
                    value={user[name]}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
                  >
                    {options.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Login Section */}
              <div className="border p-3 rounded bg-gray-100 mt-3">
                <h2 className="text-xl font-semibold mb-2">Login</h2>
                <div>
                  <label className="block mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
                  />
                </div>

                {[
                  { label: 'Force Password Change', name: 'forcePasswordChange' },
                  { label: 'Random Password', name: 'randomPassword' },
                ].map(({ label, name }) => (
                  <div className="flex items-center space-x-2 mt-2" key={name}>
                    <input
                      type="checkbox"
                      name={name}
                      checked={user[name]}
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    <label>{label}</label>
                  </div>
                ))}
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Save Change
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
