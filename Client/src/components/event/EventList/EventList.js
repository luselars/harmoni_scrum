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
    if (a.start < b.start) {
      return -1;
    }
    if (a.start > b.start) {
      return 1;
    }
    return 0;
  }

  // TODO BLI FERDIG HER
  handleFilterChange = filterChange => {
    if (Array.isArray(filterChange)) {
      this.setState({ sortAlt: filterChange });
      if (filterChange[0] === 'viewOld') {
      } else {
      }
    } else {
      this.setState({ sortMethod: filterChange });
      if (filterChange == 'alphabetical') {
        this.state.events.sort(this.compareAlphabetically);
        this.state.allEvents.sort(this.compareAlphabetically);
      } else if (filterChange == 'time') {
        this.state.events.sort(this.compareChronologically);
        this.state.allEvents.sort(this.compareChronologically);
      }
    }
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
        <Filter handleFilterChange={this.handleFilterChange.bind(this)} />
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
                      <div id="date" className="col-2 text-center">
                        <h3 className="datenumber">{event.start.slice(8, 10)}</h3>
                        <h3 className="datemonth">{dates[event.start.slice(5, 7) - 1]}</h3>
                      </div>
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
            this.setState({
              events: events.data,
              allEvents: events.data,
              pageCount: Math.ceil(events.data.length / eventsPerPage),
            });
            this.fuse = new Fuse(events.data, options);
          })
          .catch((error: Error) => alert(error.message));
      } else {
        UserService.getMyEvents()
          .then(events => {
            this.setState({
              events: events.data,
              allEvents: events.data,
              pageCount: Math.ceil(events.data.length / eventsPerPage),
            });
            this.fuse = new Fuse(events.data, options);
          })
          .catch((error: Error) => alert(error.message));
      }
    } else {
      PublicService.getFrontpage()
        .then(events => {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth();
          var yy = today.getYear();
          var oldEvents = [];
          var upcommingEvents = [];
          for (var i = 0; i < events.data.length; i++) {
            console.log(events.data[i].start);
            console.log(dd + '-' + mm + '-' + yy);
            //if(events[i].start >)
          }
          this.setState({
            events: events.data,
            allEvents: events.data,
            pageCount: Math.ceil(events.data.length / eventsPerPage),
          });
          this.fuse = new Fuse(events.data, options);
        })
        .catch((error: Error) => alert(error.message));
    }
  }
  /*
  componentWillReceiveProps(props) {
    this.setState({ filterChange: props.sortString });
  }
  */
  search(event) {
    // Updates the state events to search results
    let value: string = event.target.value;
    if (value) {
      var searchResults = this.fuse.search(value);
      this.setState({
        events: searchResults,
        pageCount: Math.ceil(searchResults.length / eventsPerPage),
      });
    } else {
      // If there is no search string it resets the eventlist
      this.setState({
        events: this.state.allEvents,
        pageCount: Math.ceil(this.state.allEvents.length / eventsPerPage),
      });
    }
  }
}
