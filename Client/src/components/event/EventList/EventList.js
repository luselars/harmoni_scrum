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
import Filter from '../../Filter/Filter';
import ReactPaginate from 'react-paginate';
import Fuse from 'fuse.js';
var options = {
  keys: ['name', 'description'],
};
let dates = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
let events: Event[] = [];
let status: boolean;
let event_id: number;
let eventsPerPage = 7;

export default class EventList extends Component<Props, State> {
  constructor(props: any, profile_list: boolean, organiser: boolean) {
    super(props);
    this.state = {
      events: [],
      status: localStorage.getItem('token') === null,
      organiser_id: 0,
      organiser: organiser,
      offset: 0,
      showAllEvents: false,
    };
    this.fuse = new Fuse(this.state.events, options);
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * eventsPerPage);
    this.setState({ offset: offset });
  };

  compareAlphabetically(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  compareChronologically(a, b) {
    let aDate = new Date(a.start);
    let bDate = new Date(b.start);
    if (aDate < bDate) {
      return -1;
    }
    if (aDate > bDate) {
      return 1;
    }
    return 0;
  }

  comparePrice(a, b) {
    if (a.min_price < b.min_price) {
      return -1;
    }
    if (a.min_price > b.min_price) {
      return 1;
    }
    return 0;
  }

  handleFilterChange = filterChange => {
    console.log('Filter change ' + filterChange);
    let sortType = filterChange.substring(0, filterChange.length - 2);
    this.setState({ sortMethod: filterChange });
    if (sortType === 'Alfabetisk') {
      this.state.events.sort(this.compareAlphabetically);
    } else if (sortType === 'Tid') {
      this.state.events.sort(this.compareChronologically);
    } else if (sortType === 'Pris') {
      this.state.events.sort(this.comparePrice);
    }
    if (filterChange.charAt(filterChange.length - 1) == '↑') {
      this.state.events.reverse();
    }

    for (let i = 0; i < this.state.events.length; i++)
      console.log(this.state.events[i].start.substring(0, 10));
  };

  handleFilterAlternativChange = filterChange => {
    this.setState({ sortAlt: filterChange });
    if (filterChange[0] === 'viewOld') {
      this.setState({
        events: this.state.allEvents,
        pageCount: Math.ceil(this.state.allEvents.length / eventsPerPage),
        showAllEvents: true,
      });
      this.fuse = new Fuse(this.state.allEvents.data, options);
    } else {
      this.setState({
        events: this.state.upcommingEvents,
        pageCount: Math.ceil(this.state.upcommingEvents.length / eventsPerPage),
        showAllEvents: false,
      });
      this.fuse = new Fuse(this.state.upcommingEvents.data, options);
    }
  };

  handleFilterPriceChange = (filterChange, type) => {
    if (filterChange == '' && type == 'max') filterChange = 999999999999999;
    let previousEventList = this.state.showAllEvents
      ? this.state.allEvents
      : this.state.upcommingEvents;
    let newEventList = [];
    if (type == 'min') {
      for (var i = 0; i < previousEventList.length; i++) {
        if (previousEventList[i].min_price >= filterChange) newEventList.push(previousEventList[i]);
      }
    } else {
      for (var i = 0; i < previousEventList.length; i++) {
        if (previousEventList[i].max_price <= filterChange) newEventList.push(previousEventList[i]);
      }
    }
    this.setState({
      events: newEventList,
      pageCount: Math.ceil(newEventList.length / eventsPerPage),
    });
    this.fuse = new Fuse(newEventList, options);
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <div className="input-group my-3 " id="searchBox">
          <div class="input-group md-form form-sm form-1 pl-0">
            <div class="input-group-prepend">
              <span class="input-group-text purple lighten-3" id="basic-text1">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
            <input
              class="form-control my-0 py-1"
              type="text"
              onChange={e => this.search(e)}
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        <Filter
          handleFilterChange={this.handleFilterChange.bind(this)}
          handleFilterAlternativChange={this.handleFilterAlternativChange.bind(this)}
          handleFilterPriceChange={this.handleFilterPriceChange.bind(this)}
        />
        <div>
          {this.state.events.map((event, index) =>
            index >= this.state.offset && index - this.state.offset < eventsPerPage ? (
              <div className="card float-left">
                <div
                  className="card-body bg-light"
                  onClick={() => {
                    if (this.props.profile_list)
                      window.location.href = '/orgevent/' + event.event_id;
                    else window.location.href = '/event/' + event.event_id;
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="container bg-light">
                    <div className="row justify-content-md-center align-items-center">
                      {event.cancel == 0 ? (
                        <div id="date" className="col-2 text-center">
                          <h3 className="datenumber">{event.start.slice(8, 10)}</h3>
                          <h3 className="datemonth">{dates[event.start.slice(5, 7) - 1]}</h3>
                        </div>
                      ) : (
                        <div id="date" className="col-2 text-center">
                          <h3 className="cancelledtitle">AVLYST</h3>
                        </div>
                      )}
                      <div id="eventinfo" className="col-8">
                        <h5 class="eventtitle">{event.name}</h5>

                        <p className="eventlistp">
                          <a className="eventdescription">Tid: </a>
                          {event.start.slice(11, 16)}
                        </p>
                        <p className="eventlistp">
                          <a className="eventdescription">Sted: </a>
                          {event.venue}
                        </p>
                      </div>
                      <div id="eventbtn" className="col text-right">
                        {this.state.status ? (
                          event.cancel == 0 ? (
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
                              className="btn btn-secondary bg-green"
                              id="moreinfo"
                              onClick={() => (window.location.href = '/event/' + event.event_id)}
                            >
                              {' '}
                              Mer info
                            </button>
                          )
                        ) : event.cancel == 0 ? (
                          <button
                            className="btn btn-success bg-green"
                            id="moreinfo"
                            onClick={() => {
                              if (this.props.profile_list)
                                window.location.href = '/orgevent/' + event.event_id;
                              else window.location.href = '/event/' + event.event_id;
                            }}
                          >
                            {' '}
                            Mer info
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary bg-green"
                            id="moreinfo"
                            onClick={() => {
                              if (this.props.profile_list)
                                window.location.href = '/orgevent/' + event.event_id;
                              else window.location.href = '/event/' + event.event_id;
                            }}
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
            ) : (
              ''
            ),
          )}
          {this.state.pageCount >= 2 ? (
            <div className="card float-right bg-transparent border-0">
              <div className="card-body bg-transparent">
                <div className="row justify-content-md-center align-items-center">
                  <div className="col-12">
                    <div className="reactpaginate">
                      <ReactPaginate
                        previousLabel={<i class="fa fa-angle-left" aria-hidden="true"></i>}
                        nextLabel={<i class="fa fa-angle-right" aria-hidden="true"></i>}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('profile list: ' + this.props.profile_list);
    if (this.props.profile_list) {
      if (this.props.organiser) {
        OrganiserService.getMyEvents()
          .then(events => {
            this.insertEvents(events);
          })
          .catch((error: Error) => alert(error.message));
      } else {
        UserService.getMyEvents()
          .then(events => {
            this.insertEvents(events);
          })
          .catch((error: Error) => alert(error.message));
      }
    } else {
      PublicService.getFrontpage()
        .then(events => {
          this.insertEvents(events);
        })
        .catch((error: Error) => alert(error.message));
    }
  }

  insertEvents(events: Object) {
    console.log(events);
    var today = new Date();
    var time = today.getTime();
    var oldEvents = [];
    var upcommingEvents = [];
    for (var i = 0; i < events.data.length; i++) {
      let jsDate = new Date(events.data[i].end);
      if (time > jsDate.getTime()) {
        events.data[i].old = true;
        oldEvents.push(events.data[i]);
      } else {
        events.data[i].old = false;
        upcommingEvents.push(events.data[i]);
      }
    }
    this.setState({
      oldEvents: oldEvents,
      upcommingEvents: upcommingEvents,
      events: upcommingEvents,
      allEvents: events.data,
      pageCount: Math.ceil(upcommingEvents.length / eventsPerPage),
    });
    this.fuse = new Fuse(upcommingEvents, options);
  }

  search(event) {
    // Updates the state events to search results
    let value: string = event.target.value;
    if (value) {
      console.log(value);
      var searchResults = this.fuse.search(value);
      this.setState({
        events: searchResults,
        pageCount: Math.ceil(searchResults.length / eventsPerPage),
      });
    } else {
      // If there is no search string it resets the eventlist
      let events = this.state.showAllEvents ? this.state.allEvents : this.state.upcommingEvents;
      this.setState({
        events: events,
        pageCount: Math.ceil(events.length / eventsPerPage),
      });
    }
  }
}
