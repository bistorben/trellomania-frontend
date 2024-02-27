import { createContext, useContext, useState, useEffect, useRef } from "react";

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

  // reference to the dialog element
  const dialogRef = useRef(null)

  // when the state is changing we want to change the state of the dialog
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  },[isOpen, dialogRef])

  return (
    <ModalContext.Provider value={{ setIsOpen, setModalContent }}>
      {children}
      {isOpen && (
        <>
          {/* <Modal closeModal={closeModal}>{modalContent}</Modal> */}
          <dialog className="Modal" ref={dialogRef}>
            <div className="modal-wrapper">
              <div className="close">
                <button onClick={closeModal}>&times;</button>
              </div>
              {modalContent}
            </div>
          </dialog>
        </>
      )}
      {/* <Modal /> */}
    </ModalContext.Provider>
  );
};
