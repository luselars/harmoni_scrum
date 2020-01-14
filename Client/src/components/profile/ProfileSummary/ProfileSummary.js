// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

export default class ProfileSummary extends Component<{}, {}> {
  render() {
    return (
      <div id="summaryCard" class="card">
        <div class="card-body bg-light">
          <div class="container bg-light">
            <div class="col text-center border-bottom">
              <h2 class="mb-3">MIN PROFIL</h2>
              <img
                src="../../../../public/images/profilepic.png"
                class="img-rounded"
                alt="Profilbilde"
              ></img>
            </div>
            <div class="col text-center border-bottom">
              <h5 class="mb-3">PROFILNAVN</h5>
              <h6>email@hotmewfa.com</h6>
              <h6>https://www.sukkerhuset.no/</h6>
            </div>
            <div class="col text-center">
              <h5 class="mb-3 text-success">MINE ARRANGEMENTER</h5>
              <h6>Du har 3 kommende arrangementer.</h6>
              <h6>Du har gjennomført 4 arrangementer.</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
