import Link from "next/link";
import CardFrame from "../components/CardFrame/CardFrame";
import Grid from "../components/Grid/Grid";
import { sampleCardIds } from "../utils/deck";

export default function Home() {
  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-700 font-sans">
      <div className="top-bar" />
      <div className="grid-wrapper">
        <Grid>
          <CardFrame>
            <Link href="/game">play</Link>
          </CardFrame>
          {sampleCardIds.slice(0, 11).map((id) => (
            <CardFrame key={"card-frame-" + id}>
              {id}
            </CardFrame>
          ))}
        </Grid>
      </div>
      <div className="bottom-bar" />
    </main>
  );
}
