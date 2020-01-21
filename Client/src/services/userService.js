// @flow
import axios, { AxiosPromise } from 'axios';
import { User } from './modelService';
const url_base = 'http://localhost:4000/user';

export class UserService {
  static getMyProfile(): AxiosPromise<User> {
    let url = url_base + '/myprofile';
    let token = localStorage.getItem('token');
    return axios.get(url, { headers: { 'x-access-token': token } });
  }

  static deleteUser(id: number): AxiosPromise<User> {
    let url = url_base + '/' + id;
    let token = localStorage.getItem('token');
    return axios.delete<Object>(url, { headers: { 'x-access-token': token } });
  }

  static getMyEvents(): AxiosPromise<Event[]> {
    let url = url_base + '/myevents';
    let token = localStorage.getItem('token');
    return axios.get(url, { headers: { 'x-access-token': token } });
  }

  static editUser(user: User): AxiosPromise<User> {
    let url = url_base + '/myprofile';
    let token = localStorage.getItem('token');
    return axios.put<Object>(url, user, { headers: { 'x-access-token': token } });
  }
}
