// @flow
import * as React from 'react';
import { Component } from 'react';
import { Organiser } from '../../services/modelService';
import './stylesheet.css';

type State = {
  requests: Organiser[],
};

export default class Admin extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="card" id="admincard">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th className="text-right" id="textright" scope="row">
                  <p className="textadmin">juni@juni.no</p>
                </th>
                <td className="text-left" id="textleft">
                  <div className="btnclassadmin">
                    <button type="button" className="btn btn-success adminbtn">
                      Godkjenn
                    </button>
                    <button type="button" className="btn btn-secondary adminbtn">
                      Avslå
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /*componentDidMount() {
                        {this.state.requests.map(req => (

    }*/
}
