//@flow

import * as React from 'react';
import { Component } from 'react';
import { Event, Artist } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import { PublicService } from '../../../services/publicService';
import './stylesheet.css';

type Props = {
  match: { params: { id: number } },
};

type State = {
  event: Event,
  artist: Artist[],
  venue: string,
  location_name: string,
};

export default class EventDetails extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artist: [],
      venue: '',
      location_name: '',
    };
  }
  render() {
    return (
      <div className="card" id="carddetailsevent">
        <div className="imgdiv">
          {this.state.event.image == undefined ? (
            <img
              src={'http://localhost:4000/public/file/' + this.state.event.image}
              className="img-fluid"
              alt="Eventbilde"
              id="eventdetailsimg"
            ></img>
          ) : (
            <div></div>
          )}
        </div>
        <p className="titleeventdetails display-4 text-uppercase text-center m-4">
          {this.state.event.name}
        </p>
        <div className="eventdetailstable">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th className="hoyre text-right">Tid:</th>
                <td className="venstre text-left">
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
                <th className="hoyre text-right">Sted:</th>
                <td className="venstre text-left">
                  {this.state.location_name.length == 0 && this.state.venue.length != 0
                    ? this.state.venue
                    : this.state.venue.length == 0 && this.state.location_name.length != 0
                    ? this.state.location_name
                    : this.state.location_name + ', ' + this.state.venue}
                </td>
              </tr>
              <tr>
                {this.state.artist.length == 0 ? (
                  <p></p>
                ) : (
                  <th className="hoyre text-right">Lineup:</th>
                )}
                {this.state.artist.map(artist => (
                  <p className="artistmap">{artist.artist_name}</p>
                ))}
              </tr>
            </tbody>
          </table>
          {this.state.event.address == null ? (
            <></>
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
        </div>
        <div className="btndivevent">
          <button className="btn btn-success bg-green" onClick={() => (window.location.href = '/')}>
            Tilbake
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    PublicService.getPublicEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data[0];
        console.log(res.data[0]);
        this.setState({ event: event, location_name: event.location_name, venue: event.venue });

        PublicService.getPublicArtist(this.state.event.event_id).then(res => {
          let artist: any = res.data;
          console.log(res.data);
          this.setState({ artist: artist });
        });
      })
      .catch(error => console.error(error));
  }
}
