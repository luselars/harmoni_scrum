//@flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService.js';
import { UserService } from '../../../services/userService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import { PublicService } from '../../../services/publicService';

type State = {
  event: Event,
  artists: [],
  riders: [],
  cancel: number,
  tickets: [],
  pers: [],
  types: [],
  expandNotes: boolean,
  expandStatus: boolean,
  expandDesc: boolean,
};

type Props = {
  match: { params: { id: number } },
};

export default class EventDetailsArtist extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
      riders: [],
      cancel: 0,
      tickets: [],
      pers: [],
      types: [],
      expandNotes: false,
      expandStatus: false,
      expandDesc: false,
    };
  }
  componentDidMount() {
    UserService.getArtists(this.props.match.params.id)
      .then(res => {
        this.setState({ artists: res.data });
      })
      .catch(error => {
        alert(error);
        //window.location = '/404';
      });

    UserService.getEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data[0];
        console.log(event);
        this.setState({
          event: event,
          cancel: event.cancel,
        });
      })
      .catch(error => console.log(error));

    UserService.getRiders(this.props.match.params.id).then(res => {
      console.log(res.data);
      this.setState({ riders: res.data });
    });

    PublicService.getPublicEventTickets(this.props.match.params.id).then(response => {
      this.setState({ tickets: response.data });
    });
  }
  render() {
    return (
      <div>
        <div className="card mb-4" id="carddetailsevent">
          <div id="loginBox">
            {this.state.cancel === 0 ? (
              this.state.event.image !== null ? (
                <div className="imgdiv">
                  <img
                    id="EventPicLI"
                    src={'http://localhost:4000/public/file/' + this.state.event.image}
                    className="img-fluid"
                    alt="Eventbilde"
                  ></img>
                </div>
              ) : (
                <div className="imgdiv">
                  <img
                    id="EventPicLI"
                    src={'http://localhost:4000/public/file/rockband.jpeg'}
                    className="img-fluid"
                    alt="Eventbilde"
                  ></img>
                </div>
              )
            ) : this.state.event.image !== null ? (
              <div className="imgdiv">
                <img
                  id="EventPicLI"
                  src={'http://localhost:4000/public/file/' + this.state.event.image}
                  className="img-fluid cancelimg"
                  alt="Eventbilde"
                ></img>
                <div class="centered">AVLYST</div>
              </div>
            ) : (
              <div className="imgdiv">
                <img id="EventPicLI"></img>
                <div class="centered">AVLYST</div>
              </div>
            )}
            <div id="EventDetailsLITable">
              <p className="titleeventdetails display-4 text-uppercase text-center m-4">
                {this.state.event.name}
              </p>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" scope="row">
                      Start:
                    </th>
                    <td className="text-left">
                      {this.state.event.start ? (
                        this.state.event.start.slice(8, 10) +
                        '/' +
                        this.state.event.start.slice(5, 7) +
                        '/' +
                        this.state.event.start.slice(0, 4) +
                        ' - ' +
                        this.state.event.start.slice(11, 16)
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Slutt:
                    </th>
                    <td className="text-left">
                      {this.state.event.end ? (
                        this.state.event.end.slice(8, 10) +
                        '/' +
                        this.state.event.end.slice(5, 7) +
                        '/' +
                        this.state.event.end.slice(0, 4) +
                        ' - ' +
                        this.state.event.end.slice(11, 16)
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Beskrivelse:
                    </th>
                    {this.state.event.description !== null &&
                    this.state.event.description !== '' ? (
                      <div>
                        {this.state.event.description.length > 45 ? (
                          <div>
                            {this.state.expandDesc === true ? (
                              <td className="text-left">
                                {this.state.event.description}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandDesc: false });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Skjul
                                </a>
                              </td>
                            ) : (
                              <td className="text-left">
                                {this.state.event.description.substring(0, 50)}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandDesc: true });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Vis mer...
                                </a>
                              </td>
                            )}
                          </div>
                        ) : (
                          <td className="text-left">{this.state.event.description}</td>
                        )}
                      </div>
                    ) : (
                      <div>
                        <td className="text-left">-</td>
                      </div>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Lineup:
                    </th>
                    {this.state.artists.length === 0 ? (
                      <td className="text-left">-</td>
                    ) : (
                      this.state.artists.map(artist => (
                        <div>
                          {artist.artist_name === null ? (
                            <td className="text-left">Ukjent artist ({artist.email})</td>
                          ) : (
                            <td className="text-left">{artist.artist_name}</td>
                          )}
                        </div>
                      ))
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Kontrakt:
                    </th>
                    {this.state.event.contract !== null ? (
                      <td className="text-left">
                        <DownloadFile fileName={this.state.event.contract} />
                      </td>
                    ) : (
                      <td className="text-left">Ingen kontrakt lastet opp</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Riders:
                    </th>
                    {this.state.riders.length > 0 ? (
                      <span>
                        {this.state.riders.map(rider => (
                          <div>
                            <td>
                              <DownloadFile fileName={rider.rider_file} />
                            </td>
                          </div>
                        ))}
                      </span>
                    ) : (
                      <div>
                        <td>-</td>
                      </div>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Notat:
                    </th>
                    {this.state.event.notes !== undefined && this.state.event.notes !== null ? (
                      <div>
                        {this.state.event.notes.length > 45 ? (
                          <div>
                            {this.state.expandNotes === true ? (
                              <td className="text-left">
                                {this.state.event.notes}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandNotes: false });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Skjul
                                </a>
                              </td>
                            ) : (
                              <td className="text-left">
                                {this.state.event.notes.substring(0, 50)}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandNotes: true });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Vis mer...
                                </a>
                              </td>
                            )}
                          </div>
                        ) : (
                          <td className="text-left">{this.state.event.notes}</td>
                        )}
                      </div>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Status:
                    </th>
                    {this.state.event.status !== null ? (
                      <div>
                        {this.state.event.status.length > 45 ? (
                          <div>
                            {this.state.expandStatus === true ? (
                              <td className="text-left">
                                {this.state.event.status}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandStatus: false });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Skjul
                                </a>
                              </td>
                            ) : (
                              <td className="text-left">
                                {this.state.event.status.substring(0, 50)}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandStatus: true });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Vis mer...
                                </a>
                              </td>
                            )}
                          </div>
                        ) : (
                          <td className="text-left">{this.state.event.status}</td>
                        )}
                      </div>
                    ) : (
                      <div>
                        <td className="text-left">-</td>
                      </div>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Billetter:
                    </th>
                    {this.state.tickets.length > 0 ? (
                      <div>
                        {this.state.tickets.map(ticket => (
                          <div>
                            <td className="text-left">
                              {ticket.amount} stk. {ticket.name} ({ticket.price} ,-)
                            </td>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>

                  <tr>
                    <th className="text-right" scope="row">
                      Sted:
                    </th>
                    {this.state.event.location_name !== '' &&
                    this.state.event.location_name !== null ? (
                      <td className="text-left">{this.state.event.location_name}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Scene:
                    </th>
                    {this.state.event.venue !== '' && this.state.event.venue !== null ? (
                      <td className="text-left">{this.state.event.venue}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Adresse:
                    </th>
                    {this.state.event.address !== null && this.state.event.address !== '' ? (
                      <td className="text-left">{this.state.event.address}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                </tbody>
              </table>
              {this.state.event.address === null ? (
                <div></div>
              ) : (
                <iframe
                  id="map"
                  width="100%"
                  height="300px"
                  frameborder="0"
                  src={
                    'https://www.google.com/maps/embed/v1/place?q=' +
                    this.state.event.address +
                    ',+' +
                    this.state.event.postcode +
                    '&key=AIzaSyC-75BBbNQpdG9lO2JararmVY5ps_xDAdk'
                  }
                  allowfullscreen
                ></iframe>
              )}
              <button
                className="btn btn-success mx-auto d-block m-2"
                id="editeventbtn"
                onClick={() => this.edit()}
              >
                Endre riders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  edit() {
    window.location.href = '/userevent/edit/' + this.props.match.params.id;
  }
}
