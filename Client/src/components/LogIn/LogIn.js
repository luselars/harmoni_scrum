//@flow
import * as React from 'react';
import { Component } from 'react';
import { PublicService } from '../../services/publicService.js';
import { string } from 'prop-types';

export default class LogIn extends Component<{}, { email: string, password: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: string,
      password: string,
    };
  }

  render() {
    return (
      <div id="profileOrganiserCard" className="mainBody">
        <div className="card-body d-flex justify-content-center">
          <form className="bg-light" onSubmit={e => this.post(e)}>
            <p className="display-4 text-uppercase text-center m-4 border-bottom">logg inn</p>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputEmail1">E-mail</label>
              <input
                type="email"
                onChange={e => this.changeEmail(e)}
                name="email"
                className="form-control"
                id="inputEmail1"
                aria-describedby="emailHelp"
                placeholder="Skriv e-mail"
                required
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="inputPassword1" className="">
                Passord
              </label>
              <input
                type="password"
                onChange={e => this.changePassword(e)}
                name="password"
                minlength="8"
                className="form-control"
                id="inputPassword1"
                placeholder="Passord"
                required
              ></input>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label className="form-label" for="check1">
                <a href="/glemtpassord">Glemt passord?</a>
              </label>
              <button type="submit" className="btn btn-success mr-3 ml-3">
                Logg inn
              </button>
            </div>
            <div className="form-group text-center ml-5 mr-5">
              <label for="profileNew" className="form-label">
                Ikke registrert bruker? <a href="/register">Registrer deg her</a>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }

  changeEmail(e: any) {
    const target = e.target;
    let name: string = target.name;
    let value: string = target.value;
    this.setState({ email: value });
  }

  changePassword(e: any) {
    const target = e.target;
    let name: string = target.name;
    let value: string = target.value;
    this.setState({ password: value });
  }

  post(e: any) {
    e.preventDefault();
    PublicService.logIn(this.state.email, this.state.password)
      .then(response => {
        console.log('Response: ' + response.data.jwt);
        localStorage.setItem('token', response.data.jwt);
        window.location = '/profile';
      })
      .catch(error => {
        console.log('error: ' + error);
        alert('Bruker ikke funnet, sjekk passord og email og prøv på nytt');
      });
  }
}
