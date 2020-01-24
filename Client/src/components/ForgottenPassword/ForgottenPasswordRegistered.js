// @flow
import * as React from 'react';
import { Component } from 'react';

//Confirmation component for forgotten password
export default class ForgottenPasswordRegistered extends Component<{}, {}> {
  render() {
    return (
      <div className="card profilecard container bg-light p-4 text-center mb-4">
        <p className="display-4 text-uppercase text-center border-bottom py-4">Passord sendt</p>
        <p className="text-center m-4">
          Du vil snart motta et midlertidig passord på mail. Vennligst logg inn med dette og endre
          til egendefinert passord.
        </p>
        <button
          className="btn btn-success w-50 mx-auto d-block m-2"
          onClick={() => (window.location.href = '/login')}
        >
          Logg inn
        </button>
        <button
          className="btn btn-success w-50 mx-auto d-block m-2"
          onClick={() => (window.location.href = '/')}
        >
          Til forside
        </button>
      </div>
    );
  }
}
