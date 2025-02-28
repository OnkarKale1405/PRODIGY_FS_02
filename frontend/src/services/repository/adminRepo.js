import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { adminEndpoints } from "../Api"
const { ADD_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } = adminEndpoints;

export async function addEmployee(id, employeeData) {
    const loadingToast = toast.loading("Adding employee...");

    try {
        const response = await apiConnector("POST", `${ADD_EMPLOYEE}/${id}`, employeeData);
        // console.log("API Response:", response.data);

        if (response.data.success) {
            toast.success("Employee added successfully!");
            toast.dismiss(loadingToast);
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Error adding employee.");
        }

    } catch (error) {
        console.error("addEmployeeDetail API Error:", error);
        toast.error(error.message || "Error while adding employee.");
    }

    toast.dismiss(loadingToast);
    return null;
}

export async function updateEmployee(id, updatedEmployee) {
    const loadingToast = toast.loading("Updating employee...");

    try {
        const response = await apiConnector("PUT", `${UPDATE_EMPLOYEE}/${id}`, updatedEmployee);
        // console.log("API Response:", response.data);

        if (response.data.success) {
            toast.success("Employee updated successfully!");
            toast.dismiss(loadingToast);
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Error updating employee.");
        }
    } catch (error) {
        console.error("updateEmployee API Error:", error);
        toast.error(error.message || "Error while updating employee.");
    }

    toast.dismiss(loadingToast);
    return null;
}


export async function deleteEmployee(id) {
    const loadingToast = toast.loading("Deleting employee...");

    try {
        const response = await apiConnector("DELETE", `${DELETE_EMPLOYEE}/${id}`, {});

        if (response.data.success) {
            toast.success("Employee deleted successfully!");
            toast.dismiss(loadingToast);
            return true;
        } else {
            throw new Error(response.data.message || "Error deleting employee.");
        }

    } catch (error) {
        console.error("deleteEmployee API Error:", error);
        toast.error(error.message || "Error while deleting employee.");
    }

    toast.dismiss(loadingToast);
    return false;
}
