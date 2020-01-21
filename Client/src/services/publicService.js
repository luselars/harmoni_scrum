// Get the frontpage events (sorted by sortstring)
import axios, { AxiosPromise } from 'axios';
import {Event, Artist, TicketType} from './modelService';

const url_base = 'http://localhost:4000/public';
// axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');

export class PublicService {
  // Login as normal user.
  static logIn(email: string, password: string) {
    return axios.post(url_base + '/login', { username: email, password: password });
  }

  static checkEmail(email: string) {
    return axios.get(url_base + '/checkEmail/' + email);
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
    return axios.get(url, {});
  }

  static getPublicEventTickets(id: number): AxiosPromise<TicketType[]> {
    let url = url_base + '/event/' + id + '/tickets';
    return axios.get(url, {});
  }

  //
  static getPublicArtist(id: number): AxiosPromise<Artist[]> {
    let url = url_base + '/event/' + id + '/artist';
    return axios.get(url, {});
  }

  static registerNewUser(state: Object): AxiosPromise<Object> {
    let url = url_base + '/register';
    return axios.post(url, state);
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
