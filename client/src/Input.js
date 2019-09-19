import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    return (
      <div className="input">
        {this.props.type === "user" ? (
          <label>
            Enter your name here if you want to see yourself on the Leaderboard:
          </label>
        ) : null}

        {this.props.type === "word" ? (
          <label className="w-100">Try guess the whole word here:</label>
        ) : null}

        <input
          type="text"
          onChange={this.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />

        {this.props.type === "user" ? (
          <button onClick={() => this.props.onClickUser(this.state.input)}>
            Add new player
          </button>
        ) : null}

        {this.props.type === "word" ? (
          <button onClick={() => this.props.onClickWord(this.state.input)}>
            Check the word
          </button>
        ) : null}
      </div>
    );
  }
}

export default Input;
