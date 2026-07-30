"use client";

import { GetResultsQuery } from "@/src/__generated__/graphql";
import CardFrame from "@/src/components/CardFrame/CardFrame";
import TimeResult from "@/src/components/TimeResult/TimeResult";
import { Colors, CardStatuses } from "@/src/ts/types";
import "../../Results.css";
import { motion } from "motion/react";
import { ReactNode } from "react";

export const ResultCardLine = ({
  content,
  classNames,
}: {
  content: string | ReactNode;
  classNames?: string;
}) => (
  <motion.div
    className={`flex justify-center  md:my-4 lg:my-6 my-2 ${classNames ?? ""}`}
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
  result: GetResultsQuery["results"][0];
  index: number;
  isActive: boolean;
  rank?: number;
  classNames?: string;
  resultType?: string;
}) {
  const { username, seconds, hintCount } = result || {};
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
  return (
    <div className={`position-relative ${resultType}`}>
      <CardFrame
        animateInit={resultType?.toString() === "mock" ? true : false}
        color={Colors.Purple}
        status={CardStatuses.Coloured}
        style={{
          color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
          opacity: isActive ? 1 : (39 - index) * 0.08,
          filter: "brightness(100%) contrast(120%)",
          background: shades[index],
        }}
        classNames={`${isActive ? "result result-latest" : "result"} ${classNames ?? ""} animate-wiggle wiggle`}>
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 500 }}>
          {resultType === "mock" ? (
            " "
          ) : (
            <>
              <ResultCardLine
                content={
                  <>
                    <span className="wiggle min-w-4 w-fit mr-1">
                      {isActive && rank ? rank : index + 1}.{" "}
                    </span>
                    {username}
                  </>
                }
              />
              <ResultCardLine
                classNames="opacity-80 animation-wiggle text-sm lg:text-md tracking-wider font-semibold font-sans"
                content={`hints: ${hintCount}`}
              />
              <ResultCardLine
                content={
                  <TimeResult
                    classNames="cseconds font-accent"
                    duration={seconds}
                  />
                }
              />
            </>
          )}
        </motion.div>
      </CardFrame>
    </div>
  );
}
