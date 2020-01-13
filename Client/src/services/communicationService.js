// @flow

import axios, { AxiosPromise } from 'axios';
const url_base = 'http://localhost:4000';

export class CommunicationService {
  static sortString: string = 'e.start';

  // Set the sorting string
  static setSortString(string: string) {
    this.sortString = string;
  }
  // Get the sorting string
  static getSortString() {
    return this.sortString;
  }
}
