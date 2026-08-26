"use client";

import { Suspense, useEffect, useState } from "react";
import ResultsGrid from "./ResultsGrid/ResultsGrid";
import { useSearchParams } from "next/navigation";
import {
  GetTopPageResultsQuery,
  useGetBetterResultsQuery,
  useGetResultQuery,
  useGetTopPageResultsQuery,
} from "@/src/__generated__/types";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import Page from "@/src/components/Page/Page";
import "./Results.css";

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsPageContent />
    </Suspense>
  );
}

export const ResultsPageContent = () => {
  const params = useSearchParams();
  const activeResultId = params.get("id");
  const { data, loading } = useGetTopPageResultsQuery();
  const { data: newResultData } = useGetResultQuery({
    variables: { id: activeResultId ?? "" },
    skip: !activeResultId,
  });
  const { data: allResultsData } = useGetBetterResultsQuery({
    variables: { newResultSeconds: newResultData?.result?.seconds ?? 0 },
    skip: !activeResultId
  });
  const [rank, setRank] = useState<number | null>(null);
  const [sorted, setSorted] = useState<
    GetTopPageResultsQuery["results"] | null
  >(null);
  const { isNavigating, handleNavigate } = useFlipTransition();


  useEffect(() => {
    if (!sorted && data?.results) {
      setSorted(data.results.slice(0, 10));
    }
  }, [sorted, data?.results]);

  useEffect(() => {
    if (!rank && allResultsData) {
      const betterResultsCount = allResultsData?.resultsConnection.aggregate.betterResultsCount;
      setRank(betterResultsCount);
    }
  }, [allResultsData, rank])
  useEffect(() => {
    if (newResultData?.result) {
      if (sorted && sorted.length < 11 && !sorted.find(item => item.id === activeResultId)) {
        const newSorted = [...sorted, newResultData.result].toSorted(
          (a, b: any) => Number(a?.seconds) - Number(b?.seconds),
        );
        setSorted(newSorted as GetTopPageResultsQuery["results"]);
      }
    }
  }, [sorted, newResultData])

  return (
    <Page
      classnames="results-page bg-purple-300"
      isNavigating={isNavigating}
      header={
        <h1 className="page-heading text-md uppercase font-light tracking-widest">best scores: the top ten</h1>
      }
      main={
        <ResultsGrid
          rank={rank ?? undefined}
          activeId={activeResultId}
          results={sorted ?? null}
          handleNavigate={handleNavigate}
          isNavigating={isNavigating}
          isLoading={loading} />
      }
    />
  );
}
