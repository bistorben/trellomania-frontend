import AddList from "./AddList.jsx";
import "./BoardList.css";

const BoardList = () => {
  const arrayOfLi = [
    <>
      <li>
        <h4>to do</h4>
      </li>
    </>,
    <>
      <li>
        <h4>to do</h4>
      </li>
    </>,
    <>
      <li>
        <h4>to do</h4>
      </li>
    </>,
  ];

  return (
    <section className="BoardList">
      <ul className="list-container">
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
        </li>
        <li>
          <AddList />
        </li>
      </ul>
    </section>
  );
};

export default BoardList;
