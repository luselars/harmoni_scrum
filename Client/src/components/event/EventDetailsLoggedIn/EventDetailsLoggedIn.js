//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService.js';
import { OrganiserService } from '../../../services/organiserService';

type State = {
  event: Event,
};

type Props = {
  match: { params: { id: number } },
};

export default class EventDetailsLoggedIn extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
    };
  }
  render() {
    return (
      <div id="loginBox">
        <div id="EventDetailsLITable">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th class="text-right" scope="row">
                  Arrangementnavn:
                </th>
                <td class="text-left">{this.state.event.name}</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Dato:
                </th>
                <td class="text-left">{this.state.event.start}</td>
                <td class="text-left">{this.state.event.end}</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Sted:
                </th>
                <td class="text-left">{this.state.event.venue}</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Adresse:
                </th>
                <td class="text-left">{this.state.event.address}</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Lineup:
                </th>
                <td class="text-left">Justin BIIIIBER</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Kontrakt(er):
                </th>
                <td class="text-left">Kontrakt.pdf</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Riders:
                </th>
                <td class="text-left">Rider.pdf</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Synlig for utenforstående:
                </th>
                <td class="text-left">Ja</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Status:
                </th>
                <td class="text-left">Klar til å gjennomføre</td>
              </tr>
              <tr>
                <th class="text-right" scope="row">
                  Bilde:
                </th>
                <td class="text-left">
                  <img
                    id="EventPicLI"
                    src={'http://localhost:4000/user/file/' + this.state.event.image}
                    class="img-fluid"
                    alt="Eventbilde"
                  ></img>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-success bg-green"> ENDRE ARRANGEMENT </button>
      </div>
    );
  }

  componentDidMount() {
    OrganiserService.getEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data;
        console.log(res);
        console.log('Navn: ' + this.state.event.name);
        this.setState({ event: event });
      })
      .catch(error => console.error(error));
  }
}
