import { useContext, useEffect, useState } from "react";
import { useModal } from "../contexts/ModalContext.jsx";
import BoardOverview from "./BoardOverview.jsx";
import CreateBoard from "./CreateBoard.jsx";
import "./Dashboard.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Dashboard = () => {
  const { setIsOpen, setModalContent } = useModal();
  const { authUser } = useContext(AuthContext);
  const [boardList, setBoardList] = useState([]);

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
        <button onClick={createHandler}>
          Create <IoIosAddCircleOutline className="plus-icon" />
        </button>
      </section>
      <section className="dashboard-main">
        <BoardOverview boardList={boardList} setBoardList={setBoardList} />
      </section>
    </>
  );
};

export default Dashboard;
