// @flow
import axios, { AxiosPromise } from 'axios';
import { User } from './modelService';
const url_base = 'http://localhost:4000/user';

export class UserService {
  static getMyProfile(): AxiosPromise<User> {
    let url = url_base + '/myprofile';
    let token = localStorage.getItem('token');
    return axios.get(url, {}, { headers: { 'x-access-token': token } }).then(response => {
      return response;
    });
  }

  static getMyEvents(): AxiosPromise<Event[]> {
    let url = url_base + '/myevents';
    let token = localStorage.getItem('token');
    return axios.get(url, {}, { headers: { 'x-access-token': token } }).then(response => {
      return response;
    });
  }
  static getFile(name: string) {
    let url = url_base + '/file/' + name;
    return axios.get(url);
  }
}
