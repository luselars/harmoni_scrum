import * as React from 'react';
import { Component } from 'react';
//import Footer from '../components/Footer/Footer';
//import Menu from '../components/Menu/Menu';
import EventList from '../components/event/EventList/EventList';
//import ProfileOrganiser from '../components/profile/ProfileOrganiser/ProfileOrganiser';
//import Filter from '../components/Filter/Filter';
//import SearchBar from '../components/SearchBar/SearchBar';
//import filterStore from '../services/filterStore';
//import { string } from 'prop-types';

export default class Main extends Component<{}, State> {
  render() {
    return (
      <div className="main">
        <EventList profile_list={false} />
      </div>
    );
  }
}
