import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 30000,
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

export default axiosInstance;