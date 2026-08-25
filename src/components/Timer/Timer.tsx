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
  duration?: number;
}

function Timer({ gameStatus, liftDuration, classNames, duration }: Props) {
  const { time, start, pause, status } = useTimer({
    initialTime: duration ?? 0,
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
    <div
      className={`Timer ${Colors.Purple} ${classNames}`}
      onClick={() => {
        pause();
        liftDuration(null);
      }}>
      <TimeResult duration={time} />
    </div>
  );
}

export default Timer;
