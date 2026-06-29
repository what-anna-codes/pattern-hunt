import { ReactNode } from "react";
import { Result } from "../__generated__/graphql";

export enum CardColors {
    Green = 'green',
    Red = 'red',
    Purple = 'purple'
}

export enum CardShapes {
    Diamond = 'diamond',
    Squiggle = 'squiggle',
    Stadium = 'stadium',
}


export enum CardFills {
    Blank = 'blank',
    Gradient = 'gradient',
    Full = 'full'
}

export enum CardStatuses {
    Default = 'default',
    Active = 'active',
    Accepted = 'accepted',
    Rejected = 'rejected',
    Disabled = 'disabled',
    Coloured = 'coloured'
}

export enum GameStatuses {
  Ready = "isReady",
  On = "isOn",
  Ending = "isEnding",
  Over = "isOver",
}

type Color = CardColors.Green | CardColors.Red | CardColors.Purple;
type Shape = CardShapes.Diamond | CardShapes.Squiggle | CardShapes.Stadium;
type Fill = CardFills.Blank | CardFills.Full | CardFills.Gradient;
type Count = 1 | 2 | 3;
type Status = CardStatuses.Default | CardStatuses.Accepted | CardStatuses.Active | CardStatuses.Rejected | CardStatuses.Disabled;
type GameStatus = GameStatuses
type FeatureNames = 'color' | 'shape' | 'fill' | 'count';
type FullResult = Pick<Result, 'id' | 'username' | 'seconds' | 'createdAt'>;

type Features = {
    color: Array<Color>,
    shape: Array<Shape>,
    fill: Array<Fill>,
    count: Array<Count>
}

type ICard = {
    id: string;
    status?: Status;
    children?: ReactNode;
    handleClick?: (e: any) => void;
    classNames?: string
    animateInit?: boolean
}

export type { Color, Shape, Features, FeatureNames, Fill, FullResult, Count, Status, GameStatus, ICard };
