import Link from "next/link";
import CardFrame from "../CardFrame/CardFrame";
import { CardColors } from "@/src/ts/types";
import { ReactNode } from "react";
"./CardButton.css";

interface Props {
  label: string | ReactNode;
  disabled?: boolean;
  href?: string;
  color: CardColors;
}
export function CardButton({ label, disabled = false, href, color }: Props) {
  const content = (
    <CardFrame classNames={"CardButton " + color}>{label}</CardFrame>
  );
  if (href)
    return (
      <Link href={href} className={`CardButton ${color}`}>
        {content}
      </Link>
    );
  return (
    <button className={`CardButton ${disabled ? "disabled" : ""} ${color}`}>
      {content}
    </button>
  );
}
