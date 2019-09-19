import React from "react";

const LeaderBoard = props => {
  return (
    <div>
      <table>
        <caption className="subheader">LeaderBoard</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.leaderBoard).map((member, i) => {
            return (
              <tr key={i}>
                <td>{member}</td>
                <td>{props.leaderBoard[member]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
