"use client";

import "./Results.css";
import { Suspense, useEffect, useState } from "react";
import ResultsGrid from "./ResultsGrid/ResultsGrid";
import { useSearchParams } from "next/navigation";
import {
  GetTopHundredResultsQuery,
  GetTopPageResultsQuery,
  useGetResultQuery,
  useGetTopHundredResultsQuery,
  useGetTopPageResultsQuery,
} from "@/src/__generated__/types";
import { useThrottle } from "@uidotdev/usehooks";
import HomeIconLink from "@/src/components/HomeIconLink/HomeIconLink";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import { FullResult } from "@/src/ts/types";
import Page from "@/src/components/Page/Page";


export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsPageContent />
    </Suspense>
  );
}

export const ResultsPageContent = () => {
  const params = useSearchParams();
  const activeResultId = params.get("id") ?? "abc";
  const { data, loading } = useGetTopPageResultsQuery();
  const { data: newResultData } = useGetResultQuery({
    variables: { id: activeResultId },
    skip: !activeResultId,
  });
  const { data: allResultsData } = useGetTopHundredResultsQuery({
    skip:
      !activeResultId ||
      data?.results.map((r) => r.id).includes(activeResultId),
  });
  const [rank, setRank] = useState<number | null>(null);
  const [sorted, setSorted] = useState<
    GetTopPageResultsQuery["results"] | null
  >(null);
  const throttledValue = useThrottle(sorted, 500);
  const { isNavigating, handleNavigate } = useFlipTransition();

  const getRank = (
    results: GetTopHundredResultsQuery["results"],
    newResult: Pick<FullResult, "seconds">,
  ) => {
    const allSeconds = results.map((r) => r.seconds);
    const rank = allSeconds.findIndex(
      (sec) => sec && newResult.seconds && sec > newResult.seconds,
    );
    return rank < 0 ? allSeconds.length + 1 : rank + 1;
  };

  useEffect(() => {
    if (newResultData?.result && allResultsData?.results && !rank) {
      const newRank = getRank(allResultsData?.results, newResultData.result);
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

      sortedResults &&
        setSorted(sortedResults as GetTopPageResultsQuery["results"]);
    } else if (data?.results && !sorted) {
      setSorted(data?.results.slice(0, 11));
    }
  }, [data?.results, rank, throttledValue, newResultData]);

  const startedFlipped = params?.get("flip") === "1";
  return (
    <Page
      classnames="results-page bg-purple-300"
      isNavigating={isNavigating}
      header={
        <div className="top-bar">
          <h1 className="page-heading">Best Results</h1>
          <HomeIconLink onNavigate={() => handleNavigate("/")} />
        </div>
      }
      main={
        // <motion.div

        //   initial={startedFlipped ? { opacity: 0.5 } : { opacity: 1 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 0.6, ease: [0.22, 0.96, 0.24, 1] }}>
        // {
        <ResultsGrid
          rank={rank ?? undefined}
          activeId={activeResultId}
          results={throttledValue ?? null}
          handleNavigate={handleNavigate}
          isNavigating={isNavigating}
          isLoading={loading}
        />
        // }
        // </motion.div>
      }
    />
  );
}
