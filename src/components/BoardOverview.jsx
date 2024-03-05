/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./BoardOverview.css";
import axios from "axios";
import { Link } from "react-router-dom";

const BoardOverview = ({ boardList, setBoardList }) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/board", {
          withCredentials: true,
        });

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
            <Link to="/board">
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
