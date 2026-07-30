"use client"
import CardFrame from "../CardFrame/CardFrame";
import { Colors, CardStatuses } from "@/src/ts/types";
import { ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  label: string | ReactNode;
  disabled?: boolean;
  color: Colors;
  isFlipped?: boolean;
  startedFlipped?: boolean;
  onNavigate?: () => void;
  backFace?: ReactNode;
}

const cardLinkVariants = {
  visible: { rotateY: 90, opacity: 1, translateZ: 0, scale: 1 },
  flipped: { rotateY: 0, opacity: 0.4, translateZ: 24, scale: 0.97 },
};

export function CardLink({
  label,
  disabled = false,
  color,
  onNavigate,
}: Props) {
  const handleClick = () => {
    if (disabled) return;
    onNavigate?.();
  };

  return (
    <motion.div
      className="Card__flip"
      // variants={cardLinkVariants}
      style={{transform: "translateZ(124px)"}}
      // initial={"visible"}
      // animate={isFlipped ? "flipped" : "visible"}
      transition={{ duration: 0.4, delay: 0.05, ease: "easeInOut" }}
      onClick={handleClick}>

    <div className="Card__inner text-left w-fit"    onClick={handleClick}>        <div className="Card__face Card__face--front lg:text-3xl">
          <CardFrame classNames="CardLink" status={CardStatuses.Coloured} color={color} animateInit={false}>
            {label}
          </CardFrame>
        </div>
      
      </div>
      </motion.div>
  );
}
