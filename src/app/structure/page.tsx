"use client";
import { Suspense } from "react";
import "./StructurePage.css";
import { useWindowSize } from "@uidotdev/usehooks";
import { GameActions } from "./GameActions/GameActions";
import { getLayoutType } from "./StructurePageUtils";

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
        <div className="cards-cnt">cards area</div>
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
