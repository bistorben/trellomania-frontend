import "./AddCard.css";
import { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";

const AddCard = ({ listId, isAddCard, setIsAddCard }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    // everytime the useEffect is executed we have to create a new handleFunction
    const handleDocumentListener = (e) => {
      if (!e.target.closest(".li-item-container")) {
        setIsAddCard({});
      }
    };

    if (isAddCard[listId] && textAreaRef.current) {
      textAreaRef.current.focus();
      document.addEventListener("mousedown", handleDocumentListener);
    }

    // clean up function, to delete the listener on document with the next execution of this useEffect

    return () => {
      document.removeEventListener("mousedown", handleDocumentListener);
    };
  }, [isAddCard]);

  const addCardHandler = (id) => {
    setIsAddCard({ [id]: true });
  };

  const showFormHandler = () => {
    setIsAddCard(!isAddCard);
  };

  const textAreaHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addCardForm = (
    <form>
      <textarea
        ref={textAreaRef}
        placeholder="Enter a title for the card..."
        onKeyDown={textAreaHandler}
      ></textarea>
      <div className="form-control">
        <button>Add Card</button>
        <button type="button" onClick={showFormHandler}>
          &times;
        </button>
      </div>
    </form>
  );

  const addCardBtn = (
    <button className="btn-card-open" onClick={() => addCardHandler(listId)}>
      <GoPlus className="icon-plus" />
      Add a card
    </button>
  );

  return <>{isAddCard[listId] ? addCardForm : addCardBtn}</>;
};

export default AddCard;
