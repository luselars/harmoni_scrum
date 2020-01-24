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
  static getAll() {
    return axios.get(url_base + '/organisers', config);
  }
  /** Verify an organiser account. */
  static verify(id) {
    return axios.put(url_base + '/unverified/' + id, [], config);
  }
}
