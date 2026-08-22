"use client";
import { Suspense, useEffect, useState } from "react";
import "./StructurePage.css";
import { useWindowSize } from "@uidotdev/usehooks";
import { GameActions } from "./GameActions/GameActions";
import { getLayoutType, Layouts } from "./StructurePageUtils";
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

export const PageLayout = () => {

}

export const StructurePageContent = () => {
  const { width, height } = useWindowSize();
  const calculatedType = getLayoutType(width, height);
  const [layoutType, setLayoutType] = useState<Layouts>();

  useEffect(() => {
    if (calculatedType && (!layoutType || layoutType ! == calculatedType ))
      setLayoutType(calculatedType);
  }, [calculatedType]);

  return (
    <div className="page-cnt page-bg">
      <div className="top-cnt">header</div>
      <div className="center-cnt">
        <div className="cards-cnt">
          <div className="new-grid">
            {sampleCardIds?.slice(0, 12).map((id: string, i: number) => {
              return (
                <Card
                  key={`sample-card-${id}-${i}`}
                  handleClick={() => console.log(id)}
                  status={CardStatuses.Active}
                  id={id}
                />
                // <div className="new-card" key={`sample-card-${id}-${i}`}>
                //   {id.substring(0, 5)}
                // </div>
              );
            })}
          </div>
        </div>
        {layoutType === Layouts.MobileLandscape && (
          <div className="sidebar-cnt">
            <GameActions />
          </div>
        )}
      </div>
      <div className="bottom-cnt">
        {layoutType && layoutType !== Layouts.MobileLandscape ? (
          <GameActions />
        ) : (
          "bottom bar"
        )}
      </div>
    </div>
  );
};
