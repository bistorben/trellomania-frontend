/* eslint-disable react/prop-types */
import axios from "axios";
import "./BoardListItem.css";
import { FaRegTrashAlt } from "react-icons/fa";
import AddCard from "./AddCard.jsx";
import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { Draggable, Droppable } from "react-beautiful-dnd";

const BoardListItem = ({
  list,
  setAllLists,
  isAddCard,
  setIsAddCard,
  index,
}) => {
  const [allCards, setAllCards] = useState([]);

  // currying
  const deleteHandler = (id) => async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `${import.meta.env.VITE_API}/list/${id}`,
        {
          withCredentials: true,
        }
      );
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
      <Draggable draggableId={`list-container-${list._id}`} index={index}>
        {(dragProvided) => {
          return (
            <li
              className="BoardListItem"
              {...dragProvided.draggableProps}
              ref={dragProvided.innerRef}
            >
              <div className="li-item-container">
                <div className="li-header" {...dragProvided.dragHandleProps}>
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
                <Droppable
                  droppableId={`card-container-${list._id}`}
                  type="CARD"
                >
                  {(dropProvided) => {
                    return (
                      <ul
                        className="li-cards-container"
                        {...dropProvided.droppableProps}
                        ref={dropProvided.innerRef}
                      >
                        {allCards.map((card, index) => (
                          <Card
                            key={card._id}
                            title={card.title}
                            id={card._id}
                            index={index}
                          />
                        ))}
                        {dropProvided.placeholder}
                      </ul>
                    );
                  }}
                </Droppable>

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
          );
        }}
      </Draggable>
    </>
  );
};

export default BoardListItem;
