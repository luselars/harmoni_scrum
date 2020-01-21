// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Organiser } from '../../../services/modelService';

import { OrganiserService } from '../../../services/organiserService';
import { UserService } from '../../../services/userService';
import { User } from '../../../services/modelService';
import { any } from 'prop-types';

type State = {
  userType: any,
  name: String,
};

export default class ProfileOrganiser extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userType: '',
      name: '',
      organiser: new Organiser('', ''),
      user: new User(),
    };
  }
  render() {
    return (
      <div className="card profilecard container bg-light p-2">
        <div className="row justify-content-md-center align-items-center pb-4">
          <div className="col-md-4 text-center">
            <img
              src={
                this.state.userType.image
                  ? 'http://localhost:4000/public/file/' + this.state.userType.image
                  : 'http://localhost:4000/public/file/profile.png'
              }
              className="img rounded-circle"
              id="profilepic"
              alt="Profilbilde"
            />
          </div>
          <div className="col-md text-center float-left">
            <p id="profilename" className="display-md-4 display-4 text-uppercase text-center m-4">
              {this.state.userType.name
                ? this.state.userType.name.length < 13
                  ? this.state.userType.name
                  : this.state.userType.name.slice(8, 15).includes(' ')
                  ? this.state.userType.name.length > 22
                    ? this.state.userType.name.slice(0, 22) + '...'
                    : this.state.userType.name
                  : this.state.userType.name.slice(0, 12) + '...'
                : ''}
            </p>
            <table className="table table-borderless">
              <tbody className="align-items-center">
                <tr>
                  <th className="text-right" scope="row">
                    Email:
                  </th>
                  <td className="text-left">{this.state.email}</td>
                </tr>
                <tr>
                  <th className="text-right" scope="row">
                    Telefon:
                  </th>
                  <td className="text-left">{this.state.userType.tlf}</td>
                </tr>
                <tr>
                  <th className="text-right" scope="row">
                    Beskrivelse:
                  </th>
                  <td className="text-left">{this.state.userType.description}</td>
                </tr>
                {localStorage.getItem('userType') == 'organiser' ? (
                  <tr>
                    <th className="text-right" scope="row">
                      Nettside:
                    </th>
                    <td className="text-left">{this.state.userType.website}</td>
                  </tr>
                ) : (
                  <div></div>
                )}
              </tbody>
            </table>
            {localStorage.getItem('userType') == 'organiser' ? (
              <button
                className="btn btn-success bg-green mb-4 mt-4"
                onClick={() => (window.location.href = '/editprofile/organiser')}
              >
                REDIGER PROFIL
              </button>
            ) : (
              <button
                className="btn btn-success bg-green mb-4 mt-4"
                onClick={() => (window.location.href = '/editprofile/user')}
              >
                REDIGER PROFIL
              </button>
            )}
          </div>
        </div>
        {localStorage.getItem('userType') == 'organiser' ? (
          <div className="row justify-content-md-center align-items-center border-top pt-5">
            <div className="col-md-4 text-center pb-4">
              <button
                className="btn btn-success bg-green mb-4"
                onClick={() => {
                  localStorage.removeItem('curr_event');
                  window.location.href = '/newevent';
                }}
              >
                OPPRETT ARRANGEMENT
              </button>
              <button
                className="btn btn-success bg-green"
                onClick={() =>
                  (window.location.href = '/events/' + this.state.userType.organiser_id)
                }
              >
                SE MINE ARRANGEMENTER
              </button>
            </div>
            <div className="col-md text-center">
              <h4 className="mb-3 text-success">ARRANGEMENTER</h4>
              {console.log(this.state.userType.eventsComing)}
              {this.state.userType.eventsComing === null &&
              this.state.userType.eventsFinished == null ? (
                <p>Du har ikke noen arrangementer</p>
              ) : (
                <div>
                  <p>
                    Du har
                    {this.state.userType.eventsComing == 0
                      ? ' ingen kommende arrangement'
                      : ' ' +
                        this.state.userType.eventsComing +
                        ' kommende ' +
                        (this.state.userType.eventsComing > 1 ? ' arrangementer' : ' arrangement')}
                  </p>
                  <p>
                    Du har
                    {this.state.userType.eventsFinished == 0
                      ? ' ingen fullførte arrangement'
                      : ' ' +
                        this.state.userType.eventsFinished +
                        (this.state.userType.eventsFinished > 1
                          ? ' fullførte arrangementer'
                          : ' fullførte arrangement')}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (localStorage.getItem('userType') == 'user') {
      UserService.getMyProfile()
        .then(res => {
          let user: User = res.data[0];
          this.setState({
            userType: user,
            email: user.email,
          });
        })
        .catch(error => console.error(error));
    } else if (localStorage.getItem('userType') == 'organiser') {
      OrganiserService.getOrganiser()
        .then(res => {
          let organiser: any = res.data;
          this.setState({
            userType: organiser,
            email: organiser.organiser_email,
          });
        })
        .catch(error => console.error(error));
    } else {
      window.location = '/404';
    }
  }
}
