"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { getLayoutType, Layouts } from "./PageUtils";

import "./Page.css";
import HomeIconLink from "../HomeIconLink/HomeIconLink";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import ContainerPage from "../CardFlip/ContainerPage";
interface PageProps {
  header?: ReactNode
  main: ReactNode
  actions?: ReactNode
}
export default function Page({header, main, actions}: PageProps) {
  return (
    <Suspense fallback={null}>
      <PageContent header={header} main={main} actions={actions} />
    </Suspense>
  );
}

export const PageContent = ({header = null, main, actions = null}: PageProps) => {
  const { width, height } = useWindowSize();
  const calculatedType = getLayoutType(width, height);
  const [layoutType, setLayoutType] = useState<Layouts>();
 const { isNavigating } = useFlipTransition();

  useEffect(() => {
    if (calculatedType && (!layoutType || layoutType ! == calculatedType ))
      setLayoutType(calculatedType);
  }, [calculatedType]);

  return (
    <ContainerPage classNames="home-page" isNavigating={isNavigating}>
   <div className="page-cnt page-bg">
      <div className="top-cnt">{header}</div>
      <div className="center-cnt">
        <div className="cards-cnt">
          <div className="new-grid">
           {main}
          </div>
        </div>
        {layoutType === Layouts.MobileLandscape && (
          <div className="sidebar-cnt">
            {actions}
          </div>
        )}
      </div>
      <div className="bottom-cnt">
        {actions}
      </div>
    </div>
    </ContainerPage>
  );
};
