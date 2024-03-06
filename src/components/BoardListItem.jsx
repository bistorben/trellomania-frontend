/* eslint-disable react/prop-types */
import axios, { all } from "axios";
import "./BoardListItem.css";
import { FaRegTrashAlt } from "react-icons/fa";

const BoardListItem = ({ allLists, setAllLists }) => {
  const deleteHandler = (id) => async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/list/${id}`, {
        withCredentials: true,
      });
      setAllLists((currLists) => currLists.filter((list) => list._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {allLists.map((list) => (
        <li key={list._id} className="BoardListItem">
          <div className="li-item-container">
            <div className="li-header">
              <h4>{list.title}</h4>
              <div className="delete-control">
                <button
                  id={list._id}
                  onClick={deleteHandler(list._id)}
                  className="btn-delete"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
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
    </>
  );
};

export default BoardListItem;
