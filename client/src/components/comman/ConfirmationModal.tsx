import React from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmType?: "primary" | "danger" | "success"; // Add button type
  loadingText?: string; // Text to show when loading
  isLoading?: boolean; // Loading state
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title = "Are you sure?", description, confirmLabel = "Yes", cancelLabel = "No", confirmType = "primary", loadingText = "Loading...", isLoading = false, onConfirm, onCancel }) => {
  const getButtonClasses = (type: "primary" | "danger" | "success") => {
    switch (type) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-600";
      case "danger":
        return "bg-red-500 hover:bg-red-600";
      case "success":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <DialogPanel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Title */}
          <DialogTitle className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</DialogTitle>

          {/* Description */}
          {description && <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>}

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow transition-all">
              {cancelLabel}
            </button>
            {/* <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition-all">
              {confirmLabel}
            </button> */}
            <button
              onClick={onConfirm}
              className={`${getButtonClasses(confirmType)} text-white px-4 py-2 rounded-md shadow transition-all flex items-center justify-center`}
              disabled={isLoading} // Disable confirm button when loading
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  {loadingText}
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
