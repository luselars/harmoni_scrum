// Get the frontpage events (sorted by sortstring)
import axios, { AxiosPromise } from 'axios';
import { Event, Artist, TicketType } from './modelService';

const url_base = 'http://localhost:4000/public';
// axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');

/** Module for public to access public data from server */
export class PublicService {
  /**
   * Login as normal user.
   */
  static logIn(email: string, password: string) {
    return axios.post(url_base + '/login', { username: email, password: password });
  }

  /**
   * Checks to find stored token, in case you are already logged in
   */
  static refreshToken() {
    if (localStorage.getItem('token') != null) {
      axios
        .get(url_base + '/refreshToken', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then(response => {
          localStorage.setItem('token', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /**
   * Checks whether email exists or not within the database.
   */
  static checkEmail(email: string) {
    return axios.get(url_base + '/checkEmail/' + email);
  }

  /**
   * Login as organiser.
   */
  static async loginOrganiser(username: string, password: string) {
    return axios.post(
      '/login/organiser',
      JSON.stringify({ username: username, password: password }),
    );
  }

  /**
   * Get all events on the frontpage.
   */
  static getFrontpage(sortString: string): AxiosPromise<Event[]> {
    let url = url_base + '/event';
    return axios.get(url, { params: { sortString: sortString } });
  }

  /**
   * Gets a public event by id.
   */
  static getPublicEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + id;
    return axios.get(url, {});
  }

  /**
   * Send feedback email to the admin account (replies will be sent to input email).
   */
  static feedback(email: string, feedbacktext: string) {
    return axios.post(url_base + '/feedback', { email: email, feedback: feedbacktext });
  }

  /**
   * Create new password when not logged in. (sent to email)
   */
  static newPassword(email: string, type: string) {
    return axios.post(url_base + '/newpassword', { email: email, type: type });
  }

  /**
   * Get all ticket types on a single event by id.
   */
  static getPublicEventTickets(id: number): AxiosPromise<TicketType[]> {
    let url = url_base + '/event/' + id + '/tickets';
    return axios.get(url, {});
  }

  /**
   * Get all artists on an event by id.
   */
  static getPublicArtist(id: number): AxiosPromise<Artist[]> {
    let url = url_base + '/event/' + id + '/artist';
    return axios.get(url, {});
  }

  /**
   * Sends in a form with a new user to the server-side.
   */
  static registerNewUser(state: Object): AxiosPromise<Object> {
    let url = url_base + '/register';
    return axios.post(url, state);
  }

  /**
   * Search for events given a searchstring.
   */
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
