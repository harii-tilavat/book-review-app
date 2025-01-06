import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 60 * 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Intercept requests to include the Authorization token

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Intercept responses to handle unauthorized errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if the error response is due to unauthorized access 
        if (error.response && error.response.status === 401) {
            // Clear any authentication information
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Redirect the user to the login page
            window.location.href = "/login";
        }

        // Return the error so the calling code can handle it
        return Promise.reject(error);
    }
);

export default axiosInstance;