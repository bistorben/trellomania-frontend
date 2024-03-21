import { Draggable } from "react-beautiful-dnd";
import "./Card.css";

// eslint-disable-next-line react/prop-types
const Card = ({ title, id, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <li
            className="Card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{title}</p>
          </li>
        );
      }}
    </Draggable>
  );
};

export default Card;
