// @flow
import * as React from 'react';
import { Component } from 'react';
import { OrganiserService } from '../../../services/organiserService';
import './stylesheet.css';
import { PublicService } from '../../../services/publicService';
import { UserService } from '../../../services/userService';
import Filter from '../../Filter/Filter';
import ReactPaginate from 'react-paginate';
import Fuse from 'fuse.js';

let options = {
  keys: ['name', 'location_name'],
};
let dates = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];

type Props = {
  profile_list: boolean,
  organiser: boolean,
  fuse: any,
};

type State = {
  events: [],
  oldEvents: [],
  canceledEvents: [],
  status: boolean,
  organiser_id: number,
  organiser: boolean,
  offset: number,
  eventsPerPage: number,
};

/**Component for displaying all events in a list */
export default class EventList extends Component<Props, State> {
  constructor(props: any, profile_list: boolean, organiser: boolean) {
    super(props);
    let sortType = localStorage.getItem('sortType') != null ? localStorage.getItem('sortType') : '';
    let sortAlt = ['', ''];
    let minprice = '';
    let maxprice = '';
    if (localStorage.getItem('viewOld') === 'true') sortAlt[0] = 'viewOld';
    if (localStorage.getItem('viewCanceled') === 'true') sortAlt[1] = 'viewCanceled';
    if (localStorage.getItem('minprice') != null)
      minprice = parseInt(localStorage.getItem('minprice'));
    if (localStorage.getItem('maxprice') != null)
      maxprice = parseInt(localStorage.getItem('maxprice'));

    this.state = {
      events: [],
      oldEvents: [],
      canceledEvents: [],
      status: localStorage.getItem('token') === null,
      organiser_id: 0,
      organiser: organiser,
      offset: 0,
      eventsPerPage: 7,
      sortType: sortType,
      sortAlt: sortAlt,
      minprice: minprice,
      maxprice: maxprice,
      currentPage:
        localStorage.getItem('page') != null ? parseInt(localStorage.getItem('page')) : 0,
    };
    const fuse = new Fuse(this.state.events, options);
  }

