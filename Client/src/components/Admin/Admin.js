// @flow
import * as React from 'react';
import { Component } from 'react';
import { Organiser } from '../../services/modelService';
import { AdminService } from '../../services/adminService';
import './stylesheet.css';
import { NotAuthorized } from '../NotAuthorized/NotAuthorized';

const { axios, AxiosError } = require('axios');

type State = {
  requests: Organiser[],
  authorised: boolean,
};

export default class Admin extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      requests: [],
      authorised: true,
    };
  }
  render() {
    console.log(this.state.authorised);
    if (this.state.authorised) {
      return (
        <div>
          <div className="card display-4 text-center" id="admincard">
            Administrer
          </div>
          {this.state.requests.map(req => (
            <div className="card" id="admincard">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" id="textright" scope="row">
                      <p className="display-4 textadmin">{req.organiser_email}</p>
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
      return <NotAuthorized />;
    }
  }

  componentDidMount() {
    AdminService.getUnverifed()
      .then(res => {
        this.setState({ authorised: true });
        console.log(res.status);
        let requests: any = res.data;
        console.log(requests + ' ');
        this.setState({ requests: requests });
      })
      .catch((reason: AxiosError) => {
        if (reason.response.status === 401) {
          // Handle 400
          this.setState({ authorised: false });
          console.log('401 error');
        } else {
          console.log(reason.message);
          // Handle else
        }
        console.log(reason.message);
      });
  }

  accept(id: number) {
    console.log(id);
    AdminService.verify(id);
  }
}
