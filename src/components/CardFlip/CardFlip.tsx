import { AnimatePresence, motion } from "motion/react";
import { ReactNode } from "react";
import "./CardFlip.css";

export const CardFlip = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="Card__flip"
        style={{
          transformStyle: "preserve-3d",
          perspective: 1200,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
        }}>
        <motion.div
          initial={{
            rotateY: 270,
            opacity: 0.8,
            translateZ: -24,
            filter: "blur(0.8px)",
          }}
          animate={{
            rotateY: 360,
            opacity: 1,
            translateZ: 0,
            filter: "blur(0px)",
          }}
          exit={{ rotateY: 90, opacity: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 46,
            mass: 1.15,
            delay: 0.02,
          }}>
          <div className="Card__inner">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
