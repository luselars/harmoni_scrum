// @flow

import axios, { AxiosPromise } from 'axios';
import { Organiser } from './UserService';
const url_base = 'http://localhost:4000';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
console.log(localStorage.getItem('token'));

// Event-model
export class Event {
  constructor() {
    this.name = '';
    this.description = '';
    this.image = '';
    this.start = '';
    this.status = '';
    this.is_public = false;
    this.location_id = 0;
    this.venue = '';
    this.end = '';
  }
  event_id: number;
  name: string;
  description: string;
  image: string;
  start: string;
  status: string;
  is_public: boolean;
  location_id: number;
  venue: string;
  end: string;
  address: string;
  location_name: string;
  postcode: number;
}

export class EventService {
  static async loginUser(username: string, password: string) {
    return axios.post(
      '/public/login/user',
      JSON.stringify({ username: username, password: password }),
    );
  }
  static async loginOrganiser(username: string, password: string) {
    return axios.post(
      '/public/login/organiser',
      JSON.stringify({ username: username, password: password }),
    );
  }
  // TODO legg til tokens
  static createEvent(event: Event) {
    let config = {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    };
    console.log(event);
    let url = url_base + '/organiser/event';
    return axios.post<Object>(url, event, config).then(response => {
      return response;
    });
  }
  // TODO legg til token
  static updateEvent(event: Event) {
    console.log(event);
    let url = url_base + '/organiser/event';
    return axios.put<Object>(url, event).then(response => {
      return response;
    });
  }

  // TODO legg til token
  static getEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/organiser/event/' + id;
    return axios.get<Event>(url, {}).then(response => {
      return response;
    });
  }
  // Get the frontpage events (sorted by sortstring)
  static getFrontpage(sortString: string) {
    let url = url_base + '/public/event';
    return axios
      .get<Event[]>(url, { params: { sortString: sortString } })
      .then(response => {
        console.log(response);
        return response;
      });
  }

  static getOrganiser(): AxiosPromise<Organiser> {
    let url = url_base + '/organiser/myprofile';
    let config = {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    };
    console.log(config);
  }

  // TODO legg til token
  static getPublicEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/public/event/' + id;
    return axios.get<Event>(url, {}).then(response => {
      return response;
    });
  }

  static getOrganiser() {
    let url = url_base + '/organiser/myprofile';
    return axios
      .get<Organiser>(url, { headers: { 'x-access-token': localStorage.getItem('token') } })
      .then(response => {
        return response;
      });
  }

  static searchEvent(search: string) {
    let url = url_base + '/event/search' + search;
    return axios
      .get<Event>(url, { search: search })
      .then(response => {
        return response;
      });
  }
}
