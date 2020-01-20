//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { Artist, Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import UploadContract from '../../Upload/UploadContract';
import UploadRider from '../../Upload/UploadRider';

class EventNew5 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
      riders: [],
    };
  }
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') !== null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        this.formatTime();
        OrganiserService.getArtists(data.event_id).then(resp => {
          this.setState({ artists: resp.data });
          console.log(this.state.artists);
        });
        OrganiserService.getRiders(data.event_id).then(resp => {
          this.setState({ riders: resp.data });
          console.log(this.state.riders);
        });
      });
    }
  }
  publishNotes(artist_id: number, notes: string) {
    for (let i = 0; i < this.state.artists.length; i++) {
      if (this.state.artists[i].user_id === artist_id) {
        let temp_art = this.state.artists[i];
        temp_art.notes = notes;
        console.log(notes);
        OrganiserService.updateArtistEvent(temp_art, this.state.event.event_id).then(r => {
          console.log(r);
        });
      }
    }
  }
  render() {
    return (
      <div className="createEvent" id="cardnewevent">
        <h2 className="neweventtitle">Opprett arrangement</h2>
        {/*<form>*/}
        <div className="form-group text-center ml-5 mr-5">
          <p>Legg til ridere for artist: </p>
        </div>
        {this.state.artists.length > 0 ? (
          <div className="form-group text-center ml-5 mr-5">
            {this.state.artists.map(artist => (
              <div>
                <p>Notes for {artist.email}</p>
                <div>
                  <textarea onBlur={e => this.publishNotes(artist.user_id, e.target.value)}>
                    {artist.notes}
                  </textarea>
                  <br />
                  <UploadRider
                    accept={'.pdf'}
                    message={'Last opp artist-rider'}
                    artist_id={artist.user_id}
                    event_id={this.state.event.event_id}
                  />
                </div>
                <br />
              </div>
            ))}
            {this.state.riders.length > 0 ? <p>Mine riders:</p> : <p>Ingen riders lastet opp.</p>}
            {this.state.riders.map(rider => (
              <div>
                {rider.email}
                <DownloadFile fileName={rider.rider_file} />
                <button
                  onClick={() => {
                    this.deleteRider(rider.rider_id);
                  }}
                >
                  Slett rider
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="form-group text-center ml-5 mr-5">
            <p>Ingen artiser lagt til.</p>
          </div>
        )}
        <div>
          <button onClick={() => this.back()} className="btn btn-success" id="backbtn">
            Tilbake
          </button>
          <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
            Neste
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
  }
  deleteRider(rider_id: number) {
    OrganiserService.deleteRider(this.state.event.event_id, rider_id).then(r => {
      console.log(r);
      window.location.reload();
    });
  }
  formatTime() {
    if (this.state.event.start !== null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      this.state.event.start = d + ' ' + h + ':00';
    }
    if (this.state.event.end !== null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      this.state.event.end = d + ' ' + h + ':00';
    }
  }
  back() {
    window.location = '/newevent4';
  }
  next() {
    window.location = '/newevent6';
  }
}
export default EventNew5;
