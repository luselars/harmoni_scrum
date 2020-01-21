//@flow

import React from 'react';
import { Component } from 'react';
import { Organiser, User } from '../../services/modelService';
import './stylesheet.css';

type State = {
  organisers: Organiser[],
  users: User[],
};

export default class ForgottenPassword extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="card passwordcard">
        <p className="display-4 text-uppercase text-center m-4 border-bottom">GLEMT PASSORD</p>
      </div>
    );
  }

  componentDidMount() {}
}
