import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { employeeEndpoints } from "../Api"
const { GET_UNADDED_EMPLOYEES, GET_ALL_EMPLOYEES } = employeeEndpoints;

export async function getUnaddedEmployees() {
    const loadingToast = toast.loading("Getting unadded employees...");

    try {
        const response = await apiConnector("GET", GET_UNADDED_EMPLOYEES);
        // console.log("repo res: ", response.data);

        if (response.data.success) {
            toast.success("Employees fetched Successfully!");
            toast.dismiss(loadingToast);
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Error fetching employees.");
        }

    } catch (error) {
        console.error("getUnaddedEmployees API Error:", error);
        toast.error(error.message || "Error while fetching employees.");
    }

    toast.dismiss(loadingToast);
    return null;
}

export async function getAllEmployees(page) {
    const loadingToast = toast.loading("Getting employees...");

    try {
        const response = await apiConnector("GET", `${GET_ALL_EMPLOYEES}?page=${page}`);

        if (response.data.success) {
            toast.success("Employees fetched successfully!");
            toast.dismiss(loadingToast);
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Error fetching employees.");
        }
    } catch (error) {
        console.error("getAllEmployees API Error:", error);
        toast.error(error.message || "Error while fetching employees.");
    }

    toast.dismiss(loadingToast);
    return null;
}

