//@flow

import * as React from 'react';
import { Component } from 'react';
import { Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import './stylesheet.css';

type Props = {
  match: { params: { id: number } },
};

type State = {
  event: Event,
};

export default class EventDetails extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
    };
  }
  render() {
    return (
      <div id="loginBox">
        <img
          src="https://i.ytimg.com/vi/5Cy_KvI2nME/maxresdefault.jpg"
          class="img-fluid"
          alt="Eventbilde"
        ></img>
        <p id="EventDetailsText">{this.state.event.name}</p>
        <div id="EventDetailsTable">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th class="text-right" scope="row">
                  Dato:
                </th>
                <td class="text-left">{this.state.event.start}</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Sted:
                </th>
                <td class="text-left">{this.state.event.venue}</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Lineup:
                </th>
                <td class="text-left">JB</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Pris:
                </th>
                <td class="text-left">KOMMER SENERE</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-success bg-green"> KJØP BILLETT </button>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    OrganiserService.getPublicEvent(this.props.match.params.id)
      .then(res => {
        let event: Event = res;
        console.log(res);
        this.setState({ event: event });
      })
      .catch(error => console.error(error));
  }
}
