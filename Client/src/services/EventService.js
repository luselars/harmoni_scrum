// @flow

import axios from'axios';
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
  // TODO legg til token
  static postEvent(name : string, description : string, start: string, end: string) {
    let url = url_base + "/organiser/event";
    return axios.post<Object>(url, {"name": name, "is_public":0, "description": description, "start": start, "end": end}).then(response => {return response});
  }
  // TODO legg til token
  static getEvent(id: number) {
    let url = url_base + "/organiser"
  }
}
