//@flow

import * as React from 'react';
import { Component } from 'react';

import { Event } from '../../../services/modelService.js';
import { OrganiserService } from '../../../services/organiserService';
import DownloadFile from '../../DownloadFile/DownloadFile';

type State = {
  event: Event,
  artists: [],
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
    };
  }
  componentDidMount() {
    OrganiserService.getArtists(this.props.match.params.id).then(resp => {
      this.setState({ artists: resp.data });
      console.log(this.state.artists);
    });
    OrganiserService.getEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data;
        this.setState({ event: event });
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="card" id="carddetailsevent">
        <div id="loginBox">
          <div id="EventDetailsLITable">
            <img
              id="EventPicLI"
              src={'http://localhost:4000/public/file/' + this.state.event.image}
              className="img-fluid"
              alt="Eventbilde"
            ></img>
            <p className="text display-4">{this.state.event.name}</p>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th className="text-right" scope="row">
                    Dato:
                  </th>
                  <td className="text-left">{this.state.event.start}</td>
                  <td className="text-left">{this.state.event.end}</td>
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
                  <th className="text-right" scope="row">
                    Riders:
                  </th>
                  <td className="text-left">Rider.pdf</td>
                </tr>
                <tr>
                  <th className="text-right" scope="row">
                    Synlig for utenforstående:
                  </th>
                  <td className="text-left">Ja</td>
                </tr>
                <tr>
                  <th className="text-right" scope="row">
                    Status:
                  </th>
                  <td className="text-left">Klar til å gjennomføre</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-success bg-green" onClick={() => this.edit()}>
              {' '}
              ENDRE ARRANGEMENT{' '}
            </button>
            <button className="btn btn-danger bg-green" onClick={() => this.delete()}>
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
