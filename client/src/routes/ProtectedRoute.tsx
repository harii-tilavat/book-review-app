import React from "react";
import BaseProps from "../utils/types/BaseProps";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<BaseProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
