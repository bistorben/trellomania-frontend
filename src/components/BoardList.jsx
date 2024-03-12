import { useEffect, useRef, useState } from "react";
import AddList from "./AddList.jsx";
import "./BoardList.css";
import axios from "axios";
import BoardListItem from "./BoardListItem.jsx";
import { useParams } from "react-router-dom";

const BoardList = () => {
  const [allLists, setAllLists] = useState([]);
  const [isAddCard, setIsAddCard] = useState({});
  const boardListRef = useRef(null);
  const [listLengthChanged, setListLenghtChanged] = useState(false);
  const { boardId } = useParams();

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
          `${import.meta.env.VITE_API}/${boardId}`,
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

  return (
    <section className="BoardList" ref={boardListRef}>
      <ul className="list-container">
        {allLists.map((list) => (
          <BoardListItem
            key={list._id}
            list={list}
            setAllLists={setAllLists}
            isAddCard={isAddCard}
            setIsAddCard={setIsAddCard}
          />
        ))}

        <li>
          <AddList
            allLists={allLists}
            setAllLists={setAllLists}
            setListLenghtChanged={setListLenghtChanged}
          />
        </li>
      </ul>
    </section>
  );
};

export default BoardList;
