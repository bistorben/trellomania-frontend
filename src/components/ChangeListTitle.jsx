/* eslint-disable react/prop-types */
import axios from "axios";
import "./ChangeListTitle.css";
import { useEffect, useRef, useState } from "react";

const ChangeListTitle = ({
  title,
  changeTitle,
  setChangeTitle,
  listId,
  allLists,
  setAllLists,
}) => {
  const inputRef = useRef(null);
  const [inputTitle, setInputTitle] = useState(title);
  useEffect(() => {
    // everytime the useEffect is executed we have to create a new handleFunction
    const handleDocumentListener = (e) => {
      if (!e.target.closest(".ChangeListTitle")) {
        setChangeTitle(false);
      }
    };

    if (changeTitle[listId] && inputRef.current) {
      inputRef.current.focus();
      document.addEventListener("mousedown", handleDocumentListener);
    }

    // clean up function, to delete the listener on document with the next execution of this useEffect

    return () => {
      document.removeEventListener("mousedown", handleDocumentListener);
    };
  }, [changeTitle]);

  const inputHandler = (e) => {
    setInputTitle(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const titleData = {
      listId,
      title: inputTitle,
    };
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API}/list/title`,
        titleData,
        {
          withCredentials: true,
        }
      );
      console.log("Log aus submit", response.data);

      const newAllLists = allLists.map((list) => {
        if (list._id === listId) {
          list.title = inputTitle;
        }
        return list;
      });
      setAllLists(newAllLists);
      setChangeTitle(false);
    } catch (err) {
      console.log(err);
    }
  };

  const form = (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={inputTitle}
        ref={inputRef}
        onChange={inputHandler}
      />
    </form>
  );

  const titleInput = <h4 onClick={() => changeState(listId)}>{title}</h4>;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [changeTitle]);

  const changeState = (id) => {
    setChangeTitle({ [id]: true });
  };
  return (
    <div className="ChangeListTitle">
      {changeTitle[listId] ? form : titleInput}
    </div>
  );
};

export default ChangeListTitle;
