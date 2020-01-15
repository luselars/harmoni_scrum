//@flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { PublicService } from '../../../services/publicService';
import { string, number } from 'prop-types';
import { OrganiserService } from '../../../services/organiserService';
let path = require('path');

export default class ProfileNew extends Component<
  {},
  {
    email: string,
    name: string,
    password: string,
    passwordConfirmation: string,
    url: string,
    organiser: boolean,
    check: boolean,
    address: string,
    postalcode: number,
    postal: string,
    image: string,
    tlf: string,
    description: string,
  },
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: string,
      name: string,
      password: string,
      passwordConfirmation: string,
      url: string,
      organiser: false,
      check: false,
      address: string,
      postalcode: number,
      postal: string,
      image: string,
      tlf: string,
      description: string,
    };
  }

  render() {
    return (
      <div id="profileOrganiserCard" className="card ">
        <div className="card-body bg-light">
          <form onSubmit={e => this.post(e)}>
            <h2 className="display-4 text-center">REGISTRER</h2>
            <div
              id="error-message"
              style={{ visibility: 'hidden' }}
              className="alert alert-danger"
              role="alert"
            ></div>
            <div className="form-check ml-5 mr-5">
              <div>
                <input
                  type="checkbox"
                  name="organiser"
                  onChange={event => this.handleChange(event)}
                  className="form-check-input"
                  id="check1"
                ></input>
                <label className="form-check-label" htmlFor="check1">
                  Er du en arrangør?
                </label>
              </div>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputEmail1" id="registerText">
                E-mail*
              </label>
              <input
                type="email"
                onChange={event => this.handleChange(event)}
                className="form-control"
                id="inputEmail1"
                aria-describedby="emailHelp"
                placeholder="Epost"
                name="email"
                required
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputName1" id="registerText">
                Navn*
              </label>
              <input
                type="text"
                onChange={event => this.handleChange(event)}
                className="form-control"
                id="inputName1"
                placeholder="Navn"
                name="name"
                required
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputPassword1" id="loginText">
                Passord*
              </label>
              <input
                type="password"
                minlength="8"
                onChange={event => this.handleChange(event)}
                className="form-control"
                id="inputPassword1"
                placeholder="Passord"
                name="password"
                required
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputPasswordRepeat1" id="loginText">
                Gjenta passord*
              </label>
              <input
                type="password"
                minlength="8"
                onChange={event => this.handleChange(event)}
                className="form-control"
                id="inputPasswordRepeat1"
                placeholder="Gjenta passord"
                name="passwordConfirmation"
                required
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputDescription" id="loginText">
                Litt om deg
              </label>
              <textarea
                type="text"
                onChange={event => this.handleChange(event)}
                className="form-control"
                id="description"
                placeholder="Litt om deg"
                name="description"
              ></textarea>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputTlf" id="loginText">
                Telefon
              </label>
              <input
                type="tel"
                onChange={event => this.handleChange(event)}
                className="form-control"
                id="inputTlf"
                placeholder="Telefon"
                name="tlf"
              ></input>
            </div>
            {this.state.organiser ? (
              <div id="addressForm">
                <div className="form-group text-center ml-5 mr-5">
                  <label for="inputAddress" id="loginText">
                    Adresse
                  </label>
                  <input
                    type="text"
                    onChange={event => this.handleChange(event)}
                    className="form-control"
                    id="inputAddress"
                    placeholder="Adresse"
                    name="address"
                  ></input>
                </div>
                <div className="form-group text-center ml-5 mr-5">
                  <label for="inputPostalcode" id="loginText">
                    Postnummer
                  </label>
                  <input
                    type="number"
                    onChange={event => this.handleChange(event)}
                    className="form-control"
                    id="inputPostalcode"
                    placeholder="Postnummer"
                    name="postalcode"
                  ></input>
                </div>
                <div className="form-group text-center ml-5 mr-5">
                  <label for="inputPostal" id="loginText">
                    Poststed
                  </label>
                  <input
                    type="text"
                    onChange={event => this.handleChange(event)}
                    className="form-control"
                    id="inputPostal"
                    placeholder="Poststed"
                    name="postal"
                  ></input>
                </div>
                <div class="form-group text-center ml-5 mr-5">
                  <label for="inputURL1" id="loginText">
                    URL til nettsted
                  </label>
                  <input
                    type="url"
                    onChange={event => this.handleChange(event)}
                    className="form-control"
                    id="inputURL1"
                    placeholder="Lim inn url"
                    name="website"
                  ></input>
                </div>
              </div>
            ) : (
              <p></p>
            )}
            <div className="form-check text-center ml-5 mr-5 p-2 border">
              <input
                className="file mr-6"
                accept=".jpg, .jpeg, .png"
                type="file"
                id="upload"
                name="recfile"
              />
              <label className="form-check-label" for="upload">
                Profilbilde
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="checkbox"
                onChange={event => this.handleChange(event)}
                className="form-check-input"
                id="check1"
                required
              ></input>
              <label class="form-check-label" for="check1">
                Jeg godkjenner deres vilkår
              </label>
            </div>
            <button type="submit" className="btn btn-success">
              Registrer
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleChange(event: any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  post(event: any) {
    event.preventDefault();
    if (this.state.password == this.state.passwordConfirmation) {
      console.log('registering');
      PublicService.registerNewUser(this.state)
        .then(response => {
          localStorage.setItem('token', response.data.jwt);
          window.location = '/profile';
        })
        .catch(error => {
          alert('Eposten er allerede i bruk');
        });
    } else {
      alert('Passord matcher ikke');
    }
  }
}
