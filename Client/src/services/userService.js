// @flow
import axios, { AxiosPromise } from 'axios';
import { User } from './modelService';

const url_base = 'http://localhost:4000/user';

/**
 * Token to send with axios, for authentication
 */
const config = {
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
};
/** Module for users to communicate with server */
export class UserService {
  /**
   * Get the profile information of the currently logged in user.
   */
  static getMyProfile(): AxiosPromise<User> {
    let url = url_base + '/myprofile';
    return axios.get(url, config);
  }

  /**
   * Delete the currently logged in user.
   */
  static deleteUser(id: number): AxiosPromise<User> {
    let url = url_base + '/' + id;
    return axios.delete<Object>(url, config);
  }

  /**
   * Get all events the artist is connected to.
   */
  static getMyEventsArtist(): AxiosPromise<Event[]> {
    let url = url_base + '/myeventsArtist';
    return axios.get(url, config);
  }

  /**
   * Get all events the volunteer is connected to.
   */
  static getMyEventsVolunteer(): AxiosPromise<Event[]> {
    let url = url_base + '/myeventsVolunteer';
    return axios.get(url, config);
  }

  /**
   * Get a specific event by id.
   */
  static getEvent(event_id: number): AxiosPromise<Event> {
    let url = url_base + '/myevents/' + event_id;
    return axios.get(url, config);
  }

  /**
   * Get artists on an event by id.
   */
  static getArtists(event_id: number): AxiosPromise<User[]> {
    let url = url_base + '/artist/' + event_id;
    return axios.get(url, config);
  }

  /**
   * Get all riders connected to an event.
   */
  static getRiders(event_id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + event_id + '/riders';
    return axios.get(url, config);
  }

  /**
   * Sends in a form to update the logged in user.
   */
  static editUser(user: User): AxiosPromise<User> {
    let url = url_base + '/myprofile';
    return axios.put<Object>(url, user, config);
  }

  /**
   * Edit the artist name associated with the logged in user account.
   */
  static editArtistname(artist_name: string): AxiosPromise<User> {
    let url = url_base + '/artistname';
    return axios.put<Object>(url, { artist_name }, config);
  }

  /**
   * Get all riders on an event pertaining to the user.
   */
  static getMyRiders(event_id: number): AxiosPromise<Object[]> {
    let url = url_base + '/event/' + +event_id + '/riders';
    return axios.get<Object>(url, config);
  }

  /**
   * Post rider file by string to an event by id.
   */
  static postRider(rider_file: string, event_id: number) {
    let url = url_base + '/event/' + event_id + '/riders';
    return axios.post(url, { rider_file }, config);
  }

  /**
   * Delete a rider by id.
   */
  static deleteRider(rider_id: number) {
    let url = url_base + '/rider/' + rider_id;
    return axios.delete(url, config);
  }

  /**
   * Edit the notes on an event by id.
   */
  static putNotes(notes: string, event_id: number) {
    let url = url_base + '/event/' + event_id + '/notes';
    return axios.put(url, { notes }, config);
  }
}
