// @flow
import * as React from 'react';
import { Component } from 'react';
import { OrganiserService } from '../../../services/organiserService';
import { Event } from '../../../services/modelService.js';
import { CommunicationService } from '../../../services/communicationService';
import './stylesheet.css';
import { string } from 'prop-types';
import { PublicService } from '../../../services/publicService';
import { UserService } from '../../../services/userService';

let dates = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
let events: Event[] = [];
let status: boolean;
let event_id: number;


export default class EventList extends Component<Props, State> {
  constructor(props: any, profile_list: boolean, organiser: boolean) {
    super(props);
    this.state = {
      events: [],
      sortMethod: 'e.start',
      status: localStorage.getItem('token') === null,
      organiser_id: 0,
      organiser: organiser,
    };
  }
  render() {
    return (
      <div>
        {this.state.events.map(event => (
          <div className="card">
            <div className="card-body bg-light">
              <div className="container bg-light">
                <div className="row justify-content-md-center align-items-center">
                  <div id="date" className="col-2 text-center">
                    <h3 className="datenumber">{event.start.slice(8, 10)}</h3>
                    <h3 className="datemonth">{dates[event.start.slice(5, 7) - 1]}</h3>
                  </div>
                  <div id="eventinfo" className="col-8">
                    <h5 class="eventtitle">{event.name}</h5>
                    <p className="eventlistp">
                      <a className="eventdescription">Sted: </a>
                      {event.venue}
                    </p>
                    <p className="eventlistp">
                      <a className="eventdescription">Tid: </a>kl {event.start.slice(11, 16)} den{' '}
                      {event.start.slice(8, 10)}/{event.start.slice(5, 7)}/{event.start.slice(0, 4)}
                    </p>
                  </div>
                  <div id="eventbtn" className="col text-right">
                    {this.state.status ? (
                      <button
                        className="btn btn-success bg-green"
                        id="moreinfo"
                        onClick={() => (window.location.href = '/event/' + event.event_id)}
                      >
                        {' '}
                        Mer info
                      </button>
                    ) : (
                      <button
                        className="btn btn-success bg-green"
                        id="moreinfo"
                        onClick={() => (window.location.href = '/orgevent/' + this.state.id)}
                      >
                        {' '}
                        Mer info
                      </button>
                    )}
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
    console.log("profile list: " + this.props.profile_list)
    if (this.props.profile_list) {
      if (this.props.organiser) {
        OrganiserService.getMyEvents()
          .then(events => {
            console.log(events);
            this.setState({ events: events.data });
          })
          .catch((error: Error) => alert(error.message));
      } else {
        UserService.getMyEvents()
          .then(events => {
            console.log(events);
            this.setState({ events: events.data });
          })
          .catch((error: Error) => alert(error.message));
      }
    } else {
      PublicService.getFrontpage(this.state.sortMethod)
        .then(events => {
          console.log(events);
          this.setState({ events: events.data });
        })
        .catch((error: Error) => alert(error.message));
    }
  }
  componentWillReceiveProps(props) {
    this.setState({ sortMethod: props.sortString });
  }
}
