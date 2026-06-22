"use client";
import "./CardFrame.css";
import { ReactNode } from "react";
import "../../app/globals.css";
import { motion } from "motion/react";
import { CardStatuses } from "@/src/ts/types";

interface Props {
  children: ReactNode;
  classNames?: string;
  status?: CardStatuses;
}

export default function CardFrame({ children, status = CardStatuses.Default, classNames = "" }: Props) {
  return (
    <div className="CardFrame">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "circOut",
        }}
        className={`CardFrame__inner ${status} ${classNames}`}>
        {children}
      </motion.div>
    </div>
  );
}
