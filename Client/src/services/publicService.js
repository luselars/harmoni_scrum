// Get the frontpage events (sorted by sortstring)
import axios, { AxiosPromise } from 'axios';
import { Event } from './modelService';

const url_base = 'http://localhost:4000/public';
// axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');

export class PublicService {
  // Login as normal user.
  static logIn(email: string, password: string) {
    return axios.post(url_base + '/login', { username: email, password: password });
  }

  // Login as organiser.
  static async loginOrganiser(username: string, password: string) {
    return axios.post(
      '/login/organiser',
      JSON.stringify({ username: username, password: password }),
    );
  }

  // Get the frontpage.
  static getFrontpage(sortString: string): AxiosPromise<Event[]> {
    let url = url_base + '/event';
    return axios.get(url, { params: { sortString: sortString } });
  }

  // TODO legg til token
  static getPublicEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + id;
    return (
      axios.get(url, {})
    );
  }

  static newUser(email: string, name: string, password: string): AxiosPromise<Object> {
    let url = url_base + '/register/user';
    return axios.post(url, {
      email: email,
      name: name,
      password: password,
      image: '',
      tlf: '',
      description: '',
    });
  }

  static newOrganiser(email: string, name: string, password: string): AxiosPromise<Object> {
    let url = url_base + '/register/organiser';
    return axios.post(url, {
      email: email,
      name: name,
      password: password,
      image: '',
      tlf: '',
      description: '',
    });
  }

  static searchEvent(search: string) {
    let url = url_base + '/event/search' + search;
    return (
      axios.get <
      Event >
      (url, { search: search }).then(response => {
        return response;
      })
    );
  }
}
