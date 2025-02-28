import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { Employee } from "../models/employee.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addEmployee = asyncHandler(async (req, res) => {
    // Check admin privilege
    if (req.user.role_id !== 1) {
        throw new ApiError(403, "Unauthorized to perform this action");
    }

    const { id } = req.params;

    const { department, designation, phone, salary, joiningDate } = req.body;

    if (!joiningDate || !department || !designation || !salary || !phone) {
        throw new ApiError(400, "All fields are required");
    }

    const existingEmployee = await Employee.findOne({ user: id });
    if (existingEmployee) {
        throw new ApiError(409, "Employee already exists");
    }

    const employee = await Employee.create({
        user: id,
        phone,
        department,
        designation,
        salary,
        joiningDate
    });

    return res.status(201).json(new ApiResponse(201, employee, "Employee added successfully"));
});

const updateEmployee = asyncHandler(async (req, res) => {

    if (req.user.role_id !== 1) {
        throw new ApiError(403, "Unauthorized to perform this action");
    }

    const { id } = req.params;
    const { department, designation, salary, joiningDate } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    employee.department = department || employee.department;
    employee.designation = designation || employee.designation;
    employee.salary = salary || employee.salary;
    employee.joiningDate = joiningDate || employee.joiningDate;

    await employee.save();

    return res.status(200).json(new ApiResponse(200, employee, "Employee updated successfully"));
});

const deleteEmployee = asyncHandler(async (req, res) => {
    // Check admin privilege
    if (req.user.role_id !== 1) {
        throw new ApiError(403, "Unauthorized to perform this action");
    }

    const { id } = req.params;
    const employee = await Employee.findById(id).populate("user");
    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }
    console.log("EMploy: ",employee);

    // Delete the User referenced in Employee model
    if (employee.user) {
        await User.findByIdAndDelete(employee.user);
    }

    // Delete Employee document
    await employee.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Employee and associated User deleted successfully"));
});


export {
    addEmployee,
    updateEmployee,
    deleteEmployee
};