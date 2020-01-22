// @flow
import * as React from 'react';
import { Component } from 'react';

export default class FeedbackRegistered extends Component<{}, {}> {
  render() {
    return (
      <div className="card profilecard container bg-light p-2 text-center p-5">
        <p className="display-4 text-uppercase text-center mt-4 border-bottom">
          Feedback registrert
        </p>
        <p className="text-center m-5">
          Vi vil svare på din hendvendelse på mail så fort som mulig.
        </p>
        <button
          className="btn btn-success bg-green w-25"
          onClick={() => (window.location.href = '/')}
        >
          Tilbake til forside
        </button>
      </div>
    );
  }
}
