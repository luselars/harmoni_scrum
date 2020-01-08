// @flow
const axios = require("axios");
var testingUrl = ""; // For testing "http://localhost:8080"

export default class EventService {
  static async loginUser(username, password) {
    return axios.post(
      "/public/login/user",
      JSON.stringify({ username: username, password: password })
    );
  }
  static async loginOrganiser(username, password) {
    return axios.post(
      "/public/login/organiser",
      JSON.stringify({ username: username, password: password })
    );
  }
}
