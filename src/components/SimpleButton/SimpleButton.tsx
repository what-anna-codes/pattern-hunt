import { CardColors } from "@/src/ts/types";
import { ButtonHTMLAttributes, ReactNode } from "react";
import "./SimpleButton.css";

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
  return (
    <button
      type={type}
      className={`simple-button ${color} ${classNames}`}
      disabled={isDisabled}
      onClick={onClick}>
      {label}
    </button>
  );
}

export default SimpleButton;
