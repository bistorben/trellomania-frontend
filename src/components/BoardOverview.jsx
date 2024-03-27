/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./BoardOverview.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useModal } from "../contexts/ModalContext.jsx";
import CreateBoard from "./CreateBoard.jsx";

const BoardOverview = ({
  boardList,
  setBoardList,
  sharedBoards,
  setSharedBoards,
}) => {
  const { authUser } = useContext(AuthContext);
  const { setIsOpen, setModalContent } = useModal();
  console.log("shared from BoardList", sharedBoards);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/board/${authUser.sub}`,
          {
            withCredentials: true,
          }
        );

        setBoardList(response.data.boards);
        setSharedBoards(response.data.sharedBoards);
      } catch (err) {
        console.log(err.response);
      }
    };
    getData();
  }, []);

  const createHandler = () => {
    setIsOpen(true);
    setModalContent(<CreateBoard setBoardList={setBoardList} />);
  };

  return (
    <section className="BoardOverview">
      <div className="projects-container">
        <h3>Your rojects:</h3>
        <ul className="board-container">
          {boardList.map((board) => (
            <li key={board._id} className="board-card">
              <Link to={`/board/${board._id}`}>
                <div>
                  <h3>{board.title}</h3>
                </div>
              </Link>
            </li>
          ))}
          <li className="create-board" onClick={createHandler}>
            <div>
              <IoIosAddCircleOutline className="create-icon" />
            </div>
          </li>
        </ul>
      </div>

      <div className="shared-container">
        <h3>Shared projects:</h3>
        <ul className="board-container">
          {sharedBoards.length === 0 ? (
            <div className="no-boards">no shared boards</div>
          ) : (
            sharedBoards.map((board) => (
              <li key={`shared-${board._id}`} className="board-card">
                <Link to={`/board/${board._id}`}>
                  <div>
                    <h3>{board.title}</h3>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* container muss drum */}
    </section>
  );
};

export default BoardOverview;
