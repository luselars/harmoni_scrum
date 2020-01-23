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

//<{match: { params: {id: number}}},{props: {event: Event, artists: [], riders: []}}>

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

    {
      /*this.state = {
      event: new Event(),
      artists: [],
      riders: [],
    };*/
    }
  }
  componentDidMount() {
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

    OrganiserService.getRiders(this.props.match.params.id).then(res => {
      this.setState({ riders: res.data });
    });
    PublicService.getPublicEventTickets(this.props.match.params.id).then(response => {
      this.setState({ tickets: response.data });
    });
    OrganiserService.getVolunteerType().then(response => {
      this.setState({ types: response.data });
    });
    OrganiserService.getMyVolunteers(this.props.match.params.id).then(response => {
      this.setState({ pers: response.data });
    });
  }
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
            {this.state.cancel === 0 ? (
              this.state.event.image != null ? (
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
                    {this.state.event.description != null && this.state.event.description !== '' ? (
                      <td className="text-left">{this.state.event.description}</td>
                    ) : (
                      <td className="text-left">-</td>
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
                    {this.state.event.venue !== '' && this.state.event.venue != null ? (
                      <td className="text-left">{this.state.event.venue}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Adresse:
                    </th>
                    {this.state.event.address != null && this.state.event.address !== '' ? (
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
        //modal.style.display = 'none';
        event.target.style.display = 'none';
      }
      {
        /* ganske sikker på at denne er unødvendig nå, etter at jeg fikset btn.onClick() over her
      let cancel = document.getElementById('cancel2');
      if(cancel instanceof HTMLElement) {
        cancel.onclick = function() {
          modal.style.display = 'none';
        };
      }*/
      }
      window.onclick = function(event) {
        if (event.target.className === 'modal') {
          //modal.style.display = 'none';
          event.target.style.display = 'none';
        }
      };
    };
  }

  cancel() {
    OrganiserService.toggleCancel(this.state.event.event_id).then(response => {
      window.location = '/orgevent/' + this.state.event.event_id;
      console.log('done');
      console.log(this.state.event.cancel);
    });
  }

  edit() {
    localStorage.setItem('curr_event', this.state.event.event_id);
    window.location = '/editevent';
  }
  delete() {
    OrganiserService.deleteEvent(this.props.match.params.id)
      .then(response => {
        window.location = '/eventdeleted';
      })
      .catch(error => console.error(error));
  }
}
