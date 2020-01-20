import * as React from 'react';
import { Component } from 'react';
//import Footer from '../components/Footer/Footer';
//import Menu from '../components/Menu/Menu';
import EventList from '../components/event/EventList/EventList';
import Filter from '../components/Filter/Filter';
import SearchBar from '../components/SearchBar/SearchBar';
import filterStore from '../services/filterStore';
import { string } from 'prop-types';

type State = {
  sortOption: string,
};
export default class Main extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: 'e.start',
    };
  }
  setFilter = data => {
    this.setState({ sortOption: data });
    console.log(this.state.sortOption);
  };
  componentDidMount(): void {}

  render() {
    return (
      <div className="main">
        <SearchBar />
        <Filter setFilter={this.setFilter} />
        <EventList sortMethod={this.state.sortOption} />
      </div>
    );
  }
}
