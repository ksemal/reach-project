import React from "react";

const ScoreBoard = props => {
  return (
    <div className="scoreboard">
      <p className="subheader">Scoreboard:</p>
      <p>
        {props.userName || "You"}:{" "}
        <span className="score-number">{props.wins}</span>
      </p>
      <p>
        Computer: <span className="score-number">{props.losses}</span>
      </p>
      <p>
        Number of guesses left:{" "}
        <span className="score-number">{props.guesses}</span>
      </p>
    </div>
  );
};

export default ScoreBoard;
