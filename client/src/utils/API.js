import axios from "axios";

export default {
  getWords: function(difficulty, type) {
    return axios.get("/api", {
      params: {
        difficulty: difficulty,
        type: type
      }
    });
  }
};
