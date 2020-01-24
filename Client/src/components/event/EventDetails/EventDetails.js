//@flow

//Event details for the public
import * as React from 'react';
import { Component } from 'react';
import { Event, Artist, TicketType } from '../../../services/modelService';
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
  cancel: number,
  tickets: TicketType[],
};

export default class EventDetails extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artist: [],
      venue: '',
      location_name: '',
      cancel: 0,
      tickets: [],
    };
  }
  render() {
    return (
      <div className="card mb-4" id="carddetailsevent">
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
        <p className="titleeventdetails display-4 text-uppercase text-center m-4">
          {this.state.event.name}
        </p>
        <div className="eventdetailstable">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th className="hoyre text-right">Start:</th>
                <td className="venstre text-left">
                  {this.state.event.start_format
                    ? this.state.event.start_format.slice(8, 10) +
                      '/' +
                      this.state.event.start_format.slice(5, 7) +
                      '/' +
                      this.state.event.start_format.slice(0, 4) +
                      ' - ' +
                      this.state.event.start_format.slice(11, 16)
                    : 'Laster'}
                </td>
              </tr>
              <tr>
                <th className="hoyre text-right">Slutt:</th>
                <td className="venstre text-left">
                  {this.state.event.end_format
                    ? this.state.event.end_format.slice(8, 10) +
                      '/' +
                      this.state.event.end_format.slice(5, 7) +
                      '/' +
                      this.state.event.end_format.slice(0, 4) +
                      ' - ' +
                      this.state.event.end_format.slice(11, 16)
                    : 'Laster'}
                </td>
              </tr>
              <tr>
                <th className="hoyre text-right">Sted:</th>
                <td className="venstre text-left">
                  {this.state.event.location_name !== null &&
                  this.state.event.location_name !== undefined &&
                  this.state.event.location_name !== ''
                    ? this.state.event.location_name
                    : 'Kommer senere'}
                </td>
              </tr>
              {this.state.venue !== null &&
              this.state.venue !== '' &&
              this.state.venue !== undefined &&
              this.state.event.location_name !== null &&
              this.state.event.location_name !== undefined ? (
                <tr>
                  <th className="hoyre text-right">Scene:</th>
                  <td className="venstre text-left">{this.state.venue}</td>
                </tr>
              ) : null}
              <tr>
                {this.state.artist.length === 0 ? (
                  <p></p>
                ) : (
                  <th className="hoyre text-right">Lineup:</th>
                )}
                {this.state.artist.map(artist => (
                  <div>
                    <td className="venstre text-left">{artist.artist_name}</td>
                  </div>
                ))}
              </tr>
              <tr>
                {this.state.tickets.length === 0 ? (
                  <p></p>
                ) : (
                  <th className="hoyre text-right">Billetter:</th>
                )}
                {this.state.tickets.map(ticket => (
                  <div>
                    <td className="venstre text-left">
                      {ticket.name} ({ticket.price} ,-)
                    </td>
                  </div>
                ))}
              </tr>
            </tbody>
          </table>
          {this.state.event.address === null ? (
            <></>
          ) : (
            //Inserts adress to google maps
            <iframe
              title="Google maps"
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
    //Gets public event by event_id
    PublicService.getPublicEvent(this.props.match.params.id)
      .then(res => {
        let event: any = res.data[0];
        console.log(res.data[0]);
        this.setState({ cancel: event.cancel });
        if (this.state.event.location_name == null) {
          this.setState({ location_name: '' });
        } else {
          this.setState({ location_name: event.location_name });
        }
        if (this.state.event.eventvenue === null) {
          this.setState({ venue: '' });
        } else {
          this.setState({ venue: event.venue });
        }
        this.setState({ event: event });

        //Gets artist on event by event_id
        PublicService.getPublicArtist(this.state.event.event_id).then(res => {
          let artist: any = res.data;
          this.setState({ artist: artist });
        });

        //Gets tickets on event by event_id
        PublicService.getPublicEventTickets(this.state.event.event_id).then(res => {
          let tickets: any = res.data;
          this.setState({ tickets: tickets });
        });
      })
      .catch(error => console.error(error));
  }
}
