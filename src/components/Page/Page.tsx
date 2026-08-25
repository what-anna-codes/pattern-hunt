"use client";
import { ReactNode, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { getLayoutType, Layouts } from "./PageUtils";
import ContainerPage from "../CardFlip/ContainerPage";
import "./Page.css";

interface PageProps {
  header?: ReactNode
  main: ReactNode
  actions?: ReactNode
  classnames?: string
  isNavigating?: boolean
  isGridExpanded?: boolean
  sidebar?: ReactNode | null
}

export default function Page({ sidebar = null, header = null, main, actions = null, classnames, isNavigating = false, isGridExpanded = false }: PageProps) {
  const { width, height } = useWindowSize();
  const calculatedType = getLayoutType(width, height);
  const [layoutType, setLayoutType] = useState<Layouts>();
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (calculatedType && (!layoutType || layoutType! == calculatedType))
      setLayoutType(calculatedType);
  }, [calculatedType]);

  useEffect(() => {
    if (isGridExpanded !== isExpanded) {
      setIsExpanded(isGridExpanded);
    }
  }, [isGridExpanded]);

  return (
    <ContainerPage classNames={classnames = ""} isNavigating={isNavigating}>
      <div className="page-cnt page-bg">
        <div className="top-cnt p-2 flex justify-start">{header}</div>
        <div className="center-cnt">
          <div className="cards-cnt">
            <div className={`new-grid ${isExpanded ? "expanded" : ""}`}>
              {main}
            </div>
          </div>
          {sidebar && <div className="sidebar-cnt">
            {sidebar}
          </div>}
        </div>
        <div className="bottom-cnt">
          {actions}
        </div>
      </div>
    </ContainerPage>
  );
};
