import React, { createContext, useContext, useState } from "react";
import { UserModel } from "../_models/UserModel";
import BaseProps from "../utils/types/BaseProps";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export class AuthModel {
  isAuthenticated!: boolean;
  currentUser?: UserModel | null;
  loginUser!: (user: UserModel, token: string) => void;
  logoutUser!: () => void;
  checkAuthStatus!: () => boolean;
}
const noop = () => {};
const AuthContext = createContext<AuthModel>({
  isAuthenticated: false,
  currentUser: null,
  loginUser: noop,
  logoutUser: noop,
  checkAuthStatus: () => false,
});

export const AuthContextProvider: React.FC<BaseProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState<UserModel | null>(JSON.parse(localStorage.getItem("user") as string));
  const navigate = useNavigate();

  function loginUser(user: UserModel, token: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setCurrentUser(user);
  }
  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/login");
  }
  function checkAuthStatus() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      return true;
    }
    // toast.error("Session expired! Login again.");
    setIsAuthenticated(false);
    return false;
  }
  return <AuthContext.Provider value={{ isAuthenticated, currentUser, loginUser, logoutUser, checkAuthStatus }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
