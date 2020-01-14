// @flow

import * as React from 'react';
import { Component } from 'react';
import { Event, EventService } from '../../../services/EventService';
import { CommunicationService } from '../../../services/communicationService';
import './stylesheet.css';
import { string } from 'prop-types';

let dates = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
let events: Event[] = [];

export default class EventList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      events: [],
      sortMethod: string,
    };
  }
  render() {
    return (
      <div>
        {this.state.events.map(event => (
          <div class="card">
            <div class="card-body bg-light">
              <div class="container bg-light">
                <div class="row justify-content-md-center align-items-center">
                  <div id="date" class="col-2 text-center">
                    <h3>{event.start.slice(8, 10)}</h3>
                    <h3>{dates[event.start.slice(5, 7) - 1]}</h3>
                  </div>
                  <div id="eventinfo" class="col-8">
                    <h5>{event.name}</h5>
                    <p>
                      <a class="eventdescription">Sted: </a>
                      {event.venue}
                    </p>
                    <p>
                      <a class="eventdescription">Tid: </a>kl {event.start.slice(11, 16)} den{' '}
                      {event.start.slice(8, 10)}/{event.start.slice(5, 7)}/{event.start.slice(0, 4)}
                    </p>
                  </div>
                  <div id="eventbtn" class="col text-right">
                    <button class="btn btn-success bg-green"> Mer info</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  componentDidMount() {
    let sortMethod: string = CommunicationService.getSortString();
    EventService.getFrontpage(this.state.sortMethod)
      .then(events => {
        console.log(events);
        this.setState({ events: events.data });
      })
      .catch((error: Error) => alert(error.message));
  }
  componentWillReceiveProps(props) {
    this.setState({ sortMethod: props.sortString });
  }
}
