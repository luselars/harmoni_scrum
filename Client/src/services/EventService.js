// @flow

import axios, {AxiosPromise} from'axios';
const url_base = "http://localhost:4000";

// Event-model
export class Event
{
  constructor(){
    this.name = null;
    this.description = null;
    this.image = null;
    this.start = null;
    this.status = null;
    this.is_public = 0;
    this.location_id = null;
    this.venue = null;
    this.end = null;
  }
  name: string;
  description: string;
  image: string;
  start: string;
  status: string;
  is_public: boolean;
  location_id: number;
  venue: string;
  end: string;
}


export class EventService {
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
  static createEvent(event: Event) {
    console.log(event);
    let url = url_base + "/organiser/event";
    return axios.post<Object>(url, event).then(response => {return response});
  }
  // TODO legg til token
  static updateEvent(event: Event) {
    console.log(event);
    let url = url_base + "/organiser/event";
    return axios.put<Object>(url, event).then(response => {return response});

  }

  // TODO legg til token
  static getEvent(id: number) : AxiosPromise<Event> {
    let url = url_base + "/organiser/event/" + id;
    return axios.get<Event>(url, {}).then(response => {return response});
  }
  // TODO delete later
  static postFileTest(file: string) {
    let url = url_base + "/organiser/filetest";
    axios.post(url, {file}).then((response) => {
      return response;
    })
  }
}
