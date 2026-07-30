"use client";

import { GetResultsQuery } from "@/src/__generated__/graphql";
import { CardLink } from "@/src/components/CardLink/CardLink";
import CardFrame from "@/src/components/CardFrame/CardFrame";
import Grid from "@/src/components/Grid/Grid";
import { Colors } from "@/src/ts/types";
import ResultCard from "./ResultCard/ResultCard";
import "../Results.css";
import { CardFlip } from "@/src/components/CardFlip/CardFlip";
import { getMockResults } from "./ResultsGridUtils";

export default function ResultsGrid({
  results,
  activeId,
  handleNavigate,
  isNavigating,
  rank,
}: {
  results: GetResultsQuery["results"] | null;
  activeId: string | null;
  handleNavigate: (href: string) => void;
  isNavigating: boolean;
  rank?: number;
  isLoading?: boolean;
}) {
  const mockResults = getMockResults(11);

  return (
    <Grid isExpanded={false}>
      <CardFlip isExiting={isNavigating}>
        <CardLink
          onNavigate={() => handleNavigate("/game")}
          label="play again"
          color={Colors.Red}
        />
      </CardFlip>
      {mockResults.map((result, index) => (
        <CardFlip
          key={`results-page__grid__card-flip-${result.id}`}
          isExiting={isNavigating}>
          <ResultCard
            result={results?.[index] ?? result}
            index={index}
            rank={rank}
            classNames={results ? "" : ""}
            resultType={!results ? "mock" : "real"}
            isActive={activeId === results?.[index]?.id}
          />
        </CardFlip>
      ))}
    </Grid>
  );
}
CardFrame;
