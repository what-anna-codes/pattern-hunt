"use client";
import Link from "next/link";
import CardFrame from "../components/CardFrame/CardFrame";
import Grid from "../components/Grid/Grid";
import { sampleCardIds } from "../utils/deck";
import Card from "../components/Card/Card";
import { CardStatuses } from "../ts/types";

export default function Home() {
  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-200 font-sans">
      <div className="top-bar" />
      <div className="grid-wrapper">
        <Grid>
          <CardFrame>
            <Link href="/game">play</Link>
          </CardFrame>
          {sampleCardIds.slice(0, 11).map((id) => (
            <Card
              id={id}
              status={CardStatuses.Disabled}
              key={"card-frame-" + id}
              handleClick={() => null}
            />
          ))}
        </Grid>
      </div>
      <div className="bottom-bar" />
    </main>
  );
}
