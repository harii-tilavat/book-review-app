import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext"
import authApi from "../api/authApi";
import { UserLoginModel, UserModel } from "../models/UserModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuthApi = () => {
    const { loginUser } = useAuth();

    // Loading state to track ongoing API calls
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Login API Handler
    const login = useCallback(async (userData: UserLoginModel) => {
        setIsLoading(true);
        try {
            const { data, message } = await authApi.login(userData);
            if (data && data.user && data.token) {
                loginUser(data.user, data.token); // Update AuthContext
                toast.success(message || "Login successful!");
                navigate("/");
                return;
            }
            throw new Error("Invalid login response. User or token is missing.");
        } catch (error: any) {
            console.error("Login API error:", error);
            toast.error("Login failed: " + error?.message || "Unknown error");
            throw error;
        }
        finally {
            setIsLoading(false);
        }

    }, [loginUser]);

    // Register API Handler
    const register = useCallback(async (userData: UserModel) => {
        setIsLoading(true);
        try {
            const { message } = await authApi.register(userData);
            toast.success(message || "Signup successful!");
            navigate("/login");
        } catch (error: any) {
            toast.error("Signup failed: " + error?.message || "Unknown error");
        } finally {
            setIsLoading(false);
        }

    }, []);

    return { login, register, isLoading };
}
