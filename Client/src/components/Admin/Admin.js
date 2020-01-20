// @flow
import * as React from 'react';
import { Component } from 'react';
import { Organiser } from '../../services/modelService';
import { AdminService } from '../../services/adminService';
import './stylesheet.css';

type State = {
  requests: Organiser[],
};

export default class Admin extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }
  render() {
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
  }

  componentDidMount() {
    AdminService.getUnverifed()
      .then(res => {
        let requests: any = res.data;
        console.log(requests);
        this.setState({ requests: requests });
      })
      .catch(error => console.error(error));
  }

  accept(id: number) {
    console.log(id);
    AdminService.verify(id);
  }
}
