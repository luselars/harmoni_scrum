//@flow
import React from 'react';
import { Component } from 'react';

import { string } from 'prop-types';
import { Artist, Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import UploadContract from '../../Upload/UploadContract';

class EventNew5 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
    };
  }
  componentDidMount(): * {
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
      });
    }
  }
  updateNotes(artist: Artist) {
    let notes = document.getElementById(artist.user_id).value;
    console.log(notes);
    let temp_art = artist;
    temp_art.notes = notes;
    OrganiserService.updateArtistEvent(temp_art, this.state.event.event_id).then(r => {
      console.log(r);
      window.location.reload();
    });
  }
  render() {
    return (
      <div className="createEvent">
        <h2>Opprett arrangement</h2>
        {/*<form>*/}
        <div className="form-row">
          <p>Legg til ridere for artist:</p>
          <p>Dette kommer, foreløpig er det bare notes.</p>
        </div>
        <div className="form-group text-center ml-5 mr-5">
          {this.state.artists.map(artist => (
            <div>
              <p>Notes for {artist.email}</p>
              <div>
                <textarea id={artist.user_id}>{artist.notes}</textarea>
                <button onClick={() => this.updateNotes(artist)}>Lagre</button>
              </div>
              <br />
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => this.back()} className="btn btn-success" id="backbtn">
            Tilbake
          </button>
          <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
            Fullfør
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
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
    window.location = '/profile';
  }
}
export default EventNew5;
