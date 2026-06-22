"use client";
import { useQuery } from "@apollo/client";

import { ResultsDocument, ResultsQuery } from "@/src/__generated__/graphql";

import CardFrame from "@/src/components/CardFrame/CardFrame";
import Grid from "@/src/components/Grid/Grid";

import TimeResult from "@/src/components/TimeResult/TimeResult";

import { useSearchParams } from "next/navigation";
import HomeIconLink from "../../components/HomeIconLink/HomeIconLink";
import "./Results.css";

export default function ResultsPage() {
  const { data, loading } = useQuery<ResultsQuery>(ResultsDocument);
  const params = useSearchParams();
  const activeResultId = params.get("id");
  if (loading) return "Loading...";

  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-200 font-sans">
      <div className="top-bar">
        <HomeIconLink />
      </div>
      <div className="grid-wrapper">
        <Grid>
          {data &&
            data?.results.slice(0, 12).map(({ username, seconds, id }, i) => (
              <div
                className={`result_wrapper ${id === activeResultId ? "result-active" : ""}`}
                style={{
                  opacity: id === activeResultId ? 1 : (12 - i) * 0.07,
                }}
                key={"result-card-frame-" + id}>
                <CardFrame
                  classNames={`result ${id === activeResultId ? "result-active" : ""}`}>
                  <TimeResult classNames="seconds" duration={seconds} />
                  <span className="username">{username}</span>
                </CardFrame>
              </div>
            ))}
        </Grid>
      </div>
      <div className="bottom-bar" />
    </main>
  );
}
