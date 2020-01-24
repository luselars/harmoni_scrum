// @flow
import * as React from 'react';
import { Component } from 'react';

/**Component for the feedback confirmation message*/
export default class FeedbackRegistered extends Component<{}, {}> {
  render() {
    return (
      <div className="card profilecard container bg-light p-2 text-center p-5 mb-4">
        <p className="display-4 text-uppercase text-center mt-4 border-bottom">
          Feedback registrert
        </p>
        <p className="text-center m-5">
          Vi vil svare på din hendvendelse på mail så fort som mulig.
        </p>
        <button
          className="btn btn-success w-50 mx-auto d-block m-2"
          onClick={() => (window.location.href = '/')}
        >
          Tilbake til forside
        </button>
      </div>
    );
  }
}
