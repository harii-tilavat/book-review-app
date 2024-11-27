// utils/apiErrorHandler.js
export const handleApiError = (error: any) => {
    // Extract the error message from the response or use a default message
    const message =
        error.response?.data?.message || error.message || "An unknown error occurred.";

    // Optionally log the error for debugging purposes
    console.error("API Error:", message);

    // Throw a new error with the message
    throw new Error(message);
};
export const createQueryParams = (params: any) => {
    if (!params) {
        throw new Error("Params required!");
    };
    const queryString = Object.keys(params).map((key) => {
        const value = params[key];
        return value !== undefined && value !== null ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : null
    }).filter(Boolean).join('&'); // Remove nulls for undefined or null values
    return queryString ? `?${queryString}` : '';
};
