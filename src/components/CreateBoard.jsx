/* eslint-disable react/prop-types */
import axios from "axios";
import "./CreateBoard.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useModal } from "../contexts/ModalContext.jsx";

const CreateBoard = ({ setBoardList }) => {
  const [title, setTitle] = useState("");
  const { authUser } = useContext(AuthContext);
  const { setIsOpen } = useModal();
  const inputRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (title.trim().length > 0) {
      const boardData = { title, userId: authUser.sub };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/board`,
          boardData,
          {
            withCredentials: true,
          }
        );
        const newBoard = response.data;
        setBoardList((prevBoardList) => [...prevBoardList, newBoard]);
        setTitle("");
        setIsOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <section className="CreateBoard">
      <h2>Create Board</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          id="title"
          onChange={titleHandler}
          value={title}
          placeholder="Enter title please..."
          ref={inputRef}
        />
        <button>create</button>
      </form>
    </section>
  );
};

export default CreateBoard;
