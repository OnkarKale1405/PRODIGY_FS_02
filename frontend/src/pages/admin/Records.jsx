import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, ChevronDown, Download, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { getAllEmployees } from '../../services/repository/employeeRepo';
import { deleteEmployee, updateEmployee } from '../../services/repository/adminRepo';
import EmployeePopup from '../../components/admin/EmployeePopup';

const Records = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Add state for popup management
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  }

  // Function to fetch employees based on current page
  const fetchEmployees = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllEmployees(page)

      const { employees, totalEmployees, totalPages, currentPage } = response;

      // Transform API data to match your component structure
      const formattedEmployees = employees.map(emp => ({
        id: emp._id,
        name: emp.user.username,
        designation: emp.designation || 'Employee',
        email: emp.user.email,
        phone: emp.phone,
        department: emp.department,
        salary: emp.salary,
        joiningDate: formatDate(emp.joiningDate)
      }));

      setEmployees(formattedEmployees);
      setPagination({
        currentPage,
        totalPages,
        totalEmployees
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError(error.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchEmployees(1);
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchEmployees(page);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) =>
        emp.user.username.toLowerCase().includes(searchQuery) ||
        emp.user.email.toLowerCase().includes(searchQuery) ||
        emp.department.toLowerCase().includes(searchQuery) ||
        emp.designation.toLowerCase().includes(searchQuery)
      )
    );
  };

  // Modified edit handler to open the popup
  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsPopupOpen(true);
  };

  const handleSaveEmployee = async (updatedEmployee) => {
    try {
      const res = await updateEmployee(updatedEmployee.id, updatedEmployee);
      if (res) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) => (emp._id === updatedEmployee._id ? { ...emp, ...updatedEmployee } : emp))
        );
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };


  const handleDelete = async (id) => {
    const res = await deleteEmployee(id);
    if (res) {
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== id)
      );
    }
  };


  return (
    <div className="px-4 py-6 min-h-screen">
      <div className="text-start text-2xl font-semibold text-gray-700 mb-6">
        Manage Employee Records<br />
        <span className='text-lg font-normal'>View, Update, and Remove Employee Information</span>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header and Filters */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="text-lg font-medium invisible">Filters</div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Search"
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="p-6 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading employees...</p>
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={() => fetchEmployees(pagination.currentPage)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id} className={selectedEmployee === employee.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={selectedEmployee === employee.id}
                          onChange={() => setSelectedEmployee(employee.id === selectedEmployee ? null : employee.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.designation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.email}</div>
                        <div className="text-sm text-gray-500">{employee.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">{employee.department}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                          ₹ {employee.salary}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                          {employee.joiningDate}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                        {/* Edit Button */}
                        <button
                          className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition duration-300"
                          onClick={() => handleEdit(employee)}
                          title="Edit"
                        >
                          <Pencil size={20} />
                        </button>

                        {/* Delete Button */}
                        <button
                          className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition duration-300"
                          onClick={() => handleDelete(employee.id)}
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${pagination.currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${pagination.currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.currentPage - 1) * 10 + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.currentPage * 10, pagination.totalEmployees)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.totalEmployees}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${pagination.currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={16} />
                  </button>

                  {/* Generate page numbers */}
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;

                    // Show only a limited number of pages with ellipsis
                    if (
                      pageNumber === 1 ||
                      pageNumber === pagination.totalPages ||
                      (pageNumber >= pagination.currentPage - 1 && pageNumber <= pagination.currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${pagination.currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === 2 && pagination.currentPage > 3) ||
                      (pageNumber === pagination.totalPages - 1 && pagination.currentPage < pagination.totalPages - 2)
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 ${pagination.currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add the Employee Popup component */}
      <EmployeePopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setEmployeeToEdit(null);
        }}
        employee={employeeToEdit}
        onSave={handleSaveEmployee}
      />
    </div>
  );
};

export default Records;