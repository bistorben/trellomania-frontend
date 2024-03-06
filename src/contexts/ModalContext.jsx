import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal.jsx";

import Logout from "../components/Logout.jsx";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // const openModal = (content)
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <ModalContext.Provider value={{ setIsOpen, setModalContent }}>
      {children}
      {isOpen && (
        <>
          <Modal closeModal={closeModal}>{modalContent}</Modal>
        </>
      )}
      {/* <Modal /> */}
    </ModalContext.Provider>
  );
};
