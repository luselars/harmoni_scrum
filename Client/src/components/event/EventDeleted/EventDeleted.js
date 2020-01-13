//@flow

import * as React from 'react';
import { Component } from 'react';

export default class EventDeleted extends Component<{}, {}> {
  render() {
    return (
      <div id="profileOrganiserCard" class="card ">
        <div class="card-body bg-light">
          <div class="container bg-light">
            <div class="row justify-content-md-center my-5 align-items-center">
              <h4>DITT ARRANGEMENT ER NÅ SLETTET.</h4>
            </div>
            <div class="row justify-content-md-center mt-y align-items-center">
              <button
                class="btn btn-success bg-green mb-4"
                onClick={() => (window.location.href = '/profile')}
              >
                {' '}
                TILBAKE TIL PROFIL{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
