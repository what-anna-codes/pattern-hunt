"use client";
import { Suspense } from "react";
import "./StructurePage.css";
import { useWindowSize } from "@uidotdev/usehooks";
import { GameActions } from "./GameActions/GameActions";
import { getLayoutType } from "./StructurePageUtils";
import Card from "@/src/components/Card/Card";
import { CardStatuses } from "@/src/ts/types";
import { sampleCardIds } from "@/src/utils/deck";
import Grid from "@/src/components/Grid/Grid";

export default function StructurePage() {
  return (
    <Suspense fallback={null}>
      <StructurePageContent />
    </Suspense>
  );
}

export const StructurePageContent = () => {
  const { width, height } = useWindowSize();
  const { portrait, desktop, mobileLandscape } = getLayoutType(width, height);

  return (
    <div className="page-cnt">
      <div className="top-cnt">header</div>
      <div className="center-cnt">
        <div className="cards-cnt">
          <Grid classNames="z-10" isExpanded={false}>
            {sampleCardIds?.slice(0, 12).map((id: string, i: number) => {
              return (
                <Card
                  handleClick={() => console.log(id)}
                  status={CardStatuses.Active}
                  id={id}
                />
              );
            })}
          </Grid>
        </div>
        <div className="sidebar-cnt">
          {mobileLandscape ? <GameActions /> : "sidebar"}
        </div>
      </div>
      <div className="bottom-cnt">
        {portrait || desktop ? <GameActions /> : "bottom bar"}
      </div>
    </div>
  );
};
