import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const PoliciesTable = ({ policies }) => {
  console.log('Policies received by PoliciesTable:', policies);

  
  if (!policies || !Array.isArray(policies)) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>No policies available</p>
      </div>
    );
  }
  

  const [entriesPerPage, setEntriesPerPage] = useState(100); // Default to 100 entries per page
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  // Filter data based on the search term
  const filteredData = policies.filter((entry) =>
    entry.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.otherNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.paymentRef.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex justify-end items-center mt-[-20px] mr-[80px] space-x-4 mb-4">
        <div className="flex items-center">
          <label className="mr-2 text-green-600 font-serif">Show</label>
          <select
            className="border border-green-300 rounded-md p-2 text-green-600 font-serif"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
          >
            <option value="10" className='font-serif'>10</option>
            <option value="25" className='font-serif'>25</option>
            <option value="50" className='font-serif'>50</option>
            <option value="100" className='font-serif'>100</option>
            <option value="200" className='font-serif'>200</option>
            <option value="500" className='font-serif'>500</option>
            <option value="ALL" className='font-serif'>ALL</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2 text-green-600 font-serif">Search:</label>
          <input
            type="text"
            className="border  border-green-300 p-2 rounded-lg w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-auto " style={{ maxHeight: '500px', maxWidth: '100%' }}>
        <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg  overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SN</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">VCode</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cert #</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ref. #</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Surname</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Other names</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Ref</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Section ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Passport #</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Premium</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Commission</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index} className="text-center odd:bg-white even:bg-green-50 hover:bg-green-100">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.vcode}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.certNo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.refNo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.surname}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.otherNames}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <a href={`mailto:${entry.email}`} className="text-blue-500 hover:underline">
                    {entry.email}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.paymentRef}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.sessionId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.passportNo}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.destination}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{new Date(entry.startDate).toLocaleDateString('en-NG')}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{new Date(entry.endDate).toLocaleDateString('en-NG')}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.premium}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.commission}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.paid}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{new Date(entry.issueDate).toLocaleDateString('en-NG')}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{entry.agent ? `${entry.agent.surname} ${entry.agent.firstNames}` : 'user'}</td>


                <td class="px-6 py-4 text-sm">
                  <Link to={`/superadmin-getonepolicy/${entry._id}`}>
                      Do More
                  </Link>
                </td>
                {/* <td className="border px-4 py-4 flex justify-between space-x-1">
                    <Link to={`/superadmin-editpolicy/${entry._id}`}>
                        <img src="/edit-icon.svg" alt="Edit" className="w-5" />
                    </Link>

                    <Link to={`/superadmin-deletepolicy/${entry._id}`}>
                        <img src="/delete-icon.png" alt="Edit" className="w-5" />
                    </Link>
                  
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
      <span className='text-blue-600 font-serif'>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries</span>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-green-600 text-white px-3 py-1 text-xs rounded mr-[8px] h-[30px] hover:bg-green-700 transition"
        >
          Previous
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastEntry >= filteredData.length}
          className="bg-green-600 text-white px-3 py-1 text-xs rounded h-[30px] hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default PoliciesTable;
















