import { create } from "zustand";
import { toast } from "react-toastify";
import { LoginResponseModel, UserLoginModel, UserModel } from "../models/UserModel";
import { GenericReponseModel } from "../models";
import { handleApiError } from "../utils/api";
import axiosInstance from "../api/axiosInstance";

// Zustand Store
interface AuthState {
    currentUser: UserModel | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: UserLoginModel) => Promise<void>;
    register: (userData: UserModel) => Promise<void>;
    logout: () => void;
    checkAuthStatus: () => boolean;
    setUser: (user: UserModel | null, token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    currentUser: JSON.parse(localStorage.getItem("user") as string) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,

    // Login API
    login: async (userData: UserLoginModel) => {
        set({ isLoading: true });
        try {
            const { data: responseData } = await axiosInstance.post<GenericReponseModel<LoginResponseModel>>("/login", userData);
            const { data, message } = responseData;

            if (data?.user && data?.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                set({ currentUser: data.user, token: data.token, isAuthenticated: true });
                toast.success(message || "Login successful!");
            } else {
                throw new Error("Invalid login response. User or token is missing.");
            }
        } catch (error: any) {
            handleApiError(error, true);
        } finally {
            set({ isLoading: false });
        }
    },

    // Register API
    register: async (userData: UserModel) => {
        set({ isLoading: true });
        try {
            const { data: responseData } = await axiosInstance.post<GenericReponseModel<LoginResponseModel>>("/register", userData);
            const { data, message } = responseData;
            if (data?.user && data?.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                set({ currentUser: data.user, token: data.token, isAuthenticated: true });
                toast.success(message || "Signup successful!");
            } else {
                throw new Error("Invalid login response. User or token is missing.");
            }
        } catch (error: any) {
            handleApiError(error, true);
        } finally {
            set({ isLoading: false });
        }
    },

    // Logout
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ currentUser: null, token: null, isAuthenticated: false });
        toast.success("Logged out successfully!");
    },

    // Check Authentication Status
    checkAuthStatus: () => {
        const token = localStorage.getItem("token");
        if (token) {
            set({ isAuthenticated: true });
            return true;
        }
        set({ isAuthenticated: false });
        return false;
    },

    // Set user and token manually (useful for initialization or updates)
    setUser: (user: UserModel | null, token: string | null) => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        set({ currentUser: user, token, isAuthenticated: !!token });

    }
}));
