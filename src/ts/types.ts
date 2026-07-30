import { ReactNode } from "react";
import { Result } from "../__generated__/graphql";

enum Colors {
    Green = 'green',
    Red = 'red',
    Purple = 'purple'
}

enum Shapes {
    Diamond = 'diamond',
    Squiggle = 'squiggle',
    Stadium = 'stadium',
}

enum Fills {
    Blank = 'blank',
    Gradient = 'gradient',
    Full = 'full'
}

enum Counts { One = 1, Two = 2, Three = 3 }

enum FeatureNames {
    Color = 'color',
    Shape = 'shape',
    Fill = 'fill',
    Count = 'count'
}

enum CardStatuses {
    Default = 'default',
    Active = 'active',
    Accepted = 'accepted',
    Rejected = 'rejected',
    Disabled = 'disabled',
    Coloured = 'coloured',
    Learn = 'learn'
}

enum GameStatuses {
    Ready = "isReady",
    On = "isOn",
    Over = "isOver",
}

type Features = {
    color: Array<Colors>,
    shape: Array<Shapes>,
    fill: Array<Fills>,
    count: Array<Counts>
}

type FullResult = Pick<Result, 'id' | 'username' | 'seconds' | 'createdAt'>;

interface Card {
    id: string;
    status?: CardStatuses;
    children?: ReactNode;
    handleClick?: (e: any) => void;
    classNames?: string
    animateInit?: boolean
    style?: React.CSSProperties
}

export type { Features, FullResult, Card };
export { Colors, Fills, Counts, Shapes, FeatureNames, CardStatuses, GameStatuses };
