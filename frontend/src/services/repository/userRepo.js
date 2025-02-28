//These repository files will be responsible for the flow of loaders and then sending the data to the connector along with the specific endpoint.
//i.e frontend pages will call the functions from thsese repo and then pass data to this and this function will decide the further actions/
//i.e enabling the loader, which endpoint should be called, after receiving the response what to do, toasting the required messages and at last defusing loaders.

import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { setAccount, setAccountAfterRegister, LogOut } from '../../app/AuthSlice';
import { authEndpoints } from "../Api"
const { LOGIN_API, REGISTER, LOGOUT } = authEndpoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Letting you in...");

        try {

            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            if (response.data.success) {
                toast.success("Login Successful..");
                const temp = {
                    "_id": response.data.data.user._id,
                    "username": response.data.data.user.username,
                    "email": response.data.data.user.email,
                    "token": response.data.data.accessToken,
                    "role_id": response.data.data.user.role_id,
                };
                await dispatch(setAccount(temp));
                navigate("/admin/welcome")

            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }

        toast.dismiss(loadingToast);
    };
}

export function register(username, email, role_id, password, avatar, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Registering you...");
        try {
            console.log("avatar in repo: ", avatar);
            const formData = {
                username,
                email,
                role_id,
                password,
                "avatar": avatar
            }

            const response = await apiConnector("POST", REGISTER, formData);

            if (response.data.success) {
                toast.success("Registration Successful..");
                const temp = {
                    "_id": response.data.data._id,
                    "username": response.data.data.username,
                    "email": response.data.data.email,
                    "role_id": response.data.data.role_id,
                }
                dispatch(setAccountAfterRegister(temp))
                navigate("/login");
            } else {
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.log("Register API Error....", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(loadingToast);
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Logging you out...");
        try {
            const response = await apiConnector("POST", LOGOUT, {});

            if (response.data.success) {
                toast.success("Logout Successful..");
                dispatch(LogOut());
                navigate("/");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }

        toast.dismiss(loadingToast);
    };
}
