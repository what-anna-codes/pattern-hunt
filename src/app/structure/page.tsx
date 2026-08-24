"use client";

import { GameActions } from "./GameActions/GameActions";
import Card from "@/src/components/Card/Card";
import { CardStatuses } from "@/src/ts/types";
import { sampleCardIds } from "@/src/utils/deck";
import Page from "@/src/components/Page/Page";
import { CardFlip } from "@/src/components/CardFlip/CardFlip";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import "./StructurePage.css";
import { Suspense } from "react";

export default function StructurePage() {
  return (
    <Suspense fallback={null}>
      <StructurePageContent />
    </Suspense>
  );
}

export const StructurePageContent = () => {
  const { isNavigating, handleNavigate } = useFlipTransition();

  const content = sampleCardIds?.slice(0, 12).map((id: string, i: number) => {
    return (
      <CardFlip key={`structure-sample-card-${id}-${i}`} isExiting={isNavigating}>
        <Card
          handleClick={() => handleNavigate("/")}
          status={CardStatuses.Active}
          id={id}
        />
      </CardFlip>
    );
  });
  return <Page main={content} actions={<GameActions />} />;
}
