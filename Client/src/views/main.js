import * as React from 'react';
import { Component } from 'react';
import EventList from '../components/event/EventList/EventList';

export default class Main extends Component<{}, State> {
  render() {
    return (
      <div className="main">
        <EventList profile_list={false} />
      </div>
    );
  }
}
