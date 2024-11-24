import React, { createContext, useContext, useState } from "react";
import { UserLoginModel, UserModel } from "../_models/UserModel";
import BaseProps from "../utils/types/BaseProps";
import { Navigate } from "react-router-dom";
export class AuthModel {
  isAuthenticated!: boolean;
  currentUser?: UserModel | null;
  loginUser!: (user: UserModel, token: string) => void;
  logoutUser!: () => void;
  registerUser!: (user: UserModel) => void;
  checkAuthStatus!: () => boolean;
}
const noop = () => {};
const AuthContext = createContext<AuthModel>({
  isAuthenticated: false,
  currentUser: null,
  loginUser: noop,
  logoutUser: noop,
  registerUser: noop,
  checkAuthStatus: () => false,
});

export const AuthContextProvider: React.FC<BaseProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState<UserModel | null>(JSON.parse(localStorage.getItem("user") as string));

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
    <Navigate to={"/login"} />;
  }
  function registerUser(user: UserModel) {
    // const users: Array<UserModel> = JSON.parse(localStorage.getItem("users") || "[]");
    // const isExists = users.some((i) => i.email === user.email && i.password === user.password);
    // if (isExists) {
    //   throw new Error("User already exits");
    // }
    // users.push(user);
    // localStorage.setItem("users", JSON.stringify(users));
  }
  function checkAuthStatus() {
    const user: UserModel = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.email && user.password) {
      setIsAuthenticated(true);
      return true;
    }
    setIsAuthenticated(false);
    return false;
  }
  return <AuthContext.Provider value={{ isAuthenticated, currentUser, loginUser, logoutUser, registerUser, checkAuthStatus }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
