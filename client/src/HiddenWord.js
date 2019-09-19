import React from "react";

const HiddenWord = props => {
  console.log(props);
  return (
    <ul className="horizontal-ul word">
      {props.word.map((letter, i) => {
        if (props.endGame === "win" && letter !== " ") {
          return (
            <li className={"hidden-word-" + props.endGame} key={i}>
              {letter}
            </li>
          );
        } else if (props.endGame === "lose" && letter !== " ") {
          return (
            <li className={"hidden-word-" + props.endGame} key={i}>
              {letter}
            </li>
          );
        } else if (letter === " ") {
          return (
            <li key={i} className="space">
              {" "}
            </li>
          );
        } else {
          if (props.guessedLetters.includes(letter)) {
            return (
              <li className="hidden-word" key={i}>
                {letter}
              </li>
            );
          } else {
            return <li key={i}>_</li>;
          }
          // return props.guessedLetters.includes(letter) ? (
          //   <li className="hidden-word" key={i}>
          //     {letter}
          //   </li>
          // ) : (
          //   <li key={i}>_</li>
          // );
        }
      })}
    </ul>
  );
};

export default HiddenWord;
