"use client";

import { ResultsQuery } from "@/src/__generated__/graphql";
import { CardLink } from "@/src/components/CardLink/CardLink";
import CardFrame from "@/src/components/CardFrame/CardFrame";
import Grid from "@/src/components/Grid/Grid";
import { CardColors } from "@/src/ts/types";
import ResultCard from "./ResultCard/ResultCard";
import "../Results.css";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";

export default function ResultsGrid({
  results,
  activeId,
}: {
  results: ResultsQuery["results"];
  activeId: string | null;
}) {
  const { handleNavigate } = useFlipTransition();
  return (
    <Grid isExpanded={false}>
      <CardLink
        onNavigate={() => handleNavigate("/game")}
        label="play again"
        color={CardColors.Red}
      />
      {results &&
        results?.map((result, index) => (
          <ResultCard
            key={`result_card_${result.id}`}
            result={result}
            index={index}
            isActive={activeId === result.id}
          />
        ))}
    </Grid>
  );
}
CardFrame;
