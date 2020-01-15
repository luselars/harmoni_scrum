import * as React from 'react';
import { Component } from 'react';
import ProfileSummary from '../components/profile/ProfileSummary/ProfileSummary';
import EventList from '../components/event/EventList/EventList';
import SearchBar from '../components/SearchBar/SearchBar';

export default class LoggedIn extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProfileSummary />
        <EventList />
      </div>
    );
  }
}
