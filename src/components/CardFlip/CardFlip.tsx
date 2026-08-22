import { AnimatePresence, motion } from "motion/react";
import { CSSProperties, ReactNode } from "react";
import "./CardFlip.css";
import { cardFlipVariants } from "./CardFlipUtils";

export const CardFlip = ({
  style = {},
  children,
  isExiting = false,
  classNames = "",
}: {
  children: ReactNode;
  isExiting?: boolean;
  classNames?: string;
  style?: CSSProperties;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="Card__flip"
        style={{
          transformStyle: "preserve-3d",
          perspective: 1200,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
          ...{ ...style },
        }}>
        <motion.div
          style={{ width: "100%", height: "100%" }}
          initial={"initial"}
          animate={isExiting ? "isExiting" : "isEntering"}
          variants={cardFlipVariants}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 56,
            duration: 3.8,
            mass: 1.15,
            delay: 0.02,
          }}>
          <div
            className={`Card__inner ${classNames}`}
            style={{ width: "100%", height: "100%" }}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
