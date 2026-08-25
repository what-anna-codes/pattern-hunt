"use client";

import { sampleCardIds } from "../utils/deck";
import Card from "../components/Card/Card";
import { Colors, CardStatuses } from "../ts/types";
import { CardLink } from "../components/CardLink/CardLink";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import { CardFlip } from "../components/CardFlip/CardFlip";
import Page from "../components/Page/Page";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}

export const HomePageContent = () => {
  const { isNavigating, handleNavigate, startedFlipped } = useFlipTransition();
  const handleHomeNavigate = (href: string) => handleNavigate(href);

  return (
    <Page
      main={
        <>
          <CardFlip isExiting={isNavigating}>
            <CardLink
              label="play"
              key="home__play"
              color={Colors.Red}
              isFlipped={isNavigating}
              startedFlipped={startedFlipped}
              onNavigate={() => handleHomeNavigate("/game")}
            />
          </CardFlip>



          {sampleCardIds.slice(0, 10).map((id, i) => (
            <CardFlip
              key={`home-sample-card-${id}-${i}`}
              isExiting={isNavigating}>
              <Card
                handleClick={() => handleNavigate("/")}
                status={CardStatuses.Disabled}
                id={id}
              />
            </CardFlip>
          ))}
          <CardFlip isExiting={isNavigating}>
            <CardLink
              label="results"
              color={Colors.Purple}
              key="home__results"
              startedFlipped={startedFlipped}
              onNavigate={() => handleHomeNavigate("/results")}
            />
          </CardFlip>
        </>
      }
    />
  );
}
