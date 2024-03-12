/* eslint-disable react/prop-types */
import axios from "axios";
import "./BoardListItem.css";
import { FaRegTrashAlt } from "react-icons/fa";
import AddCard from "./AddCard.jsx";
import { useEffect, useState } from "react";
import Card from "./Card.jsx";

const BoardListItem = ({ list, setAllLists, isAddCard, setIsAddCard }) => {
  const [allCards, setAllCards] = useState([]);

  // currying
  const deleteHandler = (id) => async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(`http://localhost:3000/list/${id}`, {
        withCredentials: true,
      });
      setAllLists((currLists) => currLists.filter((list) => list._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/card/${list._id}`,
          {
            withCredentials: true,
          }
        );
        setAllCards(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

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
            {allCards.map((card) => (
              <Card key={card._id} title={card.title} />
            ))}
          </ul>

          <div className="li-footer AddCard">
            <AddCard
              listId={list._id}
              isAddCard={isAddCard}
              setIsAddCard={setIsAddCard}
              allCards={allCards}
              setAllCards={setAllCards}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default BoardListItem;
