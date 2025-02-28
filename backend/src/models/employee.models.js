import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";

const employeeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    salary: {
        type: Number,
        required: true,
        default: 10000
    },
    attendance: {
        type: [Date],
        default: [],
    },
}, {
    timestamps: true,
});

export const Employee = mongoose.model("Employee", employeeSchema);