//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

export default class EventDetails extends Component<{}, {}> {
  render() {
    return (
      <div id="loginBox">
        <img
          src="https://i.ytimg.com/vi/5Cy_KvI2nME/maxresdefault.jpg"
          class="img-fluid"
          alt="Eventbilde"
        ></img>
        <p id="EventDetailsText">EVENTNAVN</p>
        <div id="EventDetailsTable">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th class="text-right" scope="row">
                  Dato:
                </th>
                <td class="text-left">kl 19:00, 15.01.1998</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Sted:
                </th>
                <td class="text-left">Trondheim Spektrum</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Lineup:
                </th>
                <td class="text-left">Justin Bieber</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Pris:
                </th>
                <td class="text-left">fra 899 NOK</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-success bg-green"> KJØP BILLETT </button>
      </div>
    );
  }
}
