//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService.js';
import { OrganiserService } from '../../../services/organiserService';
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
  expandNotes: [],
  expandStatus: boolean,
};

type Props = {
  match: { params: { id: number } },
};

/**Shows detailed details about events - Available for organisers only*/
export default class EventDetailsLoggedIn extends Component<Props, State> {
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
      expandNotes: [],
      expandStatus: false,
    };
  }

  /**Gets event, all artists, riders, tickets and staff by event_id */
  componentDidMount() {
    //Gets all artist by event_id
    OrganiserService.getArtists(this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        this.setState({ artists: res.data });
      })
      .catch(error => {
        if (error === 'Error: Request failed with status code 404') {
          window.location = '/404';
        } else {
          alert(error);
          window.location = '/404';
        }
      });
    //Gets event by event_id
    OrganiserService.getEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data;
        console.log(event);
        this.setState({
          event: event,
          cancel: event.cancel,
        });
      })
      .catch(error => console.log(error));
    //Gets riders to event by event_id
    OrganiserService.getRiders(this.props.match.params.id).then(res => {
      this.setState({ riders: res.data });
    });
    //Gets tickets by event_id
    PublicService.getPublicEventTickets(this.props.match.params.id).then(response => {
      this.setState({ tickets: response.data });
    });

    //Gets staffs tasks by event_id
    OrganiserService.getVolunteerType().then(response => {
      this.setState({ types: response.data });
    });
    //Gets staff by event_id
    OrganiserService.getMyVolunteers(this.props.match.params.id).then(response => {
      this.setState({ pers: response.data });
    });
  }

  /**Cheks if artists exists
   * Returns "Unknown Artist" if not
   */
  getArtistName(artist): string {
    if (
      artist.artist_name === '' ||
      artist.artist_name === null ||
      artist.artist_name === undefined
    ) {
      return 'Ukjent artist (' + artist.email + ')';
    } else {
      return artist.artist_name;
    }
  }
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        {/*Inserts modals for warnings when pressing delete and cancel buttons*/}
        <div id="myModal" className="modal" role="dialog" aria-hidden="true">
          <div className="modal-content">
            <span className="close">&times;</span>
            <div className="modalbody">
              <p className="border-bottom">Vil du slette arrangementet?</p>
              <button className="btn btn-success modalbtn" id="cancel">
                Avbryt
              </button>
              <button className="btn btn-secondary modalbtn" onClick={() => this.delete()}>
                Slett
              </button>
            </div>
          </div>
        </div>
        <div id="myModal2" className="modal" role="dialog">
          <div className="modal-content">
            <span className="close2">&times;</span>
            <div className="modalbody">
              <p className="border-bottom">Vil du avlyse arrangementet?</p>
              <button className="btn btn-success modalbtn" id="cancel2">
                Avbryt
              </button>
              <button className="btn btn-secondary modalbtn" onClick={() => this.cancel()}>
                Avlys
              </button>
            </div>
          </div>
        </div>
        <div className="card mb-4" id="carddetailsevent">
          <div id="loginBox">
            {/*Checks if events are cancelled or not*/}
            {this.state.cancel == 0 ? (
              //Checks if event has an event image
              this.state.event.image == null ? (
                ''
              ) : (
                <div className="imgdiv">
                  <img
                    id="EventPicLI"
                    src={'http://localhost:4000/public/file/' + this.state.event.image}
                    className="img-fluid"
                    alt="Eventbilde"
                  ></img>
                </div>
              )
            ) : this.state.event.image != null ? (
              <div className="imgdiv">
                <img
                  id="EventPicLI"
                  src={'http://localhost:4000/public/file/' + this.state.event.image}
                  className="img-fluid canceling"
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
                      {this.state.event.start_format ? (
                        this.state.event.start_format.slice(8, 10) +
                        '/' +
                        this.state.event.start_format.slice(5, 7) +
                        '/' +
                        this.state.event.start_format.slice(0, 4) +
                        ' - ' +
                        this.state.event.start_format.slice(11, 16)
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
                      {this.state.event.end_format ? (
                        this.state.event.end_format.slice(8, 10) +
                        '/' +
                        this.state.event.end_format.slice(5, 7) +
                        '/' +
                        this.state.event.end_format.slice(0, 4) +
                        ' - ' +
                        this.state.event.end_format.slice(11, 16)
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
                      Kontrakter:
                    </th>
                    {this.state.artists.reduce(
                      (total, curr) => total + (curr.contract != null ? 1 : 0),
                      0,
                    ) > 0 ? (
                      <table>
                        {this.state.artists.map(artist => (
                          <div>
                            {artist.contract === null ? null : (
                              <div>
                                <tr>
                                  {artist.artist_name === null ? (
                                    <td className="text-left">Ukjent artist ({artist.email}): </td>
                                  ) : (
                                    <td className="text-left">{artist.artist_name}: </td>
                                  )}
                                  <td className="text-left">
                                    {/*Uses Downloadfile Component to publish contracts*/}
                                    <DownloadFile fileName={artist.contract} />
                                  </td>
                                </tr>
                              </div>
                            )}
                          </div>
                        ))}
                      </table>
                    ) : (
                      <table>
                        <tr>
                          <td className="text-left">-</td>
                        </tr>
                      </table>
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
                            {rider.artist_name === null ? (
                              <td className="text-left">Ukjent artist ({rider.email}): </td>
                            ) : (
                              <td className="text-left">{rider.artist_name}: </td>
                            )}
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
                      Notater
                    </th>
                    {this.state.artists.reduce(
                      (total, curr) => total + (curr.notes != null ? 1 : 0),
                      0,
                    ) > 0 ? (
                      <div>
                        {this.state.artists.map((artist, index) => (
                          <div>
                            {artist.notes != null && artist.notes !== '' ? (
                              <div>
                                {artist.notes.length > 45 ? (
                                  <div>
                                    {this.state.expandNotes[index] === true ? (
                                      <td className="text-left">
                                        {this.getArtistName(artist)}: {artist.notes}{' '}
                                        <a
                                          onClick={() => {
                                            let exp = this.state.expandNotes;
                                            exp[index] = false;
                                            this.setState({ expandNotes: exp });
                                          }}
                                          style={{ cursor: 'pointer', color: 'blue' }}
                                        >
                                          Skjul
                                        </a>
                                      </td>
                                    ) : (
                                      <td className="text-left">
                                        {this.getArtistName(artist)}:{' '}
                                        {artist.notes.substring(0, 50)}{' '}
                                        <a
                                          onClick={() => {
                                            let exp = this.state.expandNotes;
                                            exp[index] = true;
                                            this.setState({ expandNotes: exp });
                                          }}
                                          style={{ cursor: 'pointer', color: 'blue' }}
                                        >
                                          Vis mer...
                                        </a>
                                      </td>
                                    )}
                                  </div>
                                ) : (
                                  <td className="text-left">
                                    {this.getArtistName(artist)}: {artist.notes}
                                  </td>
                                )}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <td className="text-left">-</td>
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
                      Personell:
                    </th>
                    {this.state.pers.length > 0 ? (
                      <table>
                        {this.state.types.map(type => (
                          <div>
                            {this.state.pers.filter(c => c.volunteer_type === type.name).length >
                            0 ? (
                              <div>
                                <tr>
                                  <td style={{ fontWeight: 'bold' }} className="text-left">
                                    {type.name}:
                                  </td>
                                </tr>
                                <tr>
                                  {this.state.pers
                                    .filter(c => c.volunteer_type === type.name)
                                    .map(p => (
                                      <td className="text-left">{p.email}</td>
                                    ))}
                                </tr>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </table>
                    ) : (
                      <table>
                        <td className="text-left">-</td>
                      </table>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Offentlig:
                    </th>
                    <td className="text-left">
                      {this.state.event.is_public === 1 ? <span>Ja</span> : <span>Nei</span>}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Status:
                    </th>
                    {this.state.event.status != null ? (
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
                //Inserts adress to google maps
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
                Endre
              </button>
              {this.state.event.cancel === 0 ? (
                <button
                  className="btn btn-secondary mx-auto d-block m-2"
                  id="cancelbtn"
                  onClick={() => this.btnclicked('cancelbtn')}
                >
                  Avlys
                </button>
              ) : (
                <button
                  className="btn btn-secondary mx-auto d-block m-2"
                  id="cancelbtn"
                  onClick={() => this.cancel()}
                >
                  Gjenopprett
                </button>
              )}
              <button
                className="btn btn-secondary mx-auto d-block m-2"
                id="deleteeventbtn"
                onClick={() => this.btnclicked('deleteeventbtn')}
              >
                <i className="fa fa-trash" aria-hidden="true"></i> Slett
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**Sets up modal when cancel- or delete-button id pressed*/
  btnclicked(id: string) {
    if (id === 'deleteeventbtn') {
      let btn = document.getElementById('deleteeventbtn');
      let modal = document.getElementById('myModal');
      let span = document.getElementsByClassName('close')[0];
      let cancel = document.getElementById('cancel');
      //dette er en sjekk for å ikke få Flow(InferError), ikke fjern den hvis det ikke løses på en annen måte/den ikke er et problem
      if (modal && cancel instanceof HTMLElement) {
        modal.style.display = 'block';
        span.onclick = function() {
          modal.style.display = 'none';
        };
        cancel.onclick = function() {
          modal.style.display = 'none';
        };
      }
    } else {
      let btn = document.getElementById('cancelbtn');
      let modal = document.getElementById('myModal2');
      let span = document.getElementsByClassName('close2')[0];
      let cancel = document.getElementById('cancel2');
      //dette er en sjekk for å ikke få Flow(InferError), ikke fjern den hvis det ikke løses på en annen måte/den ikke er et problem
      if (modal && cancel && btn instanceof HTMLElement) {
        modal.style.display = 'block';
        span.onclick = function() {
          modal.style.display = 'none';
        };
        cancel.onclick = function() {
          modal.style.display = 'none';
          console.log('heihiii');
        };
        //la til denne, tror den manglet
        btn.onclick = function() {
          modal.style.display = 'none';
        };
      }
    }
    window.onclick = function(event) {
      if (event.target.className === 'modal') {
        event.target.style.display = 'none';
      }
      window.onclick = function(event) {
        if (event.target.className === 'modal') {
          //modal.style.display = 'none';
          event.target.style.display = 'none';
        }
      };
    };
  }

  /**Cancels/Restores event*/
  cancel() {
    OrganiserService.toggleCancel(this.state.event.event_id).then(response => {
      window.location = '/orgevent/' + this.state.event.event_id;
    });
  }

  /**Adds the current event to localStorage and relocates the user to /editevent*/
  edit() {
    localStorage.setItem('curr_event', this.state.event.event_id);
    window.location = '/editevent';
  }

  /**Deletes event by event_id*/
  delete() {
    OrganiserService.deleteEvent(this.props.match.params.id)
      .then(response => {
        window.location = '/eventdeleted';
      })
      .catch(error => console.error(error));
  }
}
