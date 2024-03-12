import "./Card.css";

const Card = ({ title }) => {
  return (
    <li className="Card">
      <p>{title}</p>
    </li>
  );
};

export default Card;
