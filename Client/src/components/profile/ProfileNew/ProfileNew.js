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
                  onChange={e => this.changeOrganiser(e)}
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
                onChange={e => this.onChange(e)}
                className="form-control"
                id="inputEmail1"
                aria-describedby="emailHelp"
                placeholder="Epost"
                name="email"
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputName1" id="registerText">
                Navn*
              </label>
              <input
                type="text"
                onChange={e => this.onChange(e)}
                className="form-control"
                id="inputName1"
                placeholder="Navn"
                name="name"
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputPassword1" id="loginText">
                Passord*
              </label>
              <input
                type="password"
                onChange={e => this.onChange(e)}
                className="form-control"
                id="inputPassword1"
                placeholder="Passord"
                name="password"
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputPasswordRepeat1" id="loginText">
                Gjenta passord*
              </label>
              <input
                type="password"
                onChange={e => this.onChange(e)}
                className="form-control"
                id="inputPasswordRepeat1"
                placeholder="Gjenta passord"
                name="passwordConfirmation"
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputDescription" id="loginText">
                Litt om deg
              </label>
              <textarea
                type="text"
                onChange={e => this.onChange(e)}
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
                type="text"
                onChange={e => this.onChange(e)}
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
                    onChange={e => this.onChange(e)}
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
                    onChange={e => this.onChange(e)}
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
                    onChange={e => this.onChange(e)}
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
                    onChange={e => this.onChange(e)}
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
                onChange={e => this.changeCheck(e)}
                className="form-check-input"
                id="check1"
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

  onChange(e: any) {
    let name: string = e.target.name;
    let value: string = e.target.value;
    this.setState({ [name]: value });
    console.log(name + ': ' + value);
  }

  changeOrganiser(e: any) {
    this.setState({ organiser: !this.state.organiser });
  }

  changeCheck(e: any) {
    this.setState({ check: !this.state.check });
  }

  post(e: any) {
    e.preventDefault();
    var errorMessage = document.getElementById('error-message');
    // Checks if agree to terms box is checked.
    if (this.state.check) {
      // Checks whether password is filled in and matches password confirmation
      if (
        this.state.password === this.state.passwordConfirmation &&
        this.state.password.length > 8
      ) {
        if (this.state.name !== '') {
          if (this.state.email !== '') {
            let element = document.getElementById('upload');
            if (element.value !== '') {
              let fullPath = element.value;
              let ext = path.extname(fullPath);
              if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                //TODO change alert
                alert('Ikke gyldig filtype');
                return;
              }
              const file = element.files[0];
              const reader = new FileReader();
              let state2 = this.state;
              reader.addEventListener(
                'load',
                function() {
                  let image = reader.result;
                  // Checks if it's an organiser or normal user.
                  if (state2.organiser) {
                    var address: string =
                      state2.address + '#' + state2.postalcode + '#' + state2.postal;
                    PublicService.newOrganiser(
                      state2.email,
                      state2.name,
                      state2.password,
                      image,
                      state2.tlf,
                      state2.description,
                      address,
                      state2.website,
                    ).then(response => {
                      localStorage.setItem('token', response.data.jwt);
                      window.location = '/profile';
                    });
                  } else {
                    PublicService.newUser(
                      state2.email,
                      state2.name,
                      state2.password,
                      image,
                      state2.tlf,
                      state2.description,
                    ).then(response => {
                      localStorage.setItem('token', response.data.jwt);
                      window.location = '/profile';
                    });
                  }
                },
                false,
              );
              if (file) {
                reader.readAsDataURL(file);
              }
            } else {
              if (this.state.organiser) {
                var address: string =
                  this.state.address + '#' + this.state.postalcode + '#' + this.state.postal;
                PublicService.newOrganiser(
                  this.state.email,
                  this.state.name,
                  this.state.password,
                  '',
                  this.state.tlf,
                  this.state.description,
                  this.state,
                  this.state.website,
                ).then(response => {
                  localStorage.setItem('token', response.data.jwt);
                  window.location = '/profile';
                });
              } else {
                PublicService.newUser(
                  this.state.email,
                  this.state.name,
                  this.state.password,
                  '',
                  this.state.tlf,
                  this.state.description,
                ).then(response => {
                  localStorage.setItem('token', response.data.jwt);
                  window.location = '/profile';
                });
              }
            }
          }
        }
      } else {
        errorMessage.innerHTML = "Password does not match or you don't have a password.";
        errorMessage.style.visibility = 'visible';
      }
      console.log('TRYING TO CREATE NEW USER');
      errorMessage.innerHTML = '';
      errorMessage.style.visibility = 'hidden';
    } else {
      errorMessage.innerHTML = 'Du har ikke godtatt våre vilkår';
      errorMessage.style.visibility = 'visible';
    }
  }
}
