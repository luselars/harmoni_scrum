import * as React from 'react';
import { Component } from 'react';
import EventList from '../EventList/EventList';

export default class SortedEventList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEventList = this.handleEventList.bind(this);
    this.state = {
      sortString: 'e.start',
    };
  }
  render() {
    <div>
      <Filter onChange={this.handleFilter(target.value)}></Filter>
      <EventList></EventList>
    </div>;
  }

  handleFilter(sortString: string) {
    this.setState((this.state.sortString = sortString)).then(
      this.handleEventList(this.state.sortString),
    );
  }

  handleEventList = () => {
    this.setState({ sortString: this.state.sortString });
  };
}
