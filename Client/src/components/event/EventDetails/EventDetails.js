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
};

export default class EventDetails extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artist: [],
    };
  }
  render() {
    return (
      <div className="card" id="carddetailsevent">
        <div className="imgdiv">
          <img
            src={'http://localhost:4000/public/file/' + this.state.event.image}
            className="img-fluid"
            alt="Eventbilde"
          ></img>
        </div>
        <p className="titleeventdetails display-4 text-uppercase text-center m-4">
          {this.state.event.name}
        </p>
        <div id="EventDetailsTable">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th className="text-right" id="textright" scope="row">
                  Tid:
                </th>
                <td className="text-left" id="textleft">
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
                <th className="text-right" id="textright" scope="row">
                  Sted:
                </th>
                <td className="text-left" id="textleft">
                  {this.state.event.location_name == undefined &&
                  this.state.event.venue != undefined
                    ? this.state.event.venue
                    : this.state.event.venue == undefined &&
                      this.state.event.location_name != undefined
                    ? this.state.event.location_name
                    : this.state.event.location_name + ', ' + this.state.event.venue}
                </td>
              </tr>
              <tr>
                {this.state.artist.length == 0 ? (
                  <p></p>
                ) : (
                  <th className="text-right" id="textright" scope="row">
                    Lineup:
                  </th>
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
        this.setState({ event: event });

        PublicService.getPublicArtist(this.state.event.event_id).then(res => {
          let artist: any = res.data;
          console.log(res.data);
          this.setState({ artist: artist });
        });
      })
      .catch(error => console.error(error));
  }
}
