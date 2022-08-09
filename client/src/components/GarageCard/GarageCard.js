import "./GarageCard";
import { useNavigate } from "react-router-dom";
import "./GarageCard.scss";

function GarageCard(props) {
  const { title, image } = props;

  const urlParam = title; //title.split(" ")[0];
  const nav = useNavigate();

  const clickHandler = () => {
    nav(`/reportSelect/${urlParam}`);
  };
  return (
    <button className="garage__button" onClick={clickHandler}>
      <img className="card__image" src={image} />
    </button>
  );
}

export default GarageCard;
