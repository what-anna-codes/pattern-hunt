"use client";
import { Status, GameStatuses, CardStatuses, CardColors } from "@/src/ts/types";
import "./GamePage.css";
import { generateDeck, checkAll, check } from "@/src/utils/deck";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { getVariants } from "@/src/app/game/GameUtils";
import Card from "@/src/components/Card/Card";
import Grid from "@/src/components/Grid/Grid";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import SaveResultForm from "@/src/components/SaveResultForm/SaveResultForm";
import Timer from "@/src/components/Timer/Timer";
import HomeIconLink from "@/src/components/HomeIconLink/HomeIconLink";
import SimpleButton from "@/src/components/SimpleButton/SimpleButton";
import { CardFlip } from "@/src/components/CardFlip/CardFlip";
import { containerFadeDelay, containerFadeDuration } from "@/src/utils/motion";

export default function GamePage() {
  const { Accepted, Active, Default, Rejected } = CardStatuses;

  const [deck, setDeck] = useState<Array<string>>([]);
  const [activeCards, setActiveCards] = useState<Array<string>>([]);
  const [visibleCards, setVisibleCards] = useState<Array<string>>([]);
  const [currentStatus, setCurrentStatus] = useState<Status>(Active);
  const [duration, setDuration] = useState<number | null>(0);
  const [gameStatus, setGameStatus] = useState(GameStatuses.Ready);
  const [possibleSet, setPossibleSet] = useState<string[] | boolean>(false);
  const [hintCount, setHintCount] = useState<number>(0);
  const size = useWindowSize();
  const params = useSearchParams();

  useEffect(() => {
    const seedParam = params?.get("seed");
    const seedNum = seedParam ? Number(seedParam) : undefined;
    let newDeck = generateDeck(seedNum);
    setDeck(newDeck.slice(12, 18));
    setVisibleCards(newDeck.slice(0, 12));
    setGameStatus(GameStatuses.On);
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatuses.On && deck.length < 1) {
      const setsPresent = checkAll(visibleCards);
      !setsPresent && setGameStatus(GameStatuses.Over);
    }
  }, [deck, gameStatus, visibleCards]);

  useEffect(() => {
    if (activeCards.length === 3 && currentStatus === Active) {
      const isSet = check(activeCards);
      setCurrentStatus(isSet ? Accepted : Rejected);
    }
  }, [activeCards, currentStatus]);

  const showHint = () => {
    Array.isArray(possibleSet) && setActiveCards(possibleSet);
    setHintCount((prev) => prev + 1);
  };

  const replaceCards = (cards: Array<string>) => {
    const newVisibleCards: string[] = [];
    const replacements = deck.slice(0, 3);

    if (replacements.length < 3) {
      removeCards(cards);
    } else {
      [...visibleCards].forEach((cardId) => {
        if (cards.includes(cardId)) {
          newVisibleCards.push(replacements[0]);
          replacements.splice(0, 1);
        } else {
          newVisibleCards.push(cardId);
        }
      });
    }
    setVisibleCards(newVisibleCards);
    setPossibleSet(false);
    setDeck(deck.slice(3));
    setActiveCards([]);
  };

  const addCards = () => {
    const newCards = [...visibleCards].concat(deck.slice(0, 3));
    setVisibleCards(newCards);
    setDeck(deck.slice(3));
  };

  const removeCards = (cards: Array<string>) => {
    const newVisibleCards = [...visibleCards].filter(
      (card) => !cards.includes(card),
    );
    setVisibleCards(newVisibleCards);
    setPossibleSet(false);
    setActiveCards([]);
  };

  const handleCardClick = (id: string) => {
    const newActiveCards = activeCards.includes(id)
      ? [...activeCards].filter((card) => card !== id)
      : [...activeCards, id];
    setActiveCards(newActiveCards);
  };

  useEffect(() => {
    if ([Accepted, Rejected].includes(currentStatus)) {
      setTimeout(() => {
        if (currentStatus === Accepted) {
          visibleCards.length <= 12 && deck.length > 1
            ? replaceCards(activeCards)
            : removeCards(activeCards);
        }
        setActiveCards([]);
        setCurrentStatus(Active);
      }, 800);
    }
  }, [currentStatus, deck, visibleCards]);

  useEffect(() => {
    if (
      !possibleSet &&
      visibleCards.length > 3 &&
      gameStatus !== GameStatuses.Over
    ) {
      const setsPresent = checkAll(visibleCards);
      if (!setsPresent) {
        addCards();
        possibleSet && setPossibleSet(false);
      } else {
        !possibleSet && setPossibleSet(setsPresent);
      }
    }
  }, [visibleCards, possibleSet, gameStatus]);

  const isOver = gameStatus === GameStatuses.Over;
  return (
    <main className="game-page">
      <motion.div
        layout
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.4 }}
        className="top-bar">
        {!isOver && (
          <Timer gameStatus={gameStatus} liftDuration={setDuration} />
        )}
        <HomeIconLink />
      </motion.div>
      <motion.div
        className="grid-wrapper"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: containerFadeDuration,
          delay: containerFadeDelay,
        }}>
        <Grid isExpanded={visibleCards?.length > 12}>
          {visibleCards?.map((id: string, i: number) => {
            const variants = getVariants(i, size?.width);
            return (
              <CardFlip key={`game-page_card_card-flip-${id}`}>
                <motion.div
                  className="CardWrapper"
                  variants={variants}
                  transition={{
                    duration: 1.5,
                    stiffness: 80,
                    damping: 16,
                    mass: 0.85,
                    delay: 1.5 - i * 0.08,
                    type: "tween",
                    ease: "circOut",
                  }}
                  animate={gameStatus}>
                  <Card
                    handleClick={() => handleCardClick(id)}
                    status={
                      isOver
                        ? CardStatuses.Disabled
                        : activeCards.includes(id)
                          ? currentStatus
                          : Default
                    }
                    id={id}
                  />
                </motion.div>
              </CardFlip>
            );
          })}
          {isOver && (
            <SaveResultForm hintCount={hintCount} duration={duration} />
          )}
        </Grid>
      </motion.div>
      <div className="bottom-bar">
        {!isOver && (
          <SimpleButton
            color={CardColors.Green}
            classNames="hint-button fixed bottom-3"
            onClick={showHint}
            label="hint"
          />
        )}
      </div>
    </main>
  );
}
