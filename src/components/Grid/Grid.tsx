import { ReactNode } from "react";
import "./Grid.css";

interface Props {
  children: ReactNode;
  isExpanded?: boolean;
  classNames?: string;
}

function Grid({ children, isExpanded = false, classNames = "" }: Props) {
  return (


    <div className={`Grid ${isExpanded ? 'expanded' : ''}  `}>
      <div className={`Grid__inner ${classNames}`}>{children}</div>
 </div>


  );
}

export default Grid;
