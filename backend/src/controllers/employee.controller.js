import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const getUnaddedEmployee = asyncHandler(async (req, res) => {

    if (req.user.role_id !== 1) {
        throw new ApiError(403, "Unauthorized to perform this action");
    }

    const unaddedEmployees = await User.aggregate([
        {
            $lookup: {
                from: "employees", // The name of the Employee collection (MongoDB uses lowercase + plural names by default)
                localField: "_id", // The field in User model
                foreignField: "user", // The reference field in Employee model
                as: "employeeData"
            }
        },
        {
            $match: {
                "employeeData": { $size: 0 }, // Filters out users who already have Employee records
                role_id: 2 // Ensures the user is an employee
            }
        },
        {
            $project: {
                password: 0, // Exclude sensitive fields like password
                refreshToken: 0,
                emailVerificationToken: 0,
                emailVerificationExpiry: 0
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, unaddedEmployees, "Unadded Employees fetched successfully"));
});

const getAllEmployees = asyncHandler(async (req, res) => {
    // Check admin privilege
    if (req.user.role_id !== 1) {
        throw new ApiError(403, "Unauthorized to perform this action");
    }

    // Get the page number from query params (default to 1)
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const employees = await Employee.find()
            .populate("user", "username email fullname")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalEmployees = await Employee.countDocuments();

        res.status(200).json(new ApiResponse(200, {
            employees,
            totalEmployees,
            totalPages: Math.ceil(totalEmployees / limit),
            currentPage: page,
        }, "Employees fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch employee details");
    }
});

export { getUnaddedEmployee, getAllEmployees };