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
};

type Props = {
  match: { params: { id: number } },
};

export default class EventDetailsLoggedIn extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
      riders: [],
    };
  }
  componentDidMount() {
    OrganiserService.getArtists(this.props.match.params.id)
      .then(res => {
        this.setState({ artists: res.data });
        console.log(res);
      })
      .catch(error => {
        alert(error.status);
        window.location = '/404';
      });
    OrganiserService.getEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data;
        this.setState({ event: event });
      })
      .catch(error => console.log(error));

    OrganiserService.getRiders(this.props.match.params.id).then(res => {
      console.log(res.data);
      this.setState({ riders: res.data });
    });
  }
  render() {
    return (
      <div class="card" id="carddetailsevent">
        <div id="loginBox">
          <div id="EventDetailsLITable">
            <img
              id="EventPicLI"
              src={'http://localhost:4000/public/file/' + this.state.event.image}
              class="img-fluid"
              alt="Eventbilde"
            ></img>
            <p class="text display-4">{this.state.event.name}</p>

            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th class="text-right" scope="row">
                    Dato:
                  </th>
                  <td class="text-left">{this.state.event.start}</td>
                  <td class="text-left">{this.state.event.end}</td>
                </tr>
                <tr>
                  <th class="text-right" scope="row">
                    Sted:
                  </th>
                  <td class="text-left">{this.state.event.venue}</td>
                </tr>
                <tr>
                  <th class="text-right" scope="row">
                    Adresse:
                  </th>
                  <td class="text-left">{this.state.event.address}</td>
                </tr>
                <tr>
                  <th class="text-right" scope="row">
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
                  <th class="text-right" scope="row">
                    Kontrakt(er):
                  </th>
                  {this.state.artists.map(artist => (
                    <div>
                      {artist.contract === null ? null : (
                        <td>
                          {artist.artist_name === null ? (
                            <td className="text-left">Ukjent artist</td>
                          ) : (
                            <td className="text-left">{artist.artist_name}</td>
                          )}
                          <DownloadFile fileName={artist.contract} />
                        </td>
                      )}
                    </div>
                  ))}
                </tr>
                <tr>
                  <th class="text-right" scope="row">
                    Riders:
                  </th>
                  {this.state.riders.map(rider => (
                    <div>
                      <td className="text-left">{rider.artist_name}</td>
                      <td className="text-right">
                        <DownloadFile fileName={rider.rider_file} />
                      </td>
                    </div>
                  ))}
                </tr>
                <tr>
                  <th class="text-right" scope="row">
                    Synlig for utenforstående:
                  </th>
                  <td class="text-left">Ja</td>
                </tr>
                <tr>
                  <th class="text-right" scope="row">
                    Status:
                  </th>
                  <td class="text-left">Klar til å gjennomføre</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-success bg-green" onClick={() => this.edit()}>
              {' '}
              ENDRE ARRANGEMENT{' '}
            </button>
            <button class="btn btn-danger bg-green" onClick={() => this.delete()}>
              {' '}
              SLETT ARRANGEMENT{' '}
            </button>
          </div>
        </div>
      </div>
    );
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
