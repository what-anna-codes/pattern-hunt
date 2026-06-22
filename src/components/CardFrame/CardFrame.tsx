"use client";
import "./CardFrame.css";
import { ReactNode } from "react";
import "../../app/globals.css";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
}

export default function CardFrame({ children }: Props) {
  return (
    <div className="CardFrame">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "circOut",
        }}
        className="CardFrame__inner bg-zinc-100/60 hover:bg-zinc-50/90">
        {children}
      </motion.div>
    </div>
  );
}
