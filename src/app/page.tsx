"use client";
import Grid from "../components/Grid/Grid";
import { sampleCardIds } from "../utils/deck";
import Card from "../components/Card/Card";
import { CardColors, CardStatuses } from "../ts/types";
import { CardButton } from "../components/CardButton/CardButton";

export default function Home() {
  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-200 font-sans">
      <div className="top-bar" />
      <div className="grid-wrapper">
        <Grid>
          <CardButton href="/game" label="play" color={CardColors.Red} />
          <CardButton
            href="/results"
            label="results"
            color={CardColors.Purple}
          />
          {sampleCardIds.slice(0, 10).map((id) => (
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
