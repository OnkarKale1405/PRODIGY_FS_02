import { useEffect, useState } from "react";
import { X } from 'lucide-react';

const EmployeePopup = ({ isOpen, onClose, employee, onSave }) => {
    const [formData, setFormData] = useState({
        department: '',
        designation: '',
        phone: '',
        salary: '',
        joiningDate: ''
    });

    // Reset form when employee changes or modal opens
    useEffect(() => {
        if (isOpen && employee) {
            setFormData({
                department: employee.department || '',
                designation: employee.designation || '',
                phone: employee.phone || '',
                salary: employee.salary || '',
                joiningDate: employee.joiningDate || ''
            });
        }
    }, [isOpen, employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...employee,
            ...formData
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-opacity-75 backdrop-blur-xs transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}>
                </div>


                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Add Employee Details
                            </h3>
                            <button
                                onClick={onClose}
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="sr-only">Close</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Department Field */}
                                    <div className="col-span-2 md:col-span-1">
                                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                            Department
                                        </label>
                                        <select
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            <option value="">Select Department</option>
                                            <option value="engineering">Engineering</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="sales">Sales</option>
                                            <option value="finance">Finance</option>
                                            <option value="hr">Human Resources</option>
                                            <option value="operations">Operations</option>
                                        </select>
                                    </div>

                                    {/* Designation Field */}
                                    <div className="col-span-2 md:col-span-1">
                                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            name="designation"
                                            id="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            placeholder="Manager, Developer, etc."
                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>

                                    {/* Phone Field */}
                                    <div className="col-span-2 md:col-span-1">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="xxxxxx3698"
                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>

                                    {/* Salary Field */}
                                    <div className="col-span-2 md:col-span-1">
                                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                                            Salary
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                name="salary"
                                                id="salary"
                                                value={formData.salary}
                                                onChange={handleChange}
                                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md p-2 border"
                                                placeholder="0.00"
                                                aria-describedby="salary-currency"
                                            />
                                        </div>
                                    </div>

                                    {/* Joining Date Field */}
                                    <div className="col-span-2">
                                        <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
                                            Joining Date
                                        </label>
                                        <input
                                            type="date"
                                            name="joiningDate"
                                            id="joiningDate"
                                            value={formData.joiningDate}
                                            onChange={handleChange}
                                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeePopup;