import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id?: string;
  error?: FieldError;
  type?: string;
  label?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  isTextArea?: boolean;
}
// interface SelectProps extends InputProps {
//   options: Array<GenreModel>;
// }
const TextBox: React.FC<InputProps> = ({ id, error, register, label, type = "text", placeholder, isTextArea = false }) => {
  // const classes = 'mt-1 p-2 w-full border rounded-md border-blue-300 dark:border-gray-400 dark:bg-gray-800 dark:text-gray-100';
  const classes = "block w-full rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none";
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 dark:text-gray-100 font-semibold text-sm">
        {label}
      </label>
      {!isTextArea && <input id={id} type={type} className={classes} {...register} placeholder={placeholder} />}
      {isTextArea && <textarea rows={4} id={id} className={classes } {...register} placeholder={placeholder} />}

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
// const SelectList: React.FC<SelectProps> = ({ options = [], id, register, error, label }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={id} className="block text-gray-700 dark:text-gray-100 font-semibold text-sm">
//         {label}
//       </label>
//       <select name={id} id={id} className="mt-1 p-2 w-full border rounded-md border-blue-300 dark:border-gray-400 dark:bg-gray-800 dark:text-gray-100" {...register}>
//         <option value="">Select...</option>
//         {options.map((option) => (
//           <option value="" key={option.id}></option>
//         ))}
//       </select>
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// };
export default TextBox;
