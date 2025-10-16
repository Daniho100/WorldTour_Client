import React, { useState } from 'react';

const BranchProfile = () => {
  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    email: '',
    businessLocation: 'Nigeria',
    companyAddress: '',
    companyAddress2: '',
    state: 'Abia',
    city: '',
    zipCode: '',
    telephone: '',
    fax: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="p-3 max-w-2xl mx-auto bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-3">Branch Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* Branch Name */}
        <div>
          <label className="block mb-1">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Branch Name"
          />
        </div>

        {/* Branch Code */}
        <div>
          <label className="block mb-1">Branch Code</label>
          <input
            type="text"
            name="branchCode"
            value={formData.branchCode}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Branch Code"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Primary Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Email address"
          />
        </div>

        {/* Business Location */}
        <div>
          <label className="block mb-1">Business Location</label>
          <select
            name="businessLocation"
            value={formData.businessLocation}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
          >
            <option value="Nigeria">Nigeria</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Company Address */}
        <div>
          <label className="block mb-1">Company Address</label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Street"
          />
          <input
            type="text"
            name="companyAddress2"
            value={formData.companyAddress2}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Street (cont'd)"
          />
        </div>

        {/* State */}
        <div>
          <label className="block mb-1">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
          >
            <option value="Abia">Abia</option>
            {/* Add more state options here */}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="City"
          />
        </div>

        {/* Zip/Postal Code */}
        <div>
          <label className="block mb-1">Zip/Postal Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Zip/Postal Code"
          />
        </div>

        {/* Telephone */}
        <div>
          <label className="block mb-1">Telephone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Phone"
          />
        </div>

        {/* Fax */}
        <div>
          <label className="block mb-1">Fax</label>
          <input
            type="text"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Fax"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border p-1 rounded hover:shadow-md hover:shadow-green-700 transition-all duration-200"
            placeholder="Website"
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-green-700">
            Save Change
          </button>
          <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BranchProfile;
