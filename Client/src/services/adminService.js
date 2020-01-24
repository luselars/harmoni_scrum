import axios from 'axios';

const url_base = 'http://localhost:4000/admin';
const config = {
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
};

/** Class for all services that is used by admin accounts. */
export class AdminService {
  /** Get all unverified organisers. */
  static getUnverifed() {
    return axios.get(url_base + '/unverified', config);
  }
  /** Get all organisers. */
  static getOrganisers() {
    return axios.get(url_base + '/organisers', config);
  }

  static getUsers() {
    return axios.get(url_base + '/users', config);
  }

  /** Verify an organiser account. */
  static verify(id) {
    return axios.put(url_base + '/unverified/' + id, [], config);
  }

  static deleteUser(id) {
    return axios.delete(url_base + '/user/' + id, config);
  }
  static deleteOrganiser(id) {
    return axios.delete(url_base + '/organiser/' + id, config);
  }
}
