import * as React from 'react';
import { Component } from 'react';
//import Footer from '../components/Footer/Footer';
//import Menu from '../components/Menu/Menu';
import EventList from '../components/event/EventList/EventList';
//import ProfileOrganiser from '../components/profile/ProfileOrganiser/ProfileOrganiser';
import Filter from '../components/Filter/Filter';
import SearchBar from '../components/SearchBar/SearchBar';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <div>
          <div className="d-flex flex-row flex-wrap mb-2">
            <div className="">
              <Filter />
            </div>
            <div className="flex-grow-1">
              <EventList profile_list={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
