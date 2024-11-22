import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

import React from "react";
import BaseProps from "../utils/types/BaseProps";

export const ThemeContextProvider: React.FC<BaseProps> = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
