import { useEffect, useRef, useState } from "react";
import "./AddList.css";
import { FaPlus } from "react-icons/fa";

const AddList = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const showFormHandler = () => {
    setShowInput(!showInput);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleDocumentListener = (e) => {
      if (!e.target.closest(".AddList")) {
        setShowInput(false);
      }
    };

    if (showInput && inputRef.current) {
      inputRef.current.focus();
      document.addEventListener("mousedown", handleDocumentListener);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentListener);
    };
  }, [showInput]);

  const addList = (
    <div className="open-form">
      <FaPlus />
      <h3>Add another List</h3>
    </div>
  );

  const form = (
    <form className="add-list-form" onSubmit={submitHandler}>
      <input ref={inputRef} placeholder="Enter list title ..." />
      <div className="form-control">
        <button>Add list</button>
        <button type="button" onClick={showFormHandler}>
          &times;
        </button>
      </div>
    </form>
  );

  return (
    <div className="AddList" onClick={showInput ? null : showFormHandler}>
      {showInput ? form : addList}
    </div>

    // <div
    //   className="AddList Hallo"
    //   onMouseDown={showInput ? null : addListHandler}
    // >
    //   <FaPlus />
    //   {showInput ? form : <h3>Add another list</h3>}
    // </div>
  );
};

export default AddList;
