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
  classnames?: string
  isNavigating?: boolean
}
export default function Page(props: PageProps) {
  return (
    <Suspense fallback={null}>
      <PageContent {...props} />
    </Suspense>
  );
}

export const PageContent = ({header = null, main, actions = null, classnames, isNavigating = false}: PageProps) => {
  const { width, height } = useWindowSize();
  const calculatedType = getLayoutType(width, height);
  const [layoutType, setLayoutType] = useState<Layouts>();

  useEffect(() => {
    if (calculatedType && (!layoutType || layoutType ! == calculatedType ))
      setLayoutType(calculatedType);
  }, [calculatedType]);

  return (
    <ContainerPage classNames={classnames = ""} isNavigating={isNavigating}>
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
