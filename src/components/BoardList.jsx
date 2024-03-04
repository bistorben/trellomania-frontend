import { useEffect, useState } from "react";
import AddList from "./AddList.jsx";
import "./BoardList.css";
import axios from "axios";

const BoardList = () => {
  const [allLists, setAllLists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/list");

        setAllLists(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <section className="BoardList">
      <ul className="list-container">
        {allLists.map((list) => (
          <li>
            <div className="li-item-container">
              <div className="li-header">
                <h4>{list.title}</h4>
              </div>
              <ul className="li-cards-container">
                <li>any card</li>
              </ul>
              <div className="li-footer">
                <button>add card</button>
              </div>
            </div>
          </li>
        ))}
        {/* <li>
          <div className="li-item-container">
            <div className="li-header">
              <h4>to do</h4>
            </div>
            <ul className="li-cards-container">
              <li>any card</li>
            </ul>
            <div className="li-footer">
              <button>add card</button>
            </div>
          </div>
        </li>
        <li>
          <div className="li-item-container">
            <div className="li-header">
              <h4>to do</h4>
            </div>
            <ul className="li-cards-container">
              <li>any card</li>
            </ul>
            <div className="li-footer">
              <button>add card</button>
            </div>
          </div>
        </li> */}
        <li>
          <AddList allLists={allLists} setAllLists={setAllLists} />
        </li>
      </ul>
    </section>
  );
};

export default BoardList;
