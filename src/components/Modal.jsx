import "./Modal.css";

const Modal = ({ closeModal, children }) => {
  const handleModalOutsideClick = (e) => {
    if (e.target.className === "Modal") {
      closeModal();
    }
  };

  return (
    <div className="Modal" onClick={handleModalOutsideClick}>
      <div className="modal-wrapper">
        <div className="close">
          <button onClick={closeModal}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
