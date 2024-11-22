import React from "react";
import BaseProps from "../../utils/types/BaseProps";
import clsx from "clsx";
interface ButtonProps extends BaseProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ type = "button", children, onClick, className = "", disabled = false }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={clsx("relative inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800", className)}>
      {children}
    </button>
  );
};

export default Button;
