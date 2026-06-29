"use client";
import { motion } from "motion/react";
import Grid from "../components/Grid/Grid";
import { sampleCardIds } from "../utils/deck";
import Card from "../components/Card/Card";
import { CardColors, CardStatuses } from "../ts/types";
import { CardLink } from "../components/CardLink/CardLink";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import { CardFlip } from "../components/CardFlip/CardFlip";

export default function Home() {
  const { isNavigating, handleNavigate, startedFlipped } = useFlipTransition();
  const handleHomeNavigate = (href: string) => handleNavigate(href);

  return (
    <motion.main
      className="main home-page relative overflow-hidden"
      animate={
        isNavigating
          ? { opacity: 0.88, scale: 0.995 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 0.8] }}>
      <div className="top-bar" />
      <div className="grid-wrapper">
        <Grid isExpanded={false}>
          <CardFlip>
            <CardLink
              label="play"
              key="home__play"
              color={CardColors.Red}
              isFlipped={isNavigating}
              startedFlipped={startedFlipped}
              onNavigate={() => handleHomeNavigate("/game")}
            />
          </CardFlip>
          <CardFlip>
            {" "}
            <CardLink
              label="learn"
              key="home__learn"
              color={CardColors.Green}
              isFlipped={isNavigating}
              startedFlipped={startedFlipped}
              onNavigate={() => handleHomeNavigate("/learn")}
            />
          </CardFlip>
          <CardFlip>
            <CardLink
              label="results"
              color={CardColors.Purple}
              key="home__results"
              isFlipped={isNavigating}
              startedFlipped={startedFlipped}
              onNavigate={() => handleHomeNavigate("/results")}
            />
          </CardFlip>

          {sampleCardIds.slice(0, 9).map((id) => (
            <CardFlip key={`home-page_card_flip-${id}`}>
              <Card id={id} status={CardStatuses.Disabled} animateInit={true} />
            </CardFlip>
          ))}
        </Grid>
      </div>
      <div className="bottom-bar" />
    </motion.main>
  );
}
