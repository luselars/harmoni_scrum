// @flow

import axios, {AxiosPromise} from'axios';
const url_base = "http://localhost:4000";

// Event-model
export class Event
{
  constructor(name: string) {
    this.name = name;
  }
  //Event Information
  name: string;
  description: string;
  image: string;
  start: string;
  end: string;
  status: string;
  is_public: boolean = false;
  location_id: number;
  address: string;
  venue: string;
  event_id: number = null;

  // Event Location
  location: Location = null;
  // Event Users
  users: User[] = null;

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
  // TODO legg til token
  // TODO bytt alle disse parameterene til ett event-objekt.
  static createEvent(name : string, description : string, start: string, end: string) {
    let url = url_base + "/organiser/event";
    return axios.post<Object>(url, {"name": name, "is_public":0, "description": description, "start": start, "end": end}).then(response => {return response});
  }
  // TODO legg til token
  static updateEvent(event: Event, data: FormData | void) {
    let url = url_base + "/organiser/event";
    let file_url = url_base + "/organiser/file";
    // If FormData is included we need to handle file-upload
    if(data !== null) {
      // Post file and retrieve filename
      return axios.post(file_url, data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
          }}).then((response) => {
          // then something maybe
          console.log("Response:");
          console.log(response);
        }).catch((error) => {
          // TODO change this alert to component-alert
          alert('Error when uploading file.');
        });


      // return axios.put<Event>(event).then(response => {console.log(response)});
    }
    else {
      return axios.put<Event>(event).then(response => {return response});
    }
  }

  // TODO legg til token
  static getEvent(id: number) : AxiosPromise<Event> {
    let url = url_base + "/organiser/event/" + id;
    return axios.get<Event>(url, {}).then(response => {return response});
  }
}
