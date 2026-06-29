"use client";

import { ResultsQuery } from "@/src/__generated__/graphql";
import CardFrame from "@/src/components/CardFrame/CardFrame";
import TimeResult from "@/src/components/TimeResult/TimeResult";
import { CardColors, CardStatuses } from "@/src/ts/types";
import "../../Results.css";

export default function ResultCard({
  result,
  index,
  isActive,
}: {
  result: ResultsQuery["results"][0];
  index: number;
  isActive: boolean;
}) {
  if (!result) return null;
  const { username, seconds } = result;

  return (
    <CardFrame
      color={CardColors.Green}
      status={CardStatuses.Coloured}
      style={{ opacity: isActive ? 0.8 : (15 - index) * 0.08 }}
      classNames={`${isActive ? "result result-latest" : "result"}`}>
      <span className="username">{username}</span>
      <TimeResult classNames="mt-[40%] seconds" duration={seconds} />
    </CardFrame>
  );
}
