import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  error?: FieldError;
  type?: string;
  label?: string;
  register: UseFormRegisterReturn;
}

const TextBox: React.FC<InputProps> = ({ id, error, register, label, type = "text" }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700">
        {label}
      </label>
      <input id={id} type={type} className="mt-1 p-2 w-full border rounded-md border-blue-300" {...register} />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default TextBox;
