import { ReactNode } from "react";
import "./Grid.css";

interface Props {
  children: ReactNode;
}

function Grid({ children }: Props) {
  return (
    <div className="Grid">
      <div className="Grid__inner">{children}</div>
    </div>
  );
}

export default Grid;
