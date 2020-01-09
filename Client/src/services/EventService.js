// @flow
const axios = require("axios");
var testingUrl = ""; // For testing "http://localhost:8080"

export class Event {
  event_id: number;
  name: string;
  image: string;
  start: date;
  status: string;
  isPublic: boolean;
  location_id: number;
  venue: string;
  end: date;
  location: string;
}

export default class EventService {
  static async loginUser(username: string, password: string) {
    return axios.post(
      "/public/login/user",
      JSON.stringify({ username: username, password: password })
    );
  }
  static async loginOrganiser(username: string, password: string) {
    return axios.post(
      "/public/login/organiser",
      JSON.stringify({ username: username, password: password })
    );
  }
}
