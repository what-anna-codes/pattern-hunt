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
      style={{transform: "translateZ(124px)", width: '100%', height: "100%"}}
      // initial={"visible"}
      // animate={isFlipped ? "flipped" : "visible"}
      transition={{ duration: 0.4, delay: 0.05, ease: "easeInOut" }}
      onClick={handleClick}>

        <CardFrame  status={CardStatuses.Coloured}   onClick={handleClick}   color={color} animateInit={true}>
            {label}
          </CardFrame>


      </motion.div>
  );
}
