import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserTable = ({users}) => {

  if (!users || !Array.isArray(users)) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>No users available</p>
      </div>
    );
  }
  

  const [entriesPerPage, setEntriesPerPage] = useState(100); // Default to 100 entries per page
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const filteredUsers = users.filter(user =>
    user.firstNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 

  return (

    <div className="container mx-auto px-4 py-6 overflow-hidden">
    {/* <h1 className="text-2xl font-bold mb-4">Travel Insurance</h1> */}

    {/* Center-aligned Show and Search */}
    <div className="flex justify-end items-center mt-[-20px] space-x-4 mb-4 ">
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
          className="border border-green-300 p-2 rounded-lg w-[400px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>


    <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-lg rounded-lg border-collapse overflow-hidden">
          {/* <!-- Table Header --> */}
          <thead>
            <tr class="bg-green-600 text-white">
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">S/N</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lastname</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Firstname</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Telephone</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          
          <tbody>
          {currentEntries.map((entry, index) => (
            <tr class="odd:bg-white even:bg-green-50 hover:bg-green-100">
              <td class="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{entry.surname}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{entry.firstNames}</td>
              <td class="px-6 py-4 text-sm text-gray-700">
                  <a href={`mailto:${entry.email}`} className="text-gray-700 hover:underline">
                        {entry.email}
                  </a>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{entry.phone}</td>
              <td class="px-6 py-4 text-sm">
                  <Link to={`/superadmin-getoneuser/${entry._id}`}>
                      Do More
                  </Link>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>


    {/* Pagination Controls */}
    <div className="mt-4 flex justify-between">
      <span className='text-blue-600 font-serif'>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredUsers.length)} of {filteredUsers.length} entries</span>
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
          disabled={indexOfLastEntry >= filteredUsers.length}
          className="bg-green-600 text-white px-3 py-1 text-xs rounded h-[30px] hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  );
};

export default UserTable;
