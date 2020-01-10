// @flow

const axios = require("axios");
const url_base = "http://localhost:4000";


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
  static postEvent(name : string, description : string, start: string, end: string) {
    let url = url_base + "/organiser/event";
    return axios.post<Object>(url, {"name": name, "description": description, "start": start, "end": end}).then(response => {console.log(response)});
  }
}
