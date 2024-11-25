import { GenricReponseModel } from '../_models';
import { LoginResponseModel, UserLoginModel, UserModel } from '../_models/UserModel';
import { handleApiError } from '../utils/api';
import axiosInstance from './axiosInstance';

const authApi = {
    // Login API
    login: async (user: UserLoginModel): Promise<GenricReponseModel<LoginResponseModel>> => {
        try {
            const response = await axiosInstance.post("/login", user);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    register: async (user: UserModel): Promise<GenricReponseModel> => {
        try {
            const response = await axiosInstance.post("/register", user);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }
}
export default authApi;