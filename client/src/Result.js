import React from "react";

const Result = props => {
  return (
    <div>
      <p>Game over - You {props.endGame}!</p>
      <button className="restart" onClick={props.onClick}>
        Restart
      </button>
    </div>
  );
};

export default Result;
