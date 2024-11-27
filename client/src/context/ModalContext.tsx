import React, { createContext, useContext, useState } from "react";
import BaseProps from "../utils/types/BaseProps";
import ConfirmationModal from "../components/comman/ConfirmationModal";

interface ModalState {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmType?: "primary" | "danger" | "success"; // Button type
  loadingText?: string; // Text to show when loading
  isLoading?: boolean; // Loading state
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextProps {
  showModal: (options: Omit<ModalState, "isOpen">) => void;
  hideModal: () => void;
}
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalContextProvider: React.FC<BaseProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, isLoading: false });

  const showModal = (options: Omit<ModalState, "isOpen">) => {
    setModalState({ ...options, isOpen: true });
  };
  const hideModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalState.isOpen && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          title={modalState.title}
          description={modalState.description}
          confirmLabel={modalState.confirmLabel}
          cancelLabel={modalState.cancelLabel}
          confirmType={modalState.confirmType}
          isLoading={modalState.isLoading}
          loadingText={modalState.loadingText}
          onCancel={modalState.onCancel || hideModal}
          onConfirm={() => {
            if (modalState.onConfirm) modalState.onConfirm();
            hideModal();
          }}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalContext;

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
