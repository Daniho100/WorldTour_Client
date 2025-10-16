import React, { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../../comppnents/Dashboard/Aside";
import DNavbar from "../../comppnents/Dashboard/DNavbar";

const InsuranceTable = () => {
  const [data, setData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, entriesPerPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/getpolicies", {
        params: {
          page: currentPage,
          limit: entriesPerPage,
        },
      });
      setData(response.data.entries);
      setTotalEntries(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="flex flex-col w-full overflow-auto">
        <DNavbar />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Aside />

      {/* Main Content */}
      

        <div className="p-6">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Report</h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              Issued
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300">
              Draft
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300">
              Cancelled
            </button>
          </div>

          {/* Data Controls */}
          <div className="flex justify-between items-center mb-6 bg-white shadow p-4 rounded-md">
            {/* Left Controls */}
            <div className="flex space-x-2">
              <button className="bg-gray-200 px-3 py-2 text-sm rounded shadow hover:bg-gray-300">
                Filter
              </button>
              <button className="bg-gray-200 px-3 py-2 text-sm rounded shadow hover:bg-gray-300">
                Reset Filter
              </button>
              <button className="bg-blue-500 text-white px-3 py-2 text-sm rounded shadow hover:bg-blue-600">
                Export CSV
              </button>
              <button className="bg-blue-500 text-white px-3 py-2 text-sm rounded shadow hover:bg-blue-600">
                Export PDF
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border p-2 rounded text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">SN</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    VCode
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Cert #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Ref. #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Surname
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Other Names
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Passport #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Destination
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Start Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    End Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Age</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Premium
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Paid</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Issue Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Agent
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 text-gray-700 text-sm border-b"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{entry.vCode}</td>
                    <td className="px-4 py-2">{entry.certNumber}</td>
                    <td className="px-4 py-2 text-blue-500 hover:underline">
                      {entry.refNumber}
                    </td>
                    <td className="px-4 py-2">{entry.surname}</td>
                    <td className="px-4 py-2">{entry.otherNames}</td>
                    <td className="px-4 py-2">{entry.passportNumber}</td>
                    <td className="px-4 py-2">{entry.destination}</td>
                    <td className="px-4 py-2">{entry.startDate}</td>
                    <td className="px-4 py-2">{entry.endDate}</td>
                    <td className="px-4 py-2">{entry.age}</td>
                    <td className="px-4 py-2">{entry.premium}</td>
                    <td className="px-4 py-2">{entry.discount}</td>
                    <td className="px-4 py-2">{entry.paid}</td>
                    <td className="px-4 py-2">{entry.issueDate}</td>
                    <td className="px-4 py-2">{entry.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm">
              Showing {currentPage * entriesPerPage - entriesPerPage + 1} to{" "}
              {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries
            </span>
            <div className="flex space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`px-3 py-2 rounded ${
                    page + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTable;
