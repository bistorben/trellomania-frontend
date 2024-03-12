import "./Card.css";

// eslint-disable-next-line react/prop-types
const Card = ({ title }) => {
  return (
    <li className="Card">
      <p>{title}</p>
    </li>
  );
};

export default Card;
