/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import AddList from "./AddList.jsx";
import "./BoardList.css";
import axios, { all } from "axios";
import BoardListItem from "./BoardListItem.jsx";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorderArray } from "../utils/utils.js";

// eslint-disable-next-line react/prop-types
const BoardList = ({ allLists, setAllLists }) => {
  const [isAddCard, setIsAddCard] = useState({});
  const boardListRef = useRef(null);
  const [listLengthChanged, setListLenghtChanged] = useState(false);
  const { boardId } = useParams();

  console.log("allLists from BoardList: ", allLists);
  useEffect(() => {
    if (listLengthChanged && boardListRef.current) {
      boardListRef.current.scrollTo({
        left: boardListRef.current.scrollWidth,
        behavior: "smooth",
      });
      setListLenghtChanged(false);
    }
  }, [allLists.length]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/list/${boardId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Data", response.data);
        setAllLists(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const onDragEndHandler = (result) => {
    const { destination, source, type, draggableId } = result;
    if (!destination) return;
    if (type === "LIST") {
      // console.log("LISTE GEZOGEN");
      // console.log("soruce", source.index);
      // console.log("des", destination.index);
      setAllLists(reorderArray(allLists, source.index, destination.index));
    } else if (type === "CARD") {
      // CAUTION: working but needs to be refactored....
      console.log(source);
      console.log(destination);

      const sourceList = allLists.find(
        (list) => list._id === source.droppableId
      );

      const destinationList = allLists.find(
        (list) => list._id === destination.droppableId
      );

      const draggedCard = sourceList.cards.find(
        (card) => card._id === draggableId
      );

      destinationList.cards.splice(destination.index, 0, draggedCard);

      console.log("destination List Obj: ", destinationList);
      console.log("destiantion Cards array: ", destinationList.cards);
      console.log("draggedCard Obj: ", draggedCard);
      const newAllLists = allLists.map((list) => {
        if (list._id === source.droppableId) {
          return {
            ...list,
            cards: [...list.cards.filter((card) => card._id !== draggableId)],
          };
        }
        if (list._id === destination.droppableId) {
          return {
            ...list,
            cards: destinationList.cards,
          };
        }
        return list;
      });

      setAllLists(newAllLists);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <section className="BoardList" ref={boardListRef}>
        <Droppable droppableId={boardId} direction="horizontal" type="LIST">
          {(dropProvided) => {
            return (
              <ul
                className="list-container"
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
              >
                {allLists.map((list, index) => (
                  <BoardListItem
                    key={list._id}
                    list={list}
                    index={index}
                    allLists={allLists}
                    setAllLists={setAllLists}
                    isAddCard={isAddCard}
                    setIsAddCard={setIsAddCard}
                  />
                ))}
                {dropProvided.placeholder}
                <li>
                  <AddList
                    allLists={allLists}
                    setAllLists={setAllLists}
                    setListLenghtChanged={setListLenghtChanged}
                  />
                </li>
              </ul>
            );
          }}
        </Droppable>
      </section>
    </DragDropContext>
  );
};

export default BoardList;
