import { UserLoginModel, UserModel } from '../_models/UserModel';
import { handleApiError } from '../utils/api';
import axiosInstance from './axiosInstance';

const authApi = {
    // Login API
    login: async (user: UserLoginModel) => {
        try {
            const response = await axiosInstance.post("/login", user);
            console.log(response);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    register: async (user: UserModel) => {
        try {
            const response = await axiosInstance.post("/register", user);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
}
export default authApi;