import "./GameActions.css";
export const GameActions = () => (
  <div className="actions-cnt">
    <button className="btn-cnt">hint</button>
    <button
      className="timer-cnt"
      style={{ filter: "grayscale(80%) opacity(60%)" }}>
      {" "}
      13:02 &#9208;{" "}
    </button>
  </div>
);
