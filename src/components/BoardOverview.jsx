/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./BoardOverview.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const BoardOverview = ({ boardList, setBoardList }) => {
  const { authUser } = useContext(AuthContext);
  console.log("boardList from BoardList", boardList);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/board/${authUser.sub}`,
          {
            withCredentials: true,
          }
        );

        setBoardList(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getData();
  }, []);

  return (
    <section className="BoardOverview">
      <h1>Your Projects:</h1>
      {/* container muss drum */}
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
      </ul>
    </section>
  );
};

export default BoardOverview;
