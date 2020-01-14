// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

import { OrganiserService } from '../../../services/organiserService';

type State = {
  organiser: Organiser,
};

export default class ProfileOrganiser extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      organiser: new Organiser('', ''),
    };
  }
  render() {
    return (
      <div id="profileOrganiserCard" class="card ">
        <div class="card-body bg-light">
          <div class="container bg-light">
            <div class="row justify-content-md-center my-5 align-items-center border-bottom pb-5">
              <div class="col-4 text-center">
                {this.state.organiser.image === null ? (
                  <img
                    src="http://localhost:4000/user/file/profile.png"
                    class="img-rounded w-100"
                    alt="Profilbilde"
                  />
                ) : (
                  <img
                    src={'http://localhost:4000/user/file/' + this.state.organiser.image}
                    class="img-rounded w-100"
                    alt="Profilbilde"
                  />
                )}
              </div>
              <div class="col text-center">
                <h2 class="mb-3">{this.state.organiser.name}</h2>
                <h5>{this.state.organiser.organiser_email}</h5>
                <h5>{this.state.organiser.website}</h5>
              </div>
            </div>
            <div class="row justify-content-md-center mt-y align-items-center">
              <div class="col-4 text-center">
                <button
                  class="btn btn-success bg-green mb-4"
                  onClick={() => (window.location.href = '/editprofile')}
                >
                  OPPRETT ARRANGEMENT
                </button>
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
                {this.state.organiser.eventsComing === null &&
                this.state.organiser.eventsFinished == null ? (
                  <p>Du har ikke noen arrangementer</p>
                ) : (
                  <div>
                    <p>Du har {this.state.organiser.eventsComing} kommende arrangementer.</p>
                    <p>Du har gjennomført {this.state.organiser.eventsFinished} arrangementer.</p>
                    <button
                      class="btn btn-success bg-green"
                      onClick={() => (window.location.href = '/events')}
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
    OrganiserService.getOrganiser()
      .then(res => {
        let organiser: any = res.data;
        console.log(organiser);
        this.setState({ organiser: organiser });
      })
      .catch(error => console.error(error));
  }
}
