//@flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { PublicService } from '../../../services/publicService';
import { string, number } from 'prop-types';
let path = require('path');

/** Component for creating a new profile */
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
    streetAddress: string,
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
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      url: '',
      organiser: false,
      check: false,
      address: '',
      streetAddress: '',
      postalcode: null,
      postal: '',
      image: '',
      tlf: '',
      description: '',
    };
  }

  render() {
    return (
      <div id="profileOrganiserCard" className="card mb-4">
        <div className="card-body bg-light">
          <form onSubmit={e => this.post(e)}>
            <h2 className="display-4 text-uppercase text-center m-2 border-bottom">
              Opprett profil
            </h2>
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
                E-post*
              </label>
              <p id="alert" style={{ color: 'red' }} hidden="true">
                Eposten er allerede i bruk
              </p>
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
                Bekreft passord*
              </label>
              <p id="alertpassword" style={{ color: 'red' }} hidden="true">
                Passord stemmer ikke overens
              </p>
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
              <div className="ml-5 mr-5" id="addressForm">
                <iframe
                  title="Google maps"
                  id="map"
                  width="100%"
                  height="300px"
                  frameborder="0"
                  src={
                    'https://www.google.com/maps/embed/v1/place?q=' +
                    this.state.streetAddress +
                    ',+' +
                    this.state.postalcode +
                    '+' +
                    this.state.postal +
                    '&key=AIzaSyC-75BBbNQpdG9lO2JararmVY5ps_xDAdk'
                  }
                  allowfullscreen
                ></iframe>
                <div className="form-group text-center">
                  <label for="inputAddress" id="loginText">
                    Adresse
                  </label>
                  <input
                    type="text"
                    onChange={event => this.handleChange(event)}
                    className="form-control"
                    id="inputAddress"
                    placeholder="Adresse"
                    name="streetAddress"
                  ></input>
                </div>
                <div className="form-group text-center ">
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
                <div className="form-group text-center ">
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
                <div class="form-group text-center">
                  <label for="inputURL1" id="loginText">
                    URL til nettsted
                  </label>
                  <input
                    type="text"
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
              <label className="form-check-label" for="upload">
                Profilbilde
              </label>
              <input
                className="file"
                accept=".jpg, .jpeg, .png"
                type="file"
                id="upload"
                name="recfile"
              />
            </div>
            <div className="form-check ml-5 mr-5">
              <input
                type="checkbox"
                onChange={event => this.handleChange(event)}
                className="form-check-input"
                id="check2"
                required
              ></input>
              <label className="form-check-label" for="check2">
                Jeg godkjenner vilkårene
              </label>
            </div>
            <button type="submit" className="btn btn-success w-50 mx-auto d-block m-2">
              Registrer
            </button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * Sets the state when a input changes.
   * @param event the element of which the stage has changed.
   */
  handleChange(event: any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Creates profile and redirects user, or gives alerts if there is any information that is not valid.
   */
  post(event: any) {
    document.getElementById('alertpassword').hidden = true;
    document.getElementById('alert').hidden = true;
    event.preventDefault();
    this.setState({
      address: this.state.streetAddress + '#' + this.state.postalcode + '#' + this.state.postal,
    });
    if (this.state.password === this.state.passwordConfirmation) {
      PublicService.checkEmail(this.state.email).then(res => {
        if (res.data.length === 0) {
          // Image
          let element = document.getElementById('upload');
          if (element.value !== '') {
            let fullPath: any = element.value;
            let ext = path.extname(fullPath);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
              alert('Ikke gyldig filtype');
              return;
            }
            const file = element.files[0];
            const reader = new FileReader();
            const state2 = this.state;
            reader.addEventListener(
              'load',
              function() {
                state2.image = reader.result;

                PublicService.registerNewUser(state2)
                  .then(response => {
                    PublicService.logIn(state2.email, state2.password).then(response2 => {
                      localStorage.setItem('token', response2.data.jwt);
                      localStorage.setItem('userType', response2.data.type);
                      window.location = '/profile';
                    });
                  })
                  .catch(error => {
                    alert(error);
                  });
              },
              false,
            );
            if (file) {
              reader.readAsDataURL(file);
            } else {
              //Register the new user
              PublicService.registerNewUser(this.state)
                .then(response => {
                  PublicService.logIn(this.state.email, this.state.password).then(response => {
                    localStorage.setItem('token', response.data.jwt);
                    localStorage.setItem('userType', response.data.type);
                    window.location = '/profile';
                  });
                })
                .catch(error => {
                  alert(error);
                });
            }
          } else {
            PublicService.registerNewUser(this.state)
              .then(response => {
                PublicService.logIn(this.state.email, this.state.password).then(response => {
                  console.log(response);
                  localStorage.setItem('token', response.data.jwt);
                  localStorage.setItem('userType', response.data.type);
                  window.location = '/profile';
                });
              })
              .catch(error => {
                alert(error);
              });
          }
        } else {
          //Gives alert if the email is already taken
          document.getElementById('alert').hidden = false;
          window.scrollTo(0, 0);
        }
      });
    } else {
      //Gives alert if the password to not match
      document.getElementById('alertpassword').hidden = false;
      window.scrollTo(0, 0);
    }
  }
}
