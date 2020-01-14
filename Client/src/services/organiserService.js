// @flow

import axios, { AxiosPromise } from 'axios';
import { Event, Artist, Organiser } from './modelService.js';
const url_base = 'http://localhost:4000/organiser ';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
console.log(localStorage.getItem('token'));

export class OrganiserService {
  // TODO legg til tokens
  static createEvent(event: Event) {
    let config = {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    };
    console.log(event);
    let url = url_base + '/event';
    return axios.post<Object>(url, event, config).then(response => {
      return response;
    });
  }
  // TODO legg til token
  static updateEvent(event: Event) {
    console.log(event);
    let url = url_base + '/event';
    return axios.put<Object>(url, event).then(response => {
      return response;
    });
  }

  // TODO legg til token
  static getEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + id;
    return axios.get<Event>(url, {}).then(response => {
      return response;
    });
  }

  static getOrganiser() {
    let url = url_base + '/myprofile';
    return axios
      .get<Organiser>(url, { headers: { 'x-access-token': localStorage.getItem('token') } })
      .then(response => {
        return response;
      });
  }
}
