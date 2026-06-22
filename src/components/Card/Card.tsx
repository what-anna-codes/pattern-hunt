import "./Card.css";
import CardSymbol from "./CardSymbol/CardSymbol";
import { CardStatuses, ICard } from "../../ts/types";
import { getFeatures } from "../../utils/deck";
import CardFrame from "../CardFrame/CardFrame";

function Card({
  classNames = "",
  handleClick,
  id,
  status = CardStatuses.Default,
}: ICard) {
  const { count } = getFeatures(id);
  if (!id) return null;
  return (
    <div className={`Card ${status} ${classNames}`} onClick={handleClick}>
      <CardFrame>
        {Array.from({ length: count }).map((_, i) => (
          <CardSymbol key={`symbol-${id}-${i}`} id={id} />
        ))}
      </CardFrame>
    </div>
  );
}

export default Card;
