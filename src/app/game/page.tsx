"use client";
import { GameStatuses, CardStatuses, Colors } from "@/src/ts/types";
import { generateDeck, check, findAll } from "@/src/utils/deck";
import { useWindowSize } from "@uidotdev/usehooks";
import { Suspense, useState, useEffect } from "react";
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
// import { containerFadeDelay, containerFadeDuration } from "@/src/utils/motion";
import { useFlipTransition } from "@/src/hooks/useFlipTransition";
import "./GamePage.css";
import {
  CreateGameMutationResult,
  useCreateGameMutation,
  useCreateMoveMutation,
} from "@/src/__generated__/types";
import Page from "@/src/components/Page/Page";

export default function GamePage() {
  return (
    <Suspense fallback={null}>
      <GamePageContent />
    </Suspense>
  );
}

function GamePageContent() {
  const { Accepted, Active, Default, Rejected } = CardStatuses;
  const { isNavigating, handleNavigate } = useFlipTransition();
  const [deck, setDeck] = useState<Array<string>>([]);
  const [boardSize, setBoardSize] = useState(12);
  const [selectedCards, setSelectedCards] = useState<Array<string>>([]);
  const [selectedCardsStatus, setSelectedCardsStatus] =
    useState<CardStatuses>(Active);
  const [setsInView, setSetsInView] = useState<string[][]>([]);
  const [duration, setDuration] = useState<number | null>(0);
  const [gameStatus, setGameStatus] = useState(GameStatuses.Over);
  const [hintCount, setHintCount] = useState<number>(0);
  const size = useWindowSize();
  const params = useSearchParams();
  const visibleCards = deck.slice(0, boardSize);
  const [gameId, setGameId] = useState("");
  const [moveOrdinal, setMoveOrdinal] = useState(0);
  const [addMove] = useCreateMoveMutation();
  const [createGame] = useCreateGameMutation({
    variables: { data: { key: params?.get("seed") } },
    onCompleted: (data: CreateGameMutationResult["data"]) =>
      data?.createGame?.id && setGameId(data.createGame.id),
  });

  useEffect(() => {
    const seedParam = params?.get("seed");
    const seedNum = seedParam ? Number(seedParam) : undefined;
    let newDeck = generateDeck(seedNum);
    setDeck(newDeck);
    setGameStatus(GameStatuses.On);
  }, []);

  useEffect(() => {
    !gameId &&
      createGame({
        variables: { data: { key: params?.get("seed") } },
        onCompleted: (data: CreateGameMutationResult["data"]) =>
          data?.createGame?.id && setGameId(data.createGame.id),
      });
  }, [gameId]);

  useEffect(() => {
    if (
      gameStatus === GameStatuses.On &&
      deck.length > boardSize &&
      !setsInView.length
    ) {
      const cardsOnBoard = deck.slice(0, boardSize);
      const newSetsInView = findAll(cardsOnBoard);
      setSetsInView(newSetsInView);
      newSetsInView.length === 0 && addCards();
    }
  }, [gameStatus, deck, boardSize, setsInView]);

  useEffect(() => {
    if (gameStatus === GameStatuses.On && deck.length <= boardSize) {
      const setsPresent = findAll(deck);
      !setsPresent.length && setGameStatus(GameStatuses.Over);
    }
  }, [deck, gameStatus, setsInView]);

  useEffect(() => {
    if (selectedCards.length === 3 && selectedCardsStatus === Active) {
      const isValid = check(selectedCards);
      const triplets = setsInView.map((set) => ({ cardId: set }));
      addMove({
        variables: {
          data: {
            ordinal: moveOrdinal,
            cardsSelected: { create: { cardId: selectedCards } },
            setsVisible: { create: triplets },
            boardSize,
            isValid,
            game: { connect: { id: gameId } },
            timestamp: Date.now().toString(),
          },
        },
      });
      setMoveOrdinal(moveOrdinal + 1);
      setSelectedCardsStatus(isValid ? Accepted : Rejected);
    }
  }, [moveOrdinal, boardSize, selectedCards, selectedCardsStatus]);

  const showHint = () => {
    setsInView.length > 0 ? setSelectedCards(setsInView[0]) : addCards();
    setHintCount((prev) => prev + 1);
  };

  const replaceCards = (cards: Array<string>) => {
    const newDeck: string[] = [...deck];
    const replacements = deck.slice(boardSize, boardSize + 3);
    cards.forEach((replacedCard, i) => {
      const index = deck.indexOf(replacedCard);
      newDeck.splice(index, 1, replacements[i]);
      const replacementIndex = newDeck.lastIndexOf(replacements[i]);
      newDeck.splice(replacementIndex, 1);
    });

    setDeck(newDeck);
    setSelectedCards([]);
    setSetsInView([]);
  };

  const addCards = () => {
    setBoardSize(boardSize + 3);
  };

  const removeCards = (cards: Array<string>) => {
    const newDeck = [...deck].filter((card) => !cards.includes(card));
    setDeck(newDeck);
    setBoardSize(boardSize - 3);
  };

  const handleCardClick = (id: string) => {
    const newSelectedCards = selectedCards.includes(id)
      ? [...selectedCards].filter((card) => card !== id)
      : [...selectedCards, id];
    setSelectedCards(newSelectedCards);
  };

  useEffect(() => {
    if ([Accepted, Rejected].includes(selectedCardsStatus)) {
      setTimeout(() => {
        if (selectedCardsStatus === Accepted) {
          visibleCards.length <= 12 && deck.length > visibleCards.length
            ? replaceCards(selectedCards)
            : removeCards(selectedCards);
        }
        setSelectedCards([]);
        setSelectedCardsStatus(Active);
      }, 800);
    }
  }, [selectedCardsStatus, deck, visibleCards]);

  const isOver = gameStatus === GameStatuses.Over;

  return (
    <Page
      classnames="game-page"
      isNavigating={isNavigating}
      header={
        <motion.div
          layout
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0, duration: 0.4 }}
          className="top-bar">
          <span style={{ paddingInline: "1rem" }}>
            sets in sight: {setsInView.length}
          </span>
          <span style={{ paddingInline: "1rem" }}>
            cards remaining: {deck.length}
          </span>
          {!isOver && (
            <Timer gameStatus={gameStatus} liftDuration={setDuration} />
          )}
          <HomeIconLink onNavigate={() => handleNavigate("/")} />
        </motion.div>
      }
      main={
        // <motion.div
        //       className="grid-wrapper"
        //       initial={{ opacity: 0.6 }}
        //       animate={{ opacity: 1 }}
        //       transition={{
        //         duration: containerFadeDuration,
        //         delay: containerFadeDelay,
        //       }}>
        <>
          {visibleCards?.map((id: string, i: number) => {
            const variants = getVariants(i, size?.width);
            return (
              <CardFlip
                key={`game-page_card_card-flip-${id}-${i}`}
                isExiting={isNavigating}>
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
                  style={{ width: "100%", height: "100%" }}
                  animate={gameStatus}>
                  <Card
                    handleClick={() => handleCardClick(id)}
                    status={
                      isOver
                        ? CardStatuses.Disabled
                        : selectedCards.includes(id)
                          ? selectedCardsStatus
                          : Default
                    }
                    id={id}
                  />
                </motion.div>
              </CardFlip>
            );
          })}
          {isOver === true && (
            <SaveResultForm
              seed={Number(params.get("seed"))}
              gameId={gameId}
              hintCount={hintCount}
              duration={duration}
            />
          )}
        </>
        // </motion.div>
      }
      actions={
        isOver ? null : (
          <SimpleButton
            color={Colors.Green}
            classNames="hint-button fixed bottom-3"
            onClick={showHint}
            label="hint"
          />
        )
      }
    />
  );
}
