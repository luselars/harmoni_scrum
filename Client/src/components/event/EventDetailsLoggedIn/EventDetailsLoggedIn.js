//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService.js';
import { OrganiserService } from '../../../services/organiserService';
import DownloadFile from '../../DownloadFile/DownloadFile';

type State = {
  event: Event,
  artists: [],
  riders: [],
  cancel: number,
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
        this.setState({ artists: res.data });
      })
      .catch(error => {
        if (error == 'Error: Request failed with status code 404') {
          window.location = '/404';
        } else {
          alert(error);
          window.location = '/404';
        }
      });
    OrganiserService.getEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data;
        console.log(event.cancel);
        this.setState({
          event: event,
          cancel: event.cancel,
        });
      })
      .catch(error => console.log(error));

    OrganiserService.getRiders(this.props.match.params.id).then(res => {
      console.log(res.data);
      this.setState({ riders: res.data });
    });
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
        <div id="myModal2" className="modal">
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
        <div className="card" id="carddetailsevent">
          <div id="loginBox">
            <div className="imgdiv">
              <img
                id="EventPicLI"
                src={'http://localhost:4000/public/file/' + this.state.event.image}
                className="img-fluid"
                alt="Eventbilde"
              ></img>
            </div>
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
                      {this.state.event.start
                        ? this.state.event.start.slice(8, 10) +
                          '/' +
                          this.state.event.start.slice(5, 7) +
                          '/' +
                          this.state.event.start.slice(0, 4) +
                          ' - ' +
                          this.state.event.start.slice(11, 16)
                        : 'Laster'}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Slutt:
                    </th>
                    <td className="text-left">
                      {this.state.event.end
                        ? this.state.event.end.slice(8, 10) +
                          '/' +
                          this.state.event.end.slice(5, 7) +
                          '/' +
                          this.state.event.end.slice(0, 4) +
                          ' - ' +
                          this.state.event.end.slice(11, 16)
                        : 'Laster'}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Sted:
                    </th>
                    <td className="text-left">{this.state.event.venue}</td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Adresse:
                    </th>
                    <td className="text-left">{this.state.event.address}</td>
                  </tr>
                </tbody>
              </table>
              {this.state.event.address == null ? (
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
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" scope="row">
                      Lineup:
                    </th>
                    {this.state.artists.length === null ? (
                      <td className="text-left">Ingen artister lagt til</td>
                    ) : (
                      this.state.artists.map(artist => (
                        <div>
                          {artist.artist_name === null ? (
                            <td className="text-left">Ukjent artist</td>
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
                    {this.state.artists.map(artist => (
                      <div>
                        {artist.contract === null ? (
                          <div>
                            {artist.artist_name === null ? (
                              <td className="text-left">Ukjent artist: </td>
                            ) : (
                              <td className="text-left">{artist.artist_name}: </td>
                            )}
                            <tr>
                              <td className="text-left">Ingen kontrakt lastet opp</td>
                            </tr>
                          </div>
                        ) : (
                          <div>
                            {artist.artist_name === null ? (
                              <td className="text-left">Ukjent artist: </td>
                            ) : (
                              <td className="text-left">{artist.artist_name}: </td>
                            )}
                            <tr>
                              <td calssName="text-left">
                                <DownloadFile fileName={artist.contract} />
                              </td>
                            </tr>
                          </div>
                        )}
                      </div>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Riders:
                    </th>
                    {this.state.riders.length > 0 ? (
                      <span>
                        {this.state.riders.map(rider => (
                          <div>
                            <td className="text-left">{rider.artist_name}</td>
                            <td className="text-right">
                              <DownloadFile fileName={rider.rider_file} />
                            </td>
                          </div>
                        ))}
                      </span>
                    ) : (
                      <div>
                        <td>Ingen ridere lagt til</td>
                      </div>
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
                    {this.state.event.status !== null ? (
                      <div>
                        <td className="text-left">{this.state.event.status}</td>
                      </div>
                    ) : (
                      <div>
                        <td className="text-left">Ingen status satt</td>
                      </div>
                    )}
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-success mx-auto d-block m-2"
                id="editeventbtn"
                onClick={() => this.edit()}
              >
                Endre
              </button>
              <button
                className="btn btn-secondary mx-auto d-block m-2"
                id="cancelbtn"
                onClick={() => this.btnclicked('cancelbtn')}
              >
                Avlys
              </button>
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
    if (id == 'deleteeventbtn') {
      var btn = document.getElementById('deleteeventbtn');
      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName('close')[0];
      var cancel = document.getElementById('cancel');
      modal.style.display = 'block';
      span.onclick = function() {
        modal.style.display = 'none';
      };
      cancel.onclick = function() {
        modal.style.display = 'none';
      };
    } else {
      var btn = document.getElementById('cancelbtn');
      var modal = document.getElementById('myModal2');
      var span = document.getElementsByClassName('close2')[0];
      var cancel = document.getElementById('cancel2');
      modal.style.display = 'block';
      span.onclick = function() {
        modal.style.display = 'none';
      };
      cancel.onclick = function() {
        modal.style.display = 'none';
        console.log('heihiii');
      };
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }

      cancel.onclick = function() {
        modal.style.display = 'none';
      };
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    };
  }

  cancel() {
    this.setState({ cancel: 1 });
    OrganiserService.updateEvent(this.state.event).then(response => {
      console.log('done');
      console.log(this.state.event.cancel);
    });
  }

  edit() {
    localStorage.setItem('curr_event', this.state.event.event_id);
    window.location = '/newevent';
  }
  delete() {
    OrganiserService.deleteEvent(this.props.match.params.id)
      .then(response => {
        window.location = '/eventdeleted';
      })
      .catch(error => console.error(error));
  }
}
