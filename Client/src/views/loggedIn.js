import * as React from 'react';
import { Component } from 'react';
import EventList from '../components/event/EventList/EventList';

/** Class for myevents view. */
export default class LoggedIn extends Component {
  render() {
    return (
      <div>
        <EventList profile_list={true} />
      </div>
    );
  }
}
