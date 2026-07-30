import CardSymbol from "./CardSymbol/CardSymbol";
import { CardStatuses, Card as ICard } from "../../ts/types";
import { getFeatures } from "../../utils/deck";
import CardFrame from "../CardFrame/CardFrame";
import { motion } from "motion/react";

function Card({
  classNames = "",
  handleClick,
  style,
  id,
  status = CardStatuses.Default,
  animateInit = true,
}: ICard) {
  const { count, color, fill } = getFeatures(id);
  if (!id) return null;
  if (animateInit) return (
     <motion.div id={id} style={style} layout className={`Card ${status === CardStatuses.Disabled ? "disabled": ""}`} onClick={handleClick}>
     <CardFrame style={style} classNames={`${classNames} ${color} ${fill}`} status={status} animateInit={animateInit}>
        {Array.from({ length: count }).map((_, i) => (
          <CardSymbol key={`symbol-${id}-${i}`} id={id} />
        ))}
      </CardFrame>
     </motion.div>
  )
  return (
      <CardFrame style={style} classNames={`${classNames} ${color} ${fill}`} status={status} animateInit={animateInit}>
        {Array.from({ length: count }).map((_, i) => (
          <CardSymbol key={`symbol-${id}-${i}`} id={id} />
        ))}
      </CardFrame>
  );
}

export default Card;
