import { useEffect, useRef, useState } from "react";
import AddList from "./AddList.jsx";
import "./BoardList.css";
import axios from "axios";
import BoardListItem from "./BoardListItem.jsx";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorderArray } from "../utils/utils.js";

const BoardList = ({ allLists, setAllLists }) => {
  const [isAddCard, setIsAddCard] = useState({});
  const boardListRef = useRef(null);
  const [listLengthChanged, setListLenghtChanged] = useState(false);
  const { boardId } = useParams();
  // console.log("from BoardList allLists", allLists);
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
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "LIST") {
      // console.log("LISTE GEZOGEN");
      // console.log("soruce", source.index);
      // console.log("des", destination.index);
      setAllLists(reorderArray(allLists, source.index, destination.index));
    } else if (type === "CARD") {
      console.log("KARTE GEZOGEN");
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
