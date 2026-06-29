"use client";

import "./Results.css";
import { useEffect, useState } from "react";
import ResultsGrid from "./ResultsGrid/ResultsGrid";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ResultsQuery,
  ResultsDocument,
  ResultDocument,
  ResultQuery,
} from "@/src/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useThrottle } from "@uidotdev/usehooks";
import HomeIconLink from "@/src/components/HomeIconLink/HomeIconLink";
import Loader from "../../components/Loader/Loader";

export default function ResultsPage() {
  const params = useSearchParams();
  const activeResultId = params.get("id");
  const { data, loading } = useQuery<ResultsQuery>(ResultsDocument);
  const { data: newResultData } = useQuery<ResultQuery>(ResultDocument, {
    variables: { id: activeResultId },
    skip: !activeResultId,
  });

  const [sorted, setSorted] = useState<ResultsQuery["results"] | null>(null);
  const throttledValue = useThrottle(sorted, 500);

  useEffect(() => {
    if (activeResultId && data?.results && newResultData && throttledValue) {
      const isIncluded = data.results
        .slice(0, 11)
        .some((el) => el.id === activeResultId);

      let sortedResults = !isIncluded
        ? [...data.results.slice(0, 10), newResultData.result].toSorted(
            (a, b: any) => Number(a?.seconds) - Number(b?.seconds),
          )
        : data.results.slice(0, 11);

      sortedResults && setSorted(sortedResults as ResultsQuery["results"]);
    } else if (data?.results && !sorted) {
      setSorted(data?.results.slice(0, 11));
    }
  }, [data, throttledValue, newResultData]);

  const startedFlipped = params?.get("flip") === "1";
  return (
    <main className="main results-page">
      <div className="top-bar">
        <h1 className="page-heading">Best Results</h1>
        <HomeIconLink />
      </div>
      <motion.div
        className="grid-wrapper"
        initial={startedFlipped ? { opacity: 0.5 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.96, 0.24, 1] }}>
        {data?.results && !loading && throttledValue ? (
          <ResultsGrid activeId={activeResultId} results={throttledValue} />
        ) : (
          <Loader text={"Loading results..."} />
        )}
      </motion.div>
      <div className="bottom-bar" />
    </main>
  );
}
