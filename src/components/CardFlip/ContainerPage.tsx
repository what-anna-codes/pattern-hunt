import { motion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isNavigating: boolean;
  classNames?: string;
}

function ContainerPage({
  children,
  isNavigating = false,
  classNames = "",
}: Props) {
  return (
    <motion.main
      className={`main relative overflow-hidden ${classNames}`}
      animate={
        isNavigating
          ? { opacity: 0.88, scale: 0.995 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 0.8] }}>
      {children}
    </motion.main>
  );
}

export default ContainerPage;
