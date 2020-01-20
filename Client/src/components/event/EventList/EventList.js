// @flow
import * as React from 'react';
import {Component} from 'react';
import {OrganiserService} from '../../../services/organiserService';
import {Event} from '../../../services/modelService.js';
import {CommunicationService} from '../../../services/communicationService';
import './stylesheet.css';
import {string} from 'prop-types';
import {PublicService} from '../../../services/publicService';
import {UserService} from '../../../services/userService';
import ReactPaginate from 'react-paginate';

let dates = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
let events: Event[] = [];
let status: boolean;
let event_id: number;

export default class EventList extends Component<Props, State> {
    constructor(props: any, profile_list: boolean, organiser: boolean) {
        super(props);
        this.state = {
            events: [],
            sortMethod: 'e.start',
            status: localStorage.getItem('token') === null,
            organiser_id: 0,
            organiser: organiser,
            offset: 0,
        };
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 7);

        this.setState({offset: offset});
    };

    render() {
        return (
            <div>
                <div>
                    {this.state.events.map((event, index) =>
                        index >= this.state.offset && index - this.state.offset < 7 ? (
                            <div className="card float-right">
                                <div className="card-body bg-light" onClick={() => {
                                    if (this.props.profile_list) (window.location.href = '/orgevent/' + event.event_id)
                                    else (window.location.href = '/event/' + event.event_id)
                                }
                                } style={{cursor: "pointer"}}>
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
                                                            if (this.props.profile_list) (window.location.href = '/orgevent/' + event.event_id)
                                                            else (window.location.href = '/event/' + event.event_id)
                                                        }
                                                        }
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
                </div>
                <div>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
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
        );
    }

    componentDidMount() {
        let sortMethod: string = CommunicationService.getSortString();
        console.log('profile list: ' + this.props.profile_list);
        if (this.props.profile_list) {
            if (this.props.organiser) {
                OrganiserService.getMyEvents()
                    .then(events => {
                        console.log('events: \n\n');
                        console.log(events);
                        this.setState({events: events.data});
                    })
                    .catch((error: Error) => alert(error.message));
            } else {
                UserService.getMyEvents()
                    .then(events => {
                        console.log(events);
                        this.setState({events: events.data});
                    })
                    .catch((error: Error) => alert(error.message));
            }
        } else {
            PublicService.getFrontpage(this.state.sortMethod)
                .then(events => {
                    console.log('welcome to the frontpage');
                    console.log(events);
                    this.setState({
                        events: events.data,
                        pageCount: Math.ceil(events.data.length / 7),
                    });
                })
                .catch((error: Error) => alert(error.message));
        }
    }

    componentWillReceiveProps(props) {
        this.setState({sortMethod: props.sortString});
    }
}
