import { useEffect, Dispatch, SetStateAction } from "react";
import { useTimer } from "use-timer";

import TimeResult from "../TimeResult/TimeResult";
import {
  Colors,
  GameStatuses,
} from "../../ts/types";
import "./Timer.css";

interface Props {
  gameStatus: GameStatuses;
  liftDuration: Dispatch<SetStateAction<number | null>>;
  classNames?: string;
}

function Timer({ gameStatus, liftDuration, classNames }: Props) {
  const { time, start, pause, status } = useTimer({
    initialTime: 0,
  });

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    liftDuration(time);
  }, [time]);

  useEffect(() => {
    if (gameStatus === GameStatuses.Over) {
      pause();
    }
  }, [gameStatus]);

  return (
    <button
      className={`Timer ${Colors.Purple} ${classNames}`}
      disabled={status !== "RUNNING" && time !== 0}
      onClick={() => {
        pause();
        liftDuration(null);
      }}>
      <TimeResult duration={time} />
    </button>
  );
}

export default Timer;
