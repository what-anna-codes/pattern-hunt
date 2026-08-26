"use client";

import { CardLink } from "@/src/components/CardLink/CardLink";
import CardFrame from "@/src/components/CardFrame/CardFrame";
import { Colors, FullResult } from "@/src/ts/types";
import ResultCard from "./ResultCard/ResultCard";
import { CardFlip } from "@/src/components/CardFlip/CardFlip";
import { getMockResults } from "./ResultsGridUtils";
import { useEffect, useState } from "react";
import "../Results.css";

export default function ResultsGrid({
  results,
  activeId,
  handleNavigate,
  isNavigating,
  rank,
}: {
  results: FullResult[] | null;
  activeId: string | null;
  handleNavigate: (href: string) => void;
  isNavigating: boolean;
  rank?: number;
  isLoading?: boolean;
}) {
  const showHome = !activeId || (rank && rank <= 10)
  const mockResults = getMockResults(!activeId || showHome ? 10 : 11);
  const [resultsState, setResultsState] = useState<FullResult[] | null>(results);

  useEffect(() => {
    setResultsState(results);
  }, [results]);

  return (
    <>
      <CardFlip isExiting={isNavigating}>
        <CardLink
          onNavigate={() => handleNavigate("/game")}
          label={activeId ? "play again" : "play"}
          color={Colors.Red}
        />
      </CardFlip>
      {mockResults.map((result, index) => (
        <CardFlip
          key={`results-page__grid__card-flip-${result.id}`}
          isExiting={isNavigating}>
          <ResultCard
            result={resultsState?.[index] ?? result}
            index={index}
            rank={rank}
            classNames={resultsState ? "" : ""}
            resultType={!resultsState ? "mock" : "real"}
            isActive={activeId === results?.[index]?.id}
          />
        </CardFlip>
      ))}
      {showHome && <CardFlip isExiting={isNavigating}>
        <CardLink
          onNavigate={() => handleNavigate("/")}
          label="home"
          color={Colors.Green}
        />
      </CardFlip>}
    </>
  );
}
CardFrame;
