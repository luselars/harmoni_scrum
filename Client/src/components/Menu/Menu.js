//@flow
import React from 'react';
import { Component } from 'react';

import { Link } from 'react-router-dom';

type State = {
  status: boolean,
};

export default class Menu extends Component<{}, { status: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: localStorage.getItem('token') === null,
    };
  }

  render() {
    return (
      <nav>
        <div class="nav-wrapper">
          <a href="/" class="brand-logo center">
            Harmoni
          </a>
          <ul class="left hide-on-med-and-down">
            <li>
              <a href="/">
                <i class="fas fa-home"></i>
              </a>
            </li>
          </ul>
          <ul class="right hide-on-med-and-down">
            <li>
              <a href="badges.html">
                <i class="material-icons">view_module</i>
              </a>
            </li>
            <li>
              <a href="collapsible.html">
                <i class="material-icons">refresh</i>
              </a>
            </li>
            <li>
              <a href="mobile.html">
                <i class="fas fa-user"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  logOut() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}

/*
<nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand text-light" id="title" href="/">
          HARMONI
        </a>
        <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        {this.state.status ? (
          <form className="d-flex flex-row flex-wrap">
            <a className="nav-link text-light" id="homeButton" href="/">
              Hjem <i className="fa fa-home fa-lg"></i>
              <span className="sr-only"></span>
            </a>
            <a className="nav-link text-light text-right" id="loginButton" href="/login">
              Logg inn{' '}
              <i className="fa fa-sign-in fa-lg" style={{ color: 'white' }} aria-hidden="true"></i>
              <span className="sr-only"></span>
            </a>
          </form>
        ) : (
          <form className="d-flex flex-row flex-wrap">
            <a className="nav-link text-light" id="homeButton" href="/">
              Hjem <i className="fa fa-home fa-lg"></i>
              <span className="sr-only"></span>
            </a>
            <a className="nav-link text-light" id="profileButton" href="/profile">
              Profil <i className="fa fa-user fa-lg"></i>
              <span className="sr-only"></span>
            </a>
            <a className="nav-link text-light" id="loginButton" onClick={() => this.logOut()}>
              Logg ut{' '}
              <i className="fa fa-sign-out fa-lg" style={{ color: 'white' }} aria-hidden="true"></i>
              <span className="sr-only"></span>
            </a>
          </form>
        )}
      </nav>
      */
