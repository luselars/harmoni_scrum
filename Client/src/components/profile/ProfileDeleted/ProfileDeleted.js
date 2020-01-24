//@flow
import * as React from 'react';
import { Component } from 'react';

//Confirmation page when profile is deleted
/**
 * Confirmation page when profile is deleted
 */
export default class ProfileDeleted extends Component<{}, {}> {
  render() {
    return (
      <div id="profileOrganiserCard" className="card ">
        <div className="card-body bg-light">
          <div className="container bg-light">
            <div className="row justify-content-md-center my-5 align-items-center">
              <h4>DIN PROFIL ER NÅ SLETTET.</h4>
            </div>
            <div className="row justify-content-md-center mt-y align-items-center">
              <button
                className="btn btn-success bg-green mb-4"
                onClick={() => (window.location.href = '/')}
              >
                {' '}
                GÅ TIL HOVEDSIDEN{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
