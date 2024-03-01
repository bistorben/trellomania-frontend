import { useEffect, useState } from "react";
import "./AddList.css";
import { FaPlus } from "react-icons/fa";
import { Form } from "react-router-dom";

const AddList = () => {
  const [showInput, setShowInput] = useState(false);

  const addListHandler = () => {
    console.log("huhu");
    setShowInput(!showInput);
  };

  // useEffect(() => {
  //   if (showInput) {
  //     document.addEventListener("mousedown", addListHandler);
  //   } else {
  //     document.removeEventListener("mousedown", addListHandler);
  //   }
  // }, [showInput, addListHandler]);

  // document.addEventListener("click", addListHandler);

  const form = <input />;

  return (
    <div className="AddList" onMouseDown={showInput ? null : addListHandler}>
      <FaPlus />
      {showInput ? form : <h3>Add another list</h3>}
    </div>
  );
};

export default AddList;
