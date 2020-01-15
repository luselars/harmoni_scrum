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
        <div class="card-body bg-light">
          <div class="container bg-light">
            <div class="row justify-content-md-center my-5 align-items-center border-bottom pb-5">
              <div class="col-4 text-center">
                {this.state.user.image === undefined || this.state.user.image === null ? (
                  <img
                    src="http://localhost:4000/user/file/profile.png"
                    class="img-rounded w-100"
                    alt="Profilbilde"
                  />
                ) : (
                  <img
                    src={'http://localhost:4000/user/file/' + this.state.user.image}
                    class="img-rounded w-100"
                    alt="Profilbilde"
                  />
                )}
              </div>
            </div>
            <div class="row justify-content-md-center mt-y align-items-center">
              <div class="col-4 text-center">
                <button
                  class="btn btn-success bg-green mb-4"
                  onClick={() => (window.location.href = '/editprofile')}
                >
                  REDIGER PROFIL
                </button>
                <button
                  class="btn btn-success bg-green"
                  onClick={() => (window.location.href = '/deleteprofile')}
                >
                  SLETT PROFIL
                </button>
              </div>
              <div class="col text-center">
                <h5 class="mb-3 text-success">ARRANGEMENTER</h5>
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
                      class="btn btn-success bg-green"
                      onClick={() =>
                        (window.location.href = '/events/' + this.state.user.organiser_id)
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
