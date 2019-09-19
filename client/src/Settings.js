import React from "react";

const Settings = props => {
  return (
    <div className="settings">
      <p>Select the difficulty level:</p>
      <select onChange={props.onChangeDifficulty}>
        <option value="3">Easy</option>
        <option value="6">Medium</option>
        <option value="10">Hard</option>
      </select>

      <p>Select word or phrase:</p>
      <select onChange={props.onChangeType}>
        <option value="word">Word</option>
        <option value="phrase">Phrase</option>
      </select>
    </div>
  );
};

export default Settings;
