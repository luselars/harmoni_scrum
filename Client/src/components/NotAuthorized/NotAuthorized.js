//@flow
import * as React from 'react';
import { Component } from 'react';

/**
 * Component for altert page when an unauthorized user tries to access
 */
export class NotAuthorized extends Component<{}, {}> {
  render() {
    return (
      <div className="card" id="NotFound">
        <h1>401 Not Authorized</h1>
        <p>Oisann.. Du mangler rettighetene som kreves for å gå inn på siden.</p>
      </div>
    );
  }
}
