import { useState } from "react";
import { useModal } from "../contexts/ModalContext.jsx";
import BoardOverview from "./BoardOverview.jsx";
import CreateBoard from "./CreateBoard.jsx";
import "./Dashboard.css";
import { IoIosAddCircleOutline } from "react-icons/io";

const Dashboard = () => {
  const { setIsOpen, setModalContent } = useModal();
  const [boardList, setBoardList] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  console.log(boardList);
  const createHandler = () => {
    setIsOpen(true);
    setModalContent(
      <CreateBoard boardList={boardList} setBoardList={setBoardList} />
    );
  };

  return (
    <>
      <section className="dashboard-header">
        <h1>My User Dasboard</h1>
        <button className="btn-primary" onClick={createHandler}>
          Create <IoIosAddCircleOutline className="plus-icon" />
        </button>
      </section>
      <section className="dashboard-main">
        <BoardOverview
          boardList={boardList}
          setBoardList={setBoardList}
          sharedBoards={sharedBoards}
          setSharedBoards={setSharedBoards}
        />
      </section>
    </>
  );
};

export default Dashboard;
