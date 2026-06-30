import { CardColors } from "@/src/ts/types";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import "./SimpleButton.css";
import { BeatLoader } from "react-spinners";

interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick: (par?: any) => void;
  classNames?: string;
  color: CardColors;
  isDisabled?: boolean;
  label: string | ReactNode;
}

function SimpleButton({
  classNames = "",
  onClick,
  color = CardColors.Purple,
  type = "button",
  isDisabled = false,
  label,
}: Props) {
  const [isProcessing, setProcessing] = useState(false);

  const handleClick = (e: any) => {
    setProcessing(true);
    onClick(e);
    setTimeout(() => {
      setProcessing(false);
    }, 700);
  };

  return (
    <button
      type={type}
      className={`simple-button flex items-center justify-center rounded-md h-9 lg:h-12 font-accent text-zinc-100  lowercase text-xl ${color} ${classNames}`}
      disabled={isProcessing || isDisabled}
      onClick={handleClick}>
      {isProcessing ? (
        <div className="simple-button__loader-cnt">
          <BeatLoader speedMultiplier={0.4} />
        </div>
      ) : (
        label
      )}
    </button>
  );
}

export default SimpleButton;
