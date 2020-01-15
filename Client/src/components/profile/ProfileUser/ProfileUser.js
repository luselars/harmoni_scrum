// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { User } from '../../../services/modelService';

import { UserService } from '../../../services/userService';

type State = {
  user: User,
};

export default class ProfileUser extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: new User(),
    };
  }
  render() {
    return (
      <div id="profileOrganiserCard" class="card ">
        <div className="card-body bg-light">
          <div className="container bg-light">
            <div className="row justify-content-md-center mt-3 mb-5 align-items-center border-bottom pb-1">
              <div className="col-4 text-center ">
                {this.state.user.image === undefined || this.state.user.image === null ? (
                  <img
                    src="http://localhost:4000/user/file/profile.png"
                    className="img-rounded w-75"
                    alt="Profilbilde"
                  />
                ) : (
                  <img
                    src={'http://localhost:4000/user/file/' + this.state.user.image}
                    className="img-rounded w-100"
                    alt="Profilbilde"
                  />
                )}
                <p className="text-center m-3 display-4.5">{this.state.user.name}Navn</p>
              </div>
            </div>
            <div className="row justify-content-md-center mt-y align-items-center">
              <div className="col-4 text-center">
                <button
                  class="btn btn-success bg-green mb-4 w-100"
                  onClick={() => (window.location.href = '/editprofile')}
                >
                  REDIGER PROFIL
                </button>
                <button
                  className="btn btn-success bg-green w-100"
                  onClick={() => (window.location.href = '/deleteprofile')}
                >
                  SLETT PROFIL
                </button>
              </div>
              <div className="col text-center">
                <h5 className="mb-3 text-success">ARRANGEMENTER</h5>
                {console.log(this.state.user.eventsComing)}
                {this.state.user.eventsComing === null && this.state.user.eventsFinished == null ? (
                  <p>Du har ikke noen arrangementer</p>
                ) : (
                  <div>
                    <p>
                      Du har
                      {this.state.user.eventsComing == 0
                        ? ' ingen kommende arrangement'
                        : ' ' +
                          this.state.user.eventsComing +
                          ' kommende ' +
                          (this.state.user.eventsComing > 1 ? ' arrangementer' : ' arrangement')}
                    </p>
                    <p>
                      Du har
                      {this.state.user.eventsFinished == 0
                        ? ' ingen fullførte arrangement'
                        : +' ' +
                          this.state.user.eventsFinished +
                          (this.state.user.eventsFinished > 1
                            ? ' fullførte arrangementer'
                            : ' fullførte arrangement')}
                    </p>
                    <button
                      className="btn btn-success bg-green"
                      onClick={() =>
                        (window.location.href = '/events/' + this.state.organiser.organiser_id)
                      }
                    >
                      SE ARRANGEMENTER
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    UserService.getMyProfile()
      .then(res => {
        let user: User = res.data;
        console.log(user);
        this.setState({ user: user });
      })
      .catch(error => console.error(error));
  }
}
