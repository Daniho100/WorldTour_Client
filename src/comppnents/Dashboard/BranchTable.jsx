import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const BranchTable = ({ branches }) => {
  console.log('Branches received by BranchesTable:', branches);

  
  if (!branches || !Array.isArray(branches)) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>No Branches available</p>
      </div>
    );
  }
  

  const [entriesPerPage, setEntriesPerPage] = useState(100); // Default to 100 entries per page
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  // Filter data based on the search term
  const filteredData = branches.filter((entry) =>
    entry.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.location.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // Handle pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      {/* <h1 className="text-2xl font-bold mb-4">Travel Insurance</h1> */}

      {/* Center-aligned Show and Search */}
      <div className="flex justify-center items-center space-x-4 mb-4 ml-60">
        <div className="flex items-center">
          <label className="mr-2">Show</label>
          <select
            className="border p-2"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="ALL">ALL</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Search:</label>
          <input
            type="text"
            className="border p-2 rounded-lg w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link
            to="/superadmin-createbranch"
            className="bg-primary text-white py-2 px-4 mr-44 rounded transition-shadow duration-200 hover:shadow-lg"
          >
            + Add New Branch
        </Link>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-auto border border-gray-300" style={{ maxHeight: '500px', maxWidth: '100%' }}>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary2">
              <th className="border px-4 py-2 text-sm">SN</th>
              <th className="border px-4 py-2 text-sm">Policies</th>
              <th className="border px-4 py-2 text-sm">Branch Name</th>
              <th className="border px-4 py-2 text-sm">Location</th>
              <th className="border px-4 py-2 text-sm">Phone</th>
              <th className="border px-4 py-2 text-sm">Email</th>
              <th className="border px-4 py-2 text-sm">Today</th>
              <th className="border px-4 py-2 text-sm">This Week</th>
              <th className="border px-4 py-2 text-sm">This Month</th>
              <th className="border px-4 py-2 text-sm">All</th>
              <th className="border px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2 text-sm">{index + 1}</td>
                <td className="border px-4 py-2 text-sm">{entry.policies}</td>
                <td className="border px-4 py-2 text-sm">{entry.branchName}</td>
                <td className="border px-4 py-2 text-sm">{entry.location}</td>
                <td className="border px-4 py-2 text-sm">{entry.phone}</td>
                <td className="border px-4 py-2 text-sm">
                  <a href={`mailto:${entry.email}`} className="text-blue-500 hover:underline">
                    {entry.email}
                  </a>
                </td>
                <td className="border px-4 py-2 text-sm">
                  {entry.dateRanges?.today ? new Date(entry.dateRanges.today).toLocaleDateString('en-NG') : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {entry.dateRanges?.thisWeek ? new Date(entry.dateRanges.thisWeek).toLocaleDateString('en-NG') : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {entry.dateRanges?.thisMonth ? new Date(entry.dateRanges.thisMonth).toLocaleDateString('en-NG') : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {entry.dateRanges?.all ? new Date(entry.dateRanges.all).toLocaleDateString('en-NG') : 'N/A'}
                </td>


                <td className="border px-4 py-2 flex justify-between space-x-1">
                    <Link to={`/superadmin-editpolicy/${entry._id}`}>
                        <img src="/edit-icon.svg" alt="Edit" className="w-5" />
                    </Link>

                    <Link to={`/superadmin-deletepolicy/${entry._id}`}>
                        <img src="/delete-icon.png" alt="Edit" className="w-5" />
                    </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries</span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastEntry >= filteredData.length}
            className="border px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchTable;
