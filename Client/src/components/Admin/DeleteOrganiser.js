// @flow

import * as React from 'react';
import { Component } from 'react';
import { Organiser } from '../../services/modelService';
import { AdminService } from '../../services/adminService';
import './stylesheet.css';
import { NotAuthorized } from '../NotAuthorized/NotAuthorized';

/**Interpret axios errors */
const { AxiosError } = require('axios');

type State = {
  organiser: Organiser[],
  authorised: boolean,
};

/** The Component for deleting organiseres*/
export default class DeleteOrganiser extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      organiser: [],
      authorised: true,
    };
  }
  render() {
    if (this.state.authorised) {
      return (
        <div>
          <div className="card display-4 text-center" id="admincard">
            Administrer
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
                          onClick={() => this.delete(org.organiser_id)}
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
    AdminService.getAll()
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
  }

  /**Verifies new organisers*/
  delete(id: number) {
    AdminService.verify(id);
  }
}
