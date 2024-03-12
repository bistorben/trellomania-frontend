/* eslint-disable react/prop-types */
import axios, { all } from "axios";
import "./BoardListItem.css";
import { FaRegTrashAlt } from "react-icons/fa";

import AddCard from "./AddCard.jsx";
import { useState } from "react";

const BoardListItem = ({ list, setAllLists, isAddCard, setIsAddCard }) => {
  const deleteHandler = (id) => async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/list/${id}`, {
        withCredentials: true,
      });
      setAllLists((currLists) => currLists.filter((list) => list._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <li className="BoardListItem">
        <div className="li-item-container">
          <div className="li-header">
            <h4>{list.title}</h4>
            <div className="delete-control">
              <button
                id={list._id}
                onClick={deleteHandler(list._id)}
                className="btn-delete"
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
          <ul className="li-cards-container">
            {/* <li>any card</li>
              <li>any card</li>
              <li>any card</li> */}
          </ul>
          <div className="li-footer AddCard">
            <AddCard
              listId={list._id}
              isAddCard={isAddCard}
              setIsAddCard={setIsAddCard}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default BoardListItem;
