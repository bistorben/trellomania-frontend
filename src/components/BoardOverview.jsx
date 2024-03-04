import { useEffect, useState } from "react";
import "./BoardOverview.css";
import axios from "axios";
import { Link } from "react-router-dom";

const BoardOverview = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/board");
        console.log("LOG", response.data);
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
          <li className="board-card">
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
