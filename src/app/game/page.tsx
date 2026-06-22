"use client"
import Link from "next/link";
import Grid from "../../components/Grid/Grid";
import { sampleCardIds } from "@/src/utils/deck";
import Card from "@/src/components/Card/Card";

export default function GamePage() {
  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-200 font-sans">
      <div className="top-bar">
        <Link href="/">
          <span>&#8962;</span>
        </Link>
        <span>13:01</span>
      </div>
      <div className="grid-wrapper">
        <Grid>
          {sampleCardIds.slice(0, 12).map((id) => (
            <Card id={id} key={"card-frame-" + id} handleClick={() => null} />
          ))}
        </Grid>
      </div>
      <div className="bottom-bar">hint</div>
    </main>
  );
}
