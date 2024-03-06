/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./AddList.css";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddList = ({ allLists, setAllLists, setListLenghtChanged }) => {
  const [listTitle, setListTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const { boardId } = useParams();

  const showFormHandler = () => {
    setShowInput(true);
  };

  const inputHandler = (e) => {
    setListTitle(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const listData = {
      title: listTitle,
      boardId,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/list",
        listData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setAllLists((prevList) => [...prevList, response.data]);
      setListLenghtChanged(true);
      setListTitle("");
    } catch (err) {
      console.log(err);
    }
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
      <input
        ref={inputRef}
        value={listTitle}
        onChange={inputHandler}
        placeholder="Enter list title ..."
        // instead of maxLength textarea is a better choice
        maxLength={18}
      />
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
