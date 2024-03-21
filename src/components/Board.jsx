import { useState } from "react";
import "./Board.css";
import BoardList from "./BoardList.jsx";

const Board = () => {
  const [allLists, setAllLists] = useState([]);
  return (
    <>
      <section className="board-header">
        <h3>Name of Board</h3>
      </section>
      <section className="board-main">
        <BoardList allLists={allLists} setAllLists={setAllLists} />
      </section>
    </>
  );
};

export default Board;
