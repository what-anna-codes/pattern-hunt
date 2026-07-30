"use client";
import "./CardFrame.css";
import { CSSProperties, ReactNode } from "react";
import "../../app/globals.css";
import { motion } from "motion/react";
import { CardStatuses, Colors } from "@/src/ts/types";

interface Props {
  children: ReactNode;
  classNames?: string;
  status?: CardStatuses;
  color?: Colors | "zinc";
  style?: CSSProperties;
  animateInit?: boolean;
  onClick?: (param?: any) => void;
}

export default function CardFrame({
  style,
  color,
  children,
  onClick,
  status = CardStatuses.Default,
  classNames = "",
  animateInit = true,
}: Props) {
  const content = (
    <div
      onClick={onClick}
      style={style}
      className={`CardFrame ${status} ${color}  ${classNames} rounded-md`}>
      {children}
    </div>
  );

  if (animateInit) {
    return (
      <motion.div
        layout
        className={`CardFrame__wrapper
         ${status === CardStatuses.Disabled ? "disabled" : ""}
      rounded-2xl`}>
        {content}
      </motion.div>
    );
  }
  return (
    <div
      className={`CardFrame__wrapper ${status === CardStatuses.Disabled ? "disabled" : ""}`}>
      {content}
    </div>
  );
}
