/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import AddList from "./AddList.jsx";
import "./BoardList.css";
import axios from "axios";
import BoardListItem from "./BoardListItem.jsx";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorderArray } from "../utils/utils.js";
import { useModal } from "../contexts/ModalContext.jsx";
import { TbUserPlus } from "react-icons/tb";

import InviteUser from "./InviteUser.jsx";

// eslint-disable-next-line react/prop-types
const BoardList = ({ allLists, setAllLists }) => {
  const [isAddCard, setIsAddCard] = useState({});
  const [changeTitle, setChangeTitle] = useState({});
  const boardListRef = useRef(null);
  const [listLengthChanged, setListLenghtChanged] = useState(false);
  const [boardName, setBoardName] = useState("");
  const { boardId } = useParams();
  const { setIsOpen, setModalContent } = useModal();

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
        setAllLists(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getBoardName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/board/getname/${boardId}`,
          {
            withCredentials: true,
          }
        );
        setBoardName(response.data.title);
      } catch (err) {
        console.log(err);
      }
    };
    getBoardName();
  }, []);

  const onDragEndHandler = async (result) => {
    const { destination, source, type, draggableId } = result;
    if (!destination) return;
    if (type === "LIST") {
      setAllLists((currentLists) =>
        reorderArray(currentLists, source.index, destination.index)
      );
      try {
        const sourceListId = result.draggableId.slice("list-container-".length);

        const response = await axios.patch(
          `${import.meta.env.VITE_API}/list/order`,
          {
            boardId,
            sourceList: { sourceListId, newOrder: destination.index },
            destinationList: {
              oldOrder: destination.index,
              newOrder: source.index,
            },
          },
          {
            withCredentials: true,
          }
        );
        // causing a render bug... have to check this later

        console.log("ondrag: ", response.data);
        // setAllLists(response.data);
      } catch (err) {
        console.log(err);
      }
    } else if (type === "CARD") {
      // CAUTION: working but needs to be refactored....

      console.log("destination: ", destination);
      console.log("source", source);

      const sourceList = allLists.find(
        (list) => list._id === source.droppableId
      );
      console.log("sourceList cards", sourceList.cards);

      const destinationList = allLists.find(
        (list) => list._id === destination.droppableId
      );

      const draggedCard = sourceList.cards.find(
        (card) => card._id === draggableId
      );

      if (destination.droppableId === source.droppableId) {
        // Es handelt sich um dieselbe Liste
        const updatedCards = reorderArray(
          sourceList.cards,
          source.index,
          destination.index
        );

        console.log("updated cards", updatedCards);

        const newAllLists = allLists.map((list) => {
          if (list._id === source.droppableId) {
            return { ...list, cards: updatedCards };
          }
          return list;
        });

        setAllLists(newAllLists);
      } else {
        destinationList.cards.splice(destination.index, 0, draggedCard);

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
    }
  };

  const inviteHandler = () => {
    setIsOpen(true);
    setModalContent(<InviteUser boardId={boardId} />);
  };

  // CAUTION: Section board-header here is a quick solution, whole structure needs to be changed...
  return (
    <>
      <section className="board-header">
        <h3>{boardName}</h3>
        <button className="btn-primary" onClick={inviteHandler}>
          <TbUserPlus />
          <span>share</span>
        </button>
      </section>
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
                      changeTitle={changeTitle}
                      setChangeTitle={setChangeTitle}
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
    </>
  );
};

export default BoardList;
