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
  requests: Organiser[],
  authorised: boolean,
};

/** The Component for accepting new organiseres*/
export default class Admin extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      requests: [],
      authorised: true,
    };
  }
  render() {
    if (this.state.authorised) {
      return (
        <div>
          <div className="card display-4 text-center" id="admincard">
            Godkjenn arrangører
          </div>
          {this.state.requests.map(req => (
            <div className="card" id="admincard">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" id="textright" scope="row">
                      <p className="textadmin">{req.organiser_email}</p>
                    </th>
                    <td className="text-left" id="textleft">
                      <div className="btnclassadmin">
                        <button
                          type="button"
                          className="btn btn-success adminbtn"
                          onClick={() => this.accept(req.organiser_id)}
                        >
                          Godkjenn
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
    AdminService.getUnverifed()
      .then(res => {
        this.setState({ authorised: true });
        let requests: any = res.data;
        this.setState({ requests: requests });
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
  accept(id: number) {
    AdminService.verify(id).then(() => {
      window.location.reload();
    });
  }
}
