import React from "react";

const Diagram = props => {
  return (
    <img
      src={"/img/" + props.guesses + ".jpg"}
      alt={"Diagram: " + props.guesses + "guesses left"}
    />
  );
};

export default Diagram;
