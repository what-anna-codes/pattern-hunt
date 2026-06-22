"use client";
import Link from "next/link";
import { Status, GameStatuses, CardStatuses } from "@/src/ts/types";
import { generateDeck, checkAll, check } from "@/src/utils/deck";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { getVariants } from "@/src/app/game/GameUtils";
import Card from "@/src/components/Card/Card";
import Grid from "@/src/components/Grid/Grid";
import { motion } from "motion/react";

export default function GamePage() {
  const { Accepted, Active, Default, Rejected } = CardStatuses;

  const [deck, setDeck] = useState<Array<string>>([]);
  const [activeCards, setActiveCards] = useState<Array<string>>([]);
  const [visibleCards, setVisibleCards] = useState<Array<string>>([]);
  const [currentStatus, setCurrentStatus] = useState<Status>(Active);
  const [duration, setDuration] = useState<number | null>(0);
  const [gameStatus, setGameStatus] = useState(GameStatuses.Ready);
  const [possibleSet, setPossibleSet] = useState<string[] | boolean>(false);
  const size = useWindowSize();

  useEffect(() => {
    let newDeck = generateDeck();
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
    if (!possibleSet && visibleCards.length > 3) {
      const setsPresent = checkAll(visibleCards);
      if (!setsPresent) {
        addCards();
        possibleSet && setPossibleSet(false);
      } else {
        !possibleSet && setPossibleSet(setsPresent);
      }
    }
  }, [visibleCards, possibleSet]);

  return (
    <main className="h-screen w-screen max-w-screen overflow-hidden bg-zinc-200 font-sans">
      <div className="top-bar">
        <Link href="/">
          <span>&#8962;</span>
        </Link>
        <span>{duration}</span>
      </div>
      <div className="grid-wrapper">
        <Grid>
          {visibleCards?.map((id: string, i: number) => {
            const variants = getVariants(i, size?.width);
            return (
              <motion.div
                key={`motion-card-${id}`}
                className="CardWrapper"
                variants={variants}
                exit={gameStatus}
                animate={gameStatus}>
                <Card
                  handleClick={() => handleCardClick(id)}
                  status={activeCards.includes(id) ? currentStatus : Default}
                  id={id}
                />
              </motion.div>
            );
          })}
        </Grid>
      </div>
      <button className="bottom-bar hint-button" onClick={showHint}>
        hint
      </button>
    </main>
  );
}
