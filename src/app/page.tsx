"use client";

import Grid from "../components/Grid/Grid";
import { sampleCardIds } from "../utils/deck";
import Card from "../components/Card/Card";
import { Colors, CardStatuses } from "../ts/types";
import { CardLink } from "../components/CardLink/CardLink";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import { CardFlip } from "../components/CardFlip/CardFlip";
import ContainerPage from "../components/CardFlip/ContainerPage";

export default function Home() {
  const { isNavigating, handleNavigate, startedFlipped } = useFlipTransition();
  const handleHomeNavigate = (href: string) => handleNavigate(href);

  return (
    <ContainerPage classNames="home-page" isNavigating={isNavigating}>
      <div className="top-bar" />
      <div className="grid-wrapper">
        <Grid isExpanded={false}>
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


          <CardFlip isExiting={isNavigating}>
            <CardLink
              label="results"
              color={Colors.Purple}
              key="home__results"
              startedFlipped={startedFlipped}
              onNavigate={() => handleHomeNavigate("/results")}
            />
          </CardFlip>

          {sampleCardIds.slice(0, 10).map((id) => (
            <CardFlip
              key={`home-page_card_flip-${id}`}
              isExiting={isNavigating}>
              <Card id={id} status={CardStatuses.Disabled} animateInit={true} />
            </CardFlip>
          ))}
        </Grid>
      </div>
      <div className="bottom-bar" />
    </ContainerPage>
  );
}
