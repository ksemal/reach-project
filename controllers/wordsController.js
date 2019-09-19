const axios = require("axios");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  getWords: function(req, res) {
    console.log(req.query);
    axios
      .get("http://app.linkedin-reach.io/words", {
        params: {
          difficulty: req.query.difficulty,
          start: getRandomInt(1000),
          count: 30
        }
      })
      .then(wordlist => {
        let wordsArr = wordlist.data.split("\n");
        if (req.query.type == "word") {
          res.send(wordsArr[getRandomInt(wordsArr.length)]);
        } else {
          let firstWord = wordsArr[getRandomInt(wordsArr.length)];
          firstWord += " ";
          let secondWord = wordsArr[getRandomInt(wordsArr.length) - 1];
          let phrase = firstWord.concat(secondWord);
          res.send(phrase);
        }
      })
      .catch(err => console.log(err));
  }
};
