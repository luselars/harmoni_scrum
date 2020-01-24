//@flow
import * as React from 'react';
import { Component } from 'react';

/**Component contains the card with confirmation about deleted event
 */
export default class EventDeleted extends Component<{}, {}> {
  render() {
    return (
      <div id="profileOrganiserCard" class="card ">
        <div class="card-body bg-light">
          <div class="container bg-light">
            <div class="row justify-content-md-center m-4 align-items-center">
              <p className="display-4">DITT ARRANGEMENT ER NÅ SLETTET</p>
            </div>
            <div class="row justify-content-md-center mt-y align-items-center">
              <button
                class="btn btn-success mx-auto d-block mb-4"
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
