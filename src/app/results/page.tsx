"use client";

import "./Results.css";
import { Suspense, useEffect, useState } from "react";
import ResultsGrid from "./ResultsGrid/ResultsGrid";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  GetResultsQuery,
  GetResultsDocument,
  GetResultDocument,
  GetResultQuery,
} from "@/src/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useThrottle } from "@uidotdev/usehooks";
import HomeIconLink from "@/src/components/HomeIconLink/HomeIconLink";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import ContainerPage from "@/src/components/CardFlip/ContainerPage";
import { FullResult } from "@/src/ts/types";

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsPageContent />
    </Suspense>
  );
}

function ResultsPageContent() {
  const params = useSearchParams();
  const activeResultId = params.get("id");
  const { data, loading } = useQuery<GetResultsQuery>(GetResultsDocument);
  const { data: newResultData } = useQuery<GetResultQuery>(GetResultDocument, {
    variables: { id: activeResultId },
    skip: !activeResultId,
  });
  const [rank, setRank] = useState<number | null>(null);
  const [sorted, setSorted] = useState<GetResultsQuery["results"] | null>(null);
  const throttledValue = useThrottle(sorted, 500);
  const { isNavigating, handleNavigate } = useFlipTransition();

  const getRank = (
    results: GetResultsQuery["results"],
    newResult: Pick<FullResult, "seconds">,
  ) => {
    const allSeconds = results.map((r) => r.seconds);
    const rank = allSeconds.findIndex(
      (sec) => sec && newResult.seconds && sec > newResult.seconds,
    );
    return rank < 0 ? allSeconds.length + 1 : rank + 1;
  };

  useEffect(() => {
    if (newResultData?.result && data?.results && !rank) {
      const newRank = getRank(data.results, newResultData.result);
      setRank(newRank);
    }
    if (activeResultId && data?.results && newResultData && throttledValue) {
      const isIncluded = data.results
        .slice(0, 11)
        .some((el) => el.id === activeResultId);

      let sortedResults = !isIncluded
        ? [...data.results.slice(0, 10), newResultData.result].toSorted(
            (a, b: any) => Number(a?.seconds) - Number(b?.seconds),
          )
        : data.results.slice(0, 11);

      sortedResults && setSorted(sortedResults as GetResultsQuery["results"]);
    } else if (data?.results && !sorted) {
      setSorted(data?.results.slice(0, 11));
    }
  }, [data?.results, rank, throttledValue, newResultData]);

  const startedFlipped = params?.get("flip") === "1";
  return (
    <ContainerPage
      classNames="results-page bg-purple-300"
      isNavigating={isNavigating}>
      <div className="top-bar">
        <h1 className="page-heading">Best Results</h1>
        <HomeIconLink onNavigate={() => handleNavigate("/")} />
      </div>
      <motion.div
        className="grid-wrapper"
        initial={startedFlipped ? { opacity: 0.5 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.96, 0.24, 1] }}>
        {
          <ResultsGrid
            rank={rank ?? undefined}
            activeId={activeResultId}
            results={throttledValue ?? null}
            handleNavigate={handleNavigate}
            isNavigating={isNavigating}
            isLoading={loading}
          />
        }
      </motion.div>
      <div className="bottom-bar" />
    </ContainerPage>
  );
}