  /**Handles page navigations*/
  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.eventsPerPage);
    this.setState({ offset: offset, currentPage: selected });
    localStorage.setItem('page', selected);
  };

  /*Sorts events alphavetically*/
  compareAlphabetically(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  /*Sorts events by date*/
  compareChronologically(a, b) {
    let aDate = new Date(a.start_format);
    let bDate = new Date(b.start_format);
    if (aDate < bDate) {
      return -1;
    }
    if (aDate > bDate) {
      return 1;
    }
    return 0;
  }

  /**Sorts events by prices*/
  comparePrice(a, b) {
    if (a.min_price < b.min_price) {
      return -1;
    }
    if (a.min_price > b.min_price) {
      return 1;
    }
    return 0;
  }

  /**Handles the different sort methodes*/
  handleFilterChange = filterChange => {
    localStorage.setItem('sortType', filterChange);
    let sortType = filterChange.substring(0, filterChange.length - 2);
    this.setState({ sortMethod: filterChange });
    if (sortType === 'Alfabetisk') {
      this.state.events.sort(this.compareAlphabetically);
    } else if (sortType === 'Tid') {
      this.state.events.sort(this.compareChronologically);
    } else if (sortType === 'Pris') {
      this.state.events.sort(this.comparePrice);
    }
    if (filterChange.charAt(filterChange.length - 1) === '↑') {
      this.state.events.reverse();
    }
  };

  /**Handles filter alternatives - View old and View cancelled*/
  handleFilterAlternativChange = filterChange => {
    this.setState({ sortAlt: filterChange });
    if (filterChange[0] === 'viewOld') {
      this.state.viewOld = true;
      localStorage.setItem('viewOld', 'true');
    } else {
      this.state.viewOld = false;
      localStorage.setItem('viewOld', 'false');
    }
    if (filterChange[1] === 'viewCanceled') {
      this.state.viewCanceled = true;
      localStorage.setItem('viewCanceled', 'true');
    } else {
      this.state.viewCanceled = false;
      localStorage.setItem('viewCanceled', 'false');
    }
    var tempEvents = [...this.state.upcommingEvents];
    if (this.state.viewOld)
      for (var i = 0; i < this.state.oldEvents.length; i++)
        tempEvents.push(this.state.oldEvents[i]);
    if (this.state.viewCanceled)
      for (var i = 0; i < this.state.canceledEvents.length; i++)
        tempEvents.push(this.state.canceledEvents[i]);

    this.setState({
      events: tempEvents,
      pageCount: Math.ceil(tempEvents.length / this.state.eventsPerPage),
    });
    this.fuse = new Fuse(tempEvents, options);
    // Go to first page
    this.handlePageClick({ selected: 0 });
  };

  /**Filter events by price*/
  handleFilterPriceChange = (filterChange, type) => {
    if (filterChange === '' && type === 'max') filterChange = 999999999999999;
    let previousEventList = this.state.showAllEvents
      ? this.state.allEvents
      : this.state.upcommingEvents;
    let newEventList = [];
    if (type === 'min') {
      for (var i = 0; i < previousEventList.length; i++) {
        if (previousEventList[i].max_price >= filterChange) newEventList.push(previousEventList[i]);
      }
    } else {
      for (var i = 0; i < previousEventList.length; i++) {
        if (previousEventList[i].min_price <= filterChange) newEventList.push(previousEventList[i]);
      }
    }
    this.setState({
      events: newEventList,
      pageCount: Math.ceil(newEventList.length / this.state.eventsPerPage),
    });
    this.fuse = new Fuse(newEventList, options);
    // Go to first page
    this.handlePageClick({ selected: 0 });
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        {!this.props.profile_list ? <div></div> : <p className="display-4">Dine arrangementer</p>}
        <div className="input-group my-3 justify-content-md-center" id="searchBox">
          <div className="input-group md-form form-sm form-1 pl-0" style={{ width: '80%' }}>
            <div className="input-group-prepend">
              <span className="input-group-text purple lighten-3" id="basic-text1">
                <i className="fa fa-search" aria-hidden="true" />
              </span>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              onChange={e => this.search(e)}
              placeholder="Søk"
              aria-label="Søk"
            />
          </div>
        </div>
        {/*Uses the Filter component to cooparate with the eventlist*/}
        <Filter
          handleFilterChange={this.handleFilterChange.bind(this)}
          handleFilterAlternativChange={this.handleFilterAlternativChange.bind(this)}
          handleFilterPriceChange={this.handleFilterPriceChange.bind(this)}
          profile_list={this.props.profile_list}
        />
        <div>
          {this.state.events.map((event, index) =>
            index >= this.state.offset && index - this.state.offset < this.state.eventsPerPage ? (
              <div className="card float-right my-2 bg-light p-2" id="cardEvents">
                <div
                  className="card-body bg-light"
                  onClick={() => {
                    if (!this.props.profile_list) window.location.href = '/event/' + event.event_id;
                    else if (localStorage.getItem('userType') === 'organiser')
                      window.location.href = '/orgevent/' + event.event_id;
                    else window.location.href = '/userevent/' + event.event_id;
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="container bg-light">
                    <div className="row justify-content-md-center align-items-center">
                      {event.cancel === 0 ? (
                        <div id="date" className="col-2 text-center">
                          <h3 className="datenumber">{event.start_format.slice(8, 10)}</h3>
                          <h3 className="datemonth">{dates[event.start_format.slice(5, 7) - 1]}</h3>
                        </div>
                      ) : (
                        <div id="date" className="col-2 text-center">
                          <h3 className="cancelledtitle">AVLYST</h3>
                        </div>
                      )}
                      <div id="eventinfo" className="col-8">
                        <h5 className="eventtitle">{event.name}</h5>

                        <p className="eventlistp">
                          <a className="eventdescription">Tid: </a>
                          {event.start_format.slice(11, 16)}
                        </p>
                        <p className="eventlistp">
                          <a className="eventdescription">Sted: </a>
                          {event.location_name !== null &&
                          event.location_name !== undefined &&
                          event.location_name !== ''
                            ? event.location_name
                            : 'Kommer senere'}
                        </p>
                      </div>
                      <div id="eventbtn" className="col text-right">
                        {this.state.status ? (
                          event.cancel === 0 ? (
                            <button
                              className="btn btn-success bg-green m-2"
                              id="moreinfo"
                              onClick={() => (window.location.href = '/event/' + event.event_id)}
                            >
                              {' '}
                              Mer info
                            </button>
                          ) : (
                            <button
                              className="btn btn-success bg-grey m-2"
                              id="moreinfo"
                              onClick={() => (window.location.href = '/event/' + event.event_id)}
                            >
                              {' '}
                              Mer info
                            </button>
                          )
                        ) : event.cancel === 0 ? (
                          <button
                            className="btn btn-success bg-green"
                            id="moreinfo"
                            onClick={() => {
                              if (!this.props.profile_list)
                                window.location.href = '/event/' + event.event_id;
                              else if (localStorage.getItem('userType') === 'organiser')
                                window.location.href = '/orgevent/' + event.event_id;
                              else window.location.href = '/userevent/' + event.event_id;
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
                              if (!this.props.profile_list)
                                window.location.href = '/event/' + event.event_id;
                              else if (localStorage.getItem('userType') === 'organiser')
                                window.location.href = '/orgevent/' + event.event_id;
                              else window.location.href = '/userevent/' + event.event_id;
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
          {/*Handles the page counter*/}
          {this.state.pageCount >= 2 ? (
            <div className="card float-right bg-transparent border-0">
              <div className="card-body bg-transparent">
                <div className="col-12">
                  <div className="reactpaginate">
                    <ReactPaginate
                      previousLabel={<i className="fa fa-angle-left" aria-hidden="true" />}
                      nextLabel={<i className="fa fa-angle-right" aria-hidden="true" />}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                      forcePage={this.state.currentPage}
                    />
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
  /**Gets new token from auth server and gets my events
   */
  componentDidMount() {
    // Gets new token from auth server
    PublicService.refreshToken();
    if (this.props.profile_list) {
      if (localStorage.getItem('userType') === 'organiser') {
        //Gets my events if the user is an organiser
        OrganiserService.getMyEvents()
          .then(events => {
            this.insertEvents(events);
          })
          .catch((error: Error) => alert(error.message));
      } else {
        //Gets mye event if the user is not an ograniser
        UserService.getMyEventsArtist()
          .then(aEvents => {
            UserService.getMyEventsVolunteer()
              .then(vEvents => {
                this.insertUserEvents(aEvents, vEvents);
              })
              .catch((error: Error) => alert(error.message));
          })
          .catch((error: Error) => alert(error.message));
      }
    } else {
      //Gets events for the frontpage
      PublicService.getFrontpage()
        .then(events => {
          this.insertEvents(events);
        })
        .catch((error: Error) => alert(error.message));
    }
  }

  /**Inserts the events to the eventlist*/
  insertEvents(events: Object) {
    var today = new Date();
    var time = today.getTime();
    var oldEvents = [];
    var canceledEvents = [];
    var upcommingEvents = [];
    for (var i = 0; i < events.data.length; i++) {
      let jsDate = new Date(events.data[i].end_format);
      if (time > jsDate.getTime()) {
        events.data[i].old = true;
        oldEvents.push(events.data[i]);
      } else if (events.data[i].cancel === 1) {
        events.data[i].old = false;
        canceledEvents.push(events.data[i]);
      } else {
        events.data[i].old = false;
        upcommingEvents.push(events.data[i]);
      }
    }
    this.setState({
      oldEvents: oldEvents,
      upcommingEvents: upcommingEvents,
      canceledEvents: canceledEvents,
      events: upcommingEvents,
      pageCount: Math.ceil(upcommingEvents.length / this.state.eventsPerPage),
    });
    this.fuse = new Fuse(upcommingEvents, options);
    this.getFilterStateFromLocalStorage();
  }

  /**Inserts current filter status to localStorage*/
  insertUserEvents(aEvents: Object, vEvents: Object) {
    var today = new Date();
    var time = today.getTime();
    var oldEvents = [];
    var canceledEvents = [];
    var upcommingEvents = [];
    for (var i = 0; i < aEvents.data.length; i++) {
      let jsDate = new Date(aEvents.data[i].end);
      aEvents.data[i].name = 'Artist: ' + aEvents.data[i].name;
      if (time > jsDate.getTime()) {
        aEvents.data[i].old = true;
        oldEvents.push(aEvents.data[i]);
      } else if (aEvents.data[i].cancel === 1) {
        aEvents.data[i].old = false;
        canceledEvents.push(aEvents.data[i]);
      } else {
        aEvents.data[i].old = false;
        upcommingEvents.push(aEvents.data[i]);
      }
    }
    for (var i = 0; i < vEvents.data.length; i++) {
      let jsDate = new Date(vEvents.data[i].end);
      vEvents.data[i].name = vEvents.data[i].name + ': ' + vEvents.data[i].event_name;
      if (time > jsDate.getTime()) {
        vEvents.data[i].old = true;
        oldEvents.push(vEvents.data[i]);
      } else if (vEvents.data[i].cancel === 1) {
        vEvents.data[i].old = false;
        canceledEvents.push(vEvents.data[i]);
      } else {
        vEvents.data[i].old = false;
        upcommingEvents.push(vEvents.data[i]);
      }
    }
    this.setState({
      oldEvents: oldEvents,
      upcommingEvents: upcommingEvents,
      canceledEvents: canceledEvents,
      events: upcommingEvents,
      pageCount: Math.ceil(upcommingEvents.length / this.state.eventsPerPage),
    });
    this.fuse = new Fuse(upcommingEvents, options);
    this.getFilterStateFromLocalStorage();
  }

  getFilterStateFromLocalStorage() {
    this.handleFilterChange(this.state.sortType);
    this.handleFilterAlternativChange(this.state.sortAlt);
    if (!isNaN(this.state.minprice) && this.state.minprice != '')
      this.handleFilterPriceChange(this.state.minprice, 'min');
    if (!isNaN(this.state.maxprice) && this.state.maxprice != '')
      this.handleFilterPriceChange(this.state.maxprice, 'max');
  }

  /**Searches through all events in the event list
   */
  search(event) {
    // Go to first page
    this.handlePageClick({ selected: 0 });
    let value: string = event.target.value;
    if (value) {
      if (typeof this.fuse == 'undefined') return;
      var searchResults = this.fuse.search(value);
      this.setState({
        events: searchResults,
        pageCount: Math.ceil(searchResults.length / this.state.eventsPerPage),
      });
    } else {
      // If there is no search string it resets the eventlist
      var tempEvents = [...this.state.upcommingEvents];
      if (this.state.viewOld)
        for (var i = 0; i < this.state.oldEvents.length; i++)
          tempEvents.push(this.state.oldEvents[i]);
      if (this.state.viewCanceled)
        for (var i = 0; i < this.state.canceledEvents.length; i++)
          tempEvents.push(this.state.canceledEvents[i]);
      this.setState({
        events: tempEvents,
        pageCount: Math.ceil(tempEvents.length / this.state.eventsPerPage),
      });
    }
  }
}
