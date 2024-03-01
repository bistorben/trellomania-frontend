import AddList from "./AddList.jsx";
import "./Board.css";
import BoardList from "./BoardList.jsx";

const Board = () => {
  return (
    <>
      <section className="board-header">
        <h3>Name of Board</h3>
      </section>
      <section className="board-main">
        <BoardList />
      </section>
    </>
  );
};

export default Board;
