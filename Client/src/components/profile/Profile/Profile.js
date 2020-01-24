// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Organiser, User } from '../../../services/modelService';

import { OrganiserService } from '../../../services/organiserService';
import { UserService } from '../../../services/userService';

type State = {
  userType: any,
  name: string,
  artist: boolean,
};

//Component to view the user profile
//Adapts the profile to usertype
/**
 * Compontent to view a user's profile.
 * Adapts the profile to usertype
 */
export default class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userType: '',
      name: '',
      organiser: new Organiser('', ''),
      user: new User(),
      artist: false,
    };
  }
  render() {
    return (
      <div className="card profilecard container bg-light mb-4">
        <div className="row justify-content-md-center align-items-center">
          <div className="col-lg-5 text-center mt-4">
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
              {this.state.userType.name}
            </p>
            <table className="table table-borderless">
              <tbody className="align-items-center">
                {this.state.artist ? (
                  <tr>
                    <th className="text-right" scope="row">
                      Artistnavn:
                    </th>
                    <td className="text-left">{this.state.userType.artist_name}</td>
                  </tr>
                ) : (
                  <div></div>
                )}
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
                {localStorage.getItem('userType') === 'organiser' ? (
                  <tr>
                    <th className="text-right" scope="row">
                      Nettside:
                    </th>
                    <td className="text-left">
                      <a href={this.state.userType.website}>{this.state.userType.website}</a>
                    </td>
                  </tr>
                ) : (
                  <div></div>
                )}
              </tbody>
            </table>
            {localStorage.getItem('userType') === 'organiser' ? (
              <button
                className="btn btn-success m-3"
                onClick={() => (window.location.href = '/editprofile/organiser')}
              >
                REDIGER PROFIL
              </button>
            ) : (
              <button
                className="btn btn-success w-50 m-3"
                onClick={() => (window.location.href = '/editprofile/user')}
              >
                REDIGER PROFIL
              </button>
            )}
          </div>
        </div>
        {localStorage.getItem('userType') === 'organiser' || this.state.artist ? (
          <div className="row justify-content-md-center align-items-center border-top py-5 px-6">
            <div className="col-lg-5 text-center pb-4">
              {localStorage.getItem('userType') === 'organiser' ? (
                <button
                  className="btn btn-success w-75 m-3"
                  onClick={() => {
                    localStorage.removeItem('curr_event');
                    window.location.href = '/newevent';
                  }}
                >
                  OPPRETT ARRANGEMENT
                </button>
              ) : (
                <br></br>
              )}
              <button
                className="btn btn-success w-75  m-3"
                onClick={() => (window.location.href = '/events')}
              >
                SE DINE ARRANGEMENTER
              </button>
            </div>
            <div className="col-md text-center">
              <h4 className="mb-3 text-success">ARRANGEMENTER</h4>
              {console.log(this.state.userType.eventsComing)}
              {this.state.userType.eventsComing === null &&
              this.state.userType.eventsFinished === null ? (
                <p>Du har ikke noen arrangementer</p>
              ) : (
                <div>
                  <p>
                    Du har
                    {this.state.userType.eventsComing === 0
                      ? ' ingen kommende arrangement'
                      : ' ' +
                        this.state.userType.eventsComing +
                        ' kommende ' +
                        (this.state.userType.eventsComing > 1 ? ' arrangementer' : ' arrangement')}
                  </p>
                  <p>
                    Du har
                    {this.state.userType.eventsFinished === 0
                      ? ' ingen fullførte arrangement'
                      : ' ' +
                        this.state.userType.eventsFinished +
                        ' fullførte' +
                        (this.state.userType.eventsFinished > 1
                          ? ' arrangementer'
                          : ' arrangement')}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="row justify-content-md-center">
            <button
              className="btn btn-success w-75 m-3"
              onClick={() => (window.location.href = '/events')}
            >
              SE DINE ARRANGEMENTER
            </button>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (localStorage.getItem('userType') === 'user') {
      //Gets userprofile
      UserService.getMyProfile()
        .then(res => {
          let user: User = res.data[0];
          this.setState({
            userType: user,
            email: user.email,
          });
          if (user.artist_name != null) {
            this.setState({ artist: true });
          }
        })
        .catch(error => console.error(error));
    } else if (localStorage.getItem('userType') === 'organiser') {
      //Gets organiser profile
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
