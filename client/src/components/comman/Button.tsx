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
    <button type={type} onClick={onClick} disabled={disabled} className={clsx("py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed", className)}>
      {children}
    </button>
  );
};

export default Button;
