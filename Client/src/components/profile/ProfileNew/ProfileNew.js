//@flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { UserService } from '../../../services/UserService';
import { string, number } from 'prop-types';

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
    description: string
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
      description: string
    };
  }

  render() {
    return (
      <div id="profileOrganiserCard" className="card ">
        <div className="card-body bg-light">
          <form>
            <h2 id="registerTextH">REGISTER</h2>
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
                id="inputPasswordRepeat1"
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
            
            ) : (<p></p>)}
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
            <div className="form-check text-center ml-5 mr-5">
              <input
                type="checkbox"
                onChange={e => this.changeCheck(e)}
                className="form-check-input"
                id="check1"
              ></input>
              <label className="form-check-label" for="check1">
                Jeg godkjenner deres vilkår
              </label>
            </div>
            <button type="button" onClick={() => this.post()} className="btn btn-success">
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
    console.log(name + ": "+ value);
  }

  changeOrganiser(e: any) {
    this.setState({ organiser: !this.state.organiser });
  }

  changeCheck(e: any) {
    this.setState({ check: !this.state.check });
  }

  post() {
    // Checks if agree to terms box is checked.
    if (this.state.check) {
      // Checks whether password is filled in and matches password confirmation
      if (
        this.state.password === this.state.passwordConfirmation &&
        this.state.password.length > 8
      ) {
        if (this.state.name !== '') {
          if (this.state.email !== '') {
            // Checks if it's an organiser or normal user.
            if (this.state.organiser) {
              var address : string = this.state.address + "#" + this.state.postalcode +  "#" +this.state.postal;
              UserService.newOrganiser(
                this.state.email, 
                this.state.name, 
                this.state.password, 
                this.state.image, 
                this.state.tlf, 
                this.state.description, 
                address, 
                this.state.url
                ).then(
                () => {
                  window.location = '/profile';
                },
              );
            } else {
              UserService.newUser(
                this.state.email, 
                this.state.name, 
                this.state.password,
                this.state.image,
                this.state.tlf,
                this.state.description
                ).then(
                () => {
                  window.location = '/profile';
                },
              );
            }
          }
        }
      } else {
        console.log("Password does not match or you don't have a password.");
      }
      console.log('TRYING TO CREATE NEW USER');
    } else {
      console.log('Not checked agree with terms');
    }
  }
}
