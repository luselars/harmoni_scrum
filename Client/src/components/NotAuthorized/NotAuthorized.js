//@flow
import * as React from 'react';
import { Component } from 'react';

// TODO denne komponenten kan alternativt (hvis den skal brukes litt oftere) legges inn som redirect direkte på Route på App.js og bare legges som en funksjon på App.js

export class NotAuthorized extends Component<State, Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="card" id="NotFound">
        <h1>401 Not Authorized</h1>
        <p>Oisann.. Du mangler rettighetene som kreves for å gå inn på siden.</p>
      </div>
    );
  }
}
