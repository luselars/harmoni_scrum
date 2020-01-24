// @flow

import * as React from 'react';
import { Component } from 'react';
import { Organiser, User } from '../../services/modelService';
import { AdminService } from '../../services/adminService';
import './stylesheet.css';
import { NotAuthorized } from '../NotAuthorized/NotAuthorized';

/**Interpret axios errors */
const { AxiosError } = require('axios');

type State = {
  organiser: Organiser[],
  authorised: boolean,
  users: User[],
};

/** The Component for deleting organiseres*/
export default class DeleteOrganiser extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      organiser: [],
      authorised: true,
      users: [],
    };
  }
  render() {
    if (this.state.authorised) {
      return (
        <div>
          <div className="card display-4 text-center" id="admincard">
            Slett brukere
          </div>
          {this.state.organiser.map(org => (
            <div className="card" id="admincard">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" id="textright" scope="row">
                      <p className="textadmin">{org.organiser_email}</p>
                    </th>
                    <td className="text-left" id="textleft">
                      <div className="btnclassadmin">
                        <button
                          type="button"
                          className="btn btn-danger adminbtn"
                          onClick={() => this.deleteOrganiser(org.organiser_id)}
                        >
                          Slett
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          {this.state.users.map(user => (
            <div className="card" id="admincard">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" id="textright" scope="row">
                      <p className="textadmin">{user.email}</p>
                    </th>
                    <td className="text-left" id="textleft">
                      <div className="btnclassadmin">
                        <button
                          type="button"
                          className="btn btn-danger adminbtn"
                          onClick={() => this.deleteUser(user.user_id)}
                        >
                          Slett
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      );
    } else {
      //Not Authorized users tries to access
      return <NotAuthorized />;
    }
  }

  /**Gets all unverifed organisers*/
  componentDidMount() {
    AdminService.getOrganisers()
      .then(res => {
        this.setState({ authorised: true });
        let organiser: any = res.data;
        this.setState({ organiser: organiser });
      })
      .catch((reason: AxiosError) => {
        if (reason.response.status === 401) {
          // Handle 400
          this.setState({ authorised: false });
        } else {
          // Handle else
        }
      });
    AdminService.getUsers()
      .then(res => {
        this.setState({ authorised: true });
        let users: any = res.data;
        this.setState({ users: users });
      })
      .catch((reason: AxiosError) => {
        if (reason.response.status === 401) {
          // Handle 400
          this.setState({ authorised: false });
        } else {
          // Handle else
        }
      });
  }

  /**Verifies new organisers*/
  deleteUser(id: number) {
    AdminService.deleteUser(id)
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.log(error));
  }
  deleteOrganiser(id: number) {
    AdminService.deleteOrganiser(id)
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.log(error));
  }
}
