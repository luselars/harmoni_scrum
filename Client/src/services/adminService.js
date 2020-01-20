import axios, { AxiosPromise } from 'axios';
import { Event, Artist } from './modelService';
const url_base = 'http://localhost:4000/admin';
const config = {
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
};

export class AdminService {
  // Get Unverified
  static getUnverifed() {
    return axios.get(url_base + '/unverified', config);
  }
  // Get all organisers
  static getAll() {
    return axios.get(url_base + '/organisers', config);
  }

  // Verify an account
  static verify() {
    return axios.put(url_base + '/unverified/:id', config);
  }
}
