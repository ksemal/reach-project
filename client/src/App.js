import React from "react";
import API from "./utils/API";

import Header from "./Header";
import HiddenWord from "./HiddenWord";
import Alphabet from "./Alphabet";
import ScoreBoard from "./ScoreBoard";
import Result from "./Result";
import Settings from "./Settings";
import Input from "./Input";
import LeaderBoard from "./LeaderBoard";
import Diagram from "./Diagram";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 3,
      type: "word",
      wins: 0,
      losses: 0,
      leaderBoard: {}
    };
  }

  componentDidMount() {
    this.getWord(this.state.difficulty, this.state.type);

    this.addEventListener();
  }

  componentDidUpdate() {
    console.log(this.state.leaderBoard);
  }
  componentWillUnmount() {
    this.removeEventListener();
  }

  addEventListener = () => {
    document.addEventListener("keydown", this.handleKeyDown);
  };

  removeEventListener = () => {
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  getWord(difficulty, type) {
    API.getWords(difficulty, type)
      .then(response => {
        let oneWordArray = response.data.split("");
        this.setState({
          word: oneWordArray,
          guessedLetters: [],
          guesses: 6,
          endGame: null,
          difficulty: difficulty,
          type: type,
          name: null
        });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  checkWord = word => {
    if (!word) {
      this.setState({
        error: "Please, enter a valid word"
      });
      return;
    }
    if (this.state.error)
      this.setState({
        error: null
      });
    let trimWord = word.trim();
    let wordToArr = trimWord.split("");
    let removeDublicates = wordToArr.filter((item, index) => {
      return wordToArr.indexOf(item) >= index;
    });
    if (trimWord === this.state.word.join("")) {
      this.updateGuesses(0, removeDublicates);
    } else {
      this.updateGuesses(-1, removeDublicates);
    }
  };

  checkLetter = letter => {
    if (this.state.guessedLetters.includes(letter)) return;

    if (this.state.error) this.setState({ error: null });

    let incrementor = 0;
    if (!this.state.word.includes(letter)) incrementor = -1;

    this.updateGuesses(incrementor, letter);
  };

  updateGuesses = (incrementor, letter) => {
    if (!Array.isArray(letter)) {
      letter = [letter];
    }

    this.setState(
      prevState => {
        return {
          guesses: prevState.guesses + incrementor,
          guessedLetters: [...this.state.guessedLetters, ...letter]
        };
      },
      () => {
        this.checkWinningCondition();
      }
    );
  };

  handleKeyDown = event => {
    const letterNumber = /^[0-9a-zA-Z]+$/;

    if (String.fromCharCode(event.keyCode).match(letterNumber)) {
      this.checkLetter(String.fromCharCode(event.keyCode).toLowerCase());
    } else {
      this.setState({ error: "Please, use letters and numbers only!" });
    }
  };

  checkWinningCondition = () => {
    let removeDublicates = this.state.word.filter((item, index) => {
      return this.state.word.indexOf(item) >= index;
    });

    removeDublicates = removeDublicates
      .sort()
      .join("")
      .replace(/\s/g, "");

    let removeWrongLetters = this.state.guessedLetters.filter(item => {
      return this.state.word.includes(item);
    });
    removeWrongLetters = removeWrongLetters
      .sort()
      .join("")
      .replace(/\s/g, "");

    console.log(removeDublicates);
    console.log(this.state.guessedLetters);
    console.log(removeWrongLetters);
    if (removeWrongLetters === removeDublicates && this.state.guesses > 0) {
      var newState = Object.assign({}, this.state.leaderBoard);
      console.log(newState);
      console.log(newState[this.state.userName]);
      if (newState[this.state.userName]) {
        newState[this.state.userName] += 1;
      } else if (this.state.userName) {
        newState[this.state.userName] = 1;
      }

      this.setState(prevState => {
        return {
          wins: prevState.wins + 1,
          endGame: "win",
          leaderBoard: newState
        };
      });

      this.removeEventListener();
    } else if (this.state.guesses === 0) {
      this.setState(prevState => {
        return {
          losses: prevState.losses + 1,
          endGame: "lose"
        };
      });

      this.removeEventListener();
    }
  };

  restartGame = () => {
    this.getWord(this.state.difficulty, this.state.type);
    this.addEventListener();
  };

  changeDifficultyLevel = e => {
    this.getWord(e.target.value, this.state.type);
  };

  changeType = e => {
    this.getWord(this.state.difficulty, e.target.value);
  };

  addNewUser = name => {
    if (name) {
      this.setState({
        userName: name,
        error: "",
        wins: 0
      });
    } else {
      if (this.state.error === "Please, enter a valid name") return;

      this.setState({
        error: "Please, enter a valid name"
      });
    }
  };

  render() {
    return (
      <>
        <Header />

        <div className="container">
          <ScoreBoard
            guesses={this.state.guesses}
            wins={this.state.wins}
            losses={this.state.losses}
            userName={this.state.userName}
          />

          <div>
            <Input
              onClickUser={this.addNewUser}
              onFocus={this.removeEventListener}
              onBlur={this.addEventListener}
              type="user"
            />

            {Object.keys(this.state.leaderBoard).length ? (
              <LeaderBoard leaderBoard={this.state.leaderBoard} />
            ) : null}
          </div>

          <Settings
            onChangeDifficulty={this.changeDifficultyLevel}
            onChangeType={this.changeType}
          />
        </div>

        <div className="container">
          <div className="item">
            {this.state.word ? (
              <HiddenWord
                word={this.state.word}
                guessedLetters={this.state.guessedLetters}
                guesses={this.state.guesses}
                endGame={this.state.endGame}
              />
            ) : null}

            {this.state.guesses > 0 && !this.state.endGame ? (
              <>
                <Input
                  onClickWord={this.checkWord}
                  onFocus={this.removeEventListener}
                  onBlur={this.addEventListener}
                  type="word"
                />

                <Alphabet
                  onClick={this.checkLetter}
                  guessedLetters={this.state.guessedLetters}
                  word={this.state.word}
                  error={this.state.error ? this.state.error : ""}
                />
              </>
            ) : null}

            {this.state.endGame ? (
              <Result endGame={this.state.endGame} onClick={this.restartGame} />
            ) : null}
          </div>

          <div className="item">
            {this.state.word ? <Diagram guesses={this.state.guesses} /> : null}
          </div>
        </div>
      </>
    );
  }
}

export default App;
