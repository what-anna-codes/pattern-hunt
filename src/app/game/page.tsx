import Link from "next/link";
import CardFrame from "../../components/CardFrame/CardFrame";
import Grid from "../../components/Grid/Grid";
import { sampleCardIds } from "@/src/utils/deck";

export default function GamePage() {
  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-700 font-sans">
      <div className="top-bar">
        <Link href="/">
          <span>&#8962;</span>
        </Link>
        <span>13:01</span>
      </div>
      <div className="grid-wrapper">
        <Grid>
          {sampleCardIds.slice(0, 12).map((id) => (
            <CardFrame key={"card-frame-" + id}>{id}</CardFrame>
          ))}
        </Grid>
      </div>
      <div className="bottom-bar">hint</div>
    </main>
  );
}
