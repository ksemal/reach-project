import React from "react";

const alphabetArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0"
];
const Alphabet = props => {
  return (
    <>
      <ul className="horizontal-ul">
        {alphabetArray.map((letter, i) => {
          return (
            <li
              className={
                "letter " +
                (props.guessedLetters.includes(letter) &&
                props.word.includes(letter)
                  ? "correct"
                  : "") +
                (props.guessedLetters.includes(letter) &&
                !props.word.includes(letter)
                  ? "wrong"
                  : "")
              }
              key={i}
              onClick={() => props.onClick(letter)}
            >
              {letter}
            </li>
          );
        })}
      </ul>
      <p>{props.error}</p>
    </>
  );
};

export default Alphabet;
