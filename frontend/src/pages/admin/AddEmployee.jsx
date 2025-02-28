import { useState, useEffect } from "react";
import EmployeePopup from "../../components/admin/EmployeePopup";
import { getUnaddedEmployees } from "../../services/repository/employeeRepo";
import { addEmployee } from "../../services/repository/adminRepo";

const AddEmployee = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);

    // Fetch unadded employees from backend
    useEffect(() => {
        const fetchUnaddedEmployee = async () => {
            const res = await getUnaddedEmployees();
            if (res) {
                setEmployees(res);
            }
        }
        fetchUnaddedEmployee();
    }, []);

    const handleAddDetails = (employee) => {
        setSelectedEmployee(employee);
        setIsPopupOpen(true);
    };

    const handleSaveDetails = async (updatedEmployee) => {
        console.log('Saving employee details:', updatedEmployee);

        try {
            const res = await addEmployee(selectedEmployee._id, updatedEmployee);
            if (res) {
                setEmployees(prevEmployees =>
                    prevEmployees.filter(emp => emp._id !== updatedEmployee._id)
                );
                setIsPopupOpen(false);
                // console.log("Employee removed from unadded list");
            }
        } catch (error) {
            console.error("Error saving employee details:", error);
        }
    };


    return (
        <div className="px-4 py-6 mx-auto">
            <div className="text-start text-2xl font-semibold text-gray-700 mb-6">
                Assign Tasks to Registered Employees <br /> <span className="text-lg font-normal">Streamline Work Allocation</span>
            </div>

            {employees && employees.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Verified</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employees.map((employee) => (
                                <tr key={employee._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {employee.isEmailVerified ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">No</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(employee.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleAddDetails(employee)}
                                            className="py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                                        >
                                            Add Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No employees found</p>
                </div>
            )}

            {isPopupOpen && (
                <EmployeePopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    employee={selectedEmployee}
                    onSave={handleSaveDetails}
                />
            )}
        </div>
    );
};

export default AddEmployee;