// Get the frontpage events (sorted by sortstring)
import axios, { AxiosPromise } from 'axios';
import { Event } from './modelService';

const url_base = 'http://localhost:4000/public';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
console.log(localStorage.getItem('token'));

export class PublicService {
  // Login as normal user.
  static logIn(email: string, password: string) {
    let url = url_base + '/login';
    return (
      axios.post <
      Object >
      (url, { username: email, password: password }).then(response => {
        localStorage.setItem('token', response.data.jwt);
      })
    );
  }

  // Login as organiser.
  static async loginOrganiser(username: string, password: string) {
    return axios.post(
      '/login/organiser',
      JSON.stringify({ username: username, password: password }),
    );
  }

  // Get the frontpage.
  static getFrontpage(sortString: string) {
    let url = url_base + '/event';
    return (
      axios.get <
      Event >
      (url, { params: { sortString: sortString } }).then(response => {
        console.log(response);
        return response;
      })
    );
  }

  // TODO legg til token
  static getPublicEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + id;
    return (
      axios.get <
      Event >
      (url, {}).then(response => {
        return response.data[0];
      })
    );
  }

  static newUser(email: string, name: string, password: string) {
    let url = url_base + '/register/user';
    return (
      axios.post <
      Object >
      (url,
      {
        email: email,
        name: name,
        password: password,
        image: '',
        tlf: '',
        description: '',
      }).then(response => {
        localStorage.setItem('token', response.data.jwt);
      })
    );
  }

  static newOrganiser(email: string, name: string, password: string) {
    let url = url_base + '/register/organiser';
    return (
      axios.post <
      Object >
      (url,
      {
        email: email,
        name: name,
        password: password,
        image: '',
        tlf: '',
        description: '',
      }).then(response => {
        localStorage.setItem('token', response.data.jwt);
      })
    );
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
