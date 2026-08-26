"use client";

import CardFrame from "@/src/components/CardFrame/CardFrame";
import TimeResult from "@/src/components/TimeResult/TimeResult";
import { Colors, CardStatuses, FullResult } from "@/src/ts/types";
import "../../Results.css";
import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";

export const ResultCardLine = ({
  content,
  classNames,
}: {
  content: string | ReactNode;
  classNames?: string;
}) => (
  <motion.div
    className={`flex justify-center ${classNames ?? ""}`}
    initial={{ opacity: 0.1 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}>
    {content}
  </motion.div>
);

export default function ResultCard({
  result,
  resultType,
  rank,
  index,
  isActive,
  classNames,
}: {
  result: FullResult;
  index: number;
  isActive: boolean;
  rank?: number;
  classNames?: string;
  resultType?: string;
}) {
  const { username, seconds } = result || {};
  const shades = [
    "#5b4365",
    "#694e74",
    "#775884",
    "#856293",
    "#926f9f",
    "#9d7fa9",
    "#a98eb4",
    "#b199bb",
    "#baa4c3",
    "#c2afca",
    "#cbbbd2",
  ];
  const [isActiveState, setIsActiveState] = useState(isActive);
  useEffect(() => {
    isActive !== isActiveState && setIsActiveState(isActive);
  }, [isActive, isActiveState]);

  return (
    <CardFrame
      animateInit={resultType?.toString() === "mock" ? true : false}
      color={Colors.Purple}
      status={CardStatuses.Coloured}
      style={{
        overflow: "hidden",
        border: 0,
        borderRadius: "10px",
        color: isActiveState ? "white" : "rgba(255, 255, 255, 0.7)",
        opacity: isActiveState ? 1 : (39 - index) * 0.2,
        padding: 0,
        background: shades[index],
      }}>
      <motion.div
        className={`${isActiveState ? "result result-latest" : "result"} ${classNames ?? ""}`}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}

        transition={{ duration: 500 }}>
        {resultType === "mock" ? (
          " "
        ) : (
          <>
            <ResultCardLine
              content={
                <span className="rank pt-2">
                  {isActiveState && rank ? rank : index + 1}

                </span>
              }
            />
            <ResultCardLine
              content={
                <span className="username text-lg md:text-xl lg:text-2xl tracking-wider drop-shadow-xl">
                  {username}
                </span>
              }
            />
            <ResultCardLine
              content={
                <TimeResult
                  classNames={`seconds font-accent tracking-widest pb-2 ${index > 5 ? "text-white/80" : "text-purple-100/80"}`}
                  duration={seconds}
                />
              }
            />
          </>
        )}
      </motion.div>
    </CardFrame>
  );
}
