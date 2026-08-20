"use client";
import { Suspense } from "react";
import "./StructurePage.css";
import { useWindowSize } from "@uidotdev/usehooks";

export default function StructurePage() {
  return (
    <Suspense fallback={null}>
      <StructurePageContent />
    </Suspense>
  );
}
export const HintButton = () => <button className="btn-cnt">hint</button>;
export const StructurePageContent = () => {
  const { height } = useWindowSize();
  return (
    <div className="page-cnt">
      <div className="top-cnt">top bar</div>
      <div className="center-cnt">
        <div className="cards-cnt">cards area</div>
        <div className="sidebar-cnt">
          {height && height < 500 ? <HintButton /> : "sidebar"}
        </div>
      </div>
      <div className="bottom-cnt">
        {height && height >= 500 ? <HintButton /> : "bottom bar"}
      </div>
    </div>
  );
};
