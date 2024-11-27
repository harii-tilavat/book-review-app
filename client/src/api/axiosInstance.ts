import axios from "axios";

const API_URL = "https://book-review-app-rbcl.onrender.com/api" ; // For testing purpose backend API_URL = "http://localhost:8080/api";
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

export default axiosInstance;