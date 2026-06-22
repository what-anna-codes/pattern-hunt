import { getMinutes, getSeconds, padStart } from "../../utils/time";
import "./TimeResult.css";

interface Props {
  duration?: number | null;
  classNames?: string;
}

function TimeResult({ duration = 0, classNames }: Props) {
  if (!duration && typeof duration !== "number") {
    return null;
  }
  const minutes = getMinutes(duration);
  const seconds = getSeconds(duration);

  return (
    <div className={`TimeResult ${classNames}`}>
      <span className="TimeResult_section">{padStart(minutes)}</span>
      <span className="TimeResult_divider">:</span>
      <span className="TimeResult_section">{padStart(seconds)}</span>
    </div>
  );
}

export default TimeResult;
