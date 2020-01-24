//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Artist, Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import UploadContract from '../../Upload/UploadContract';
import UploadRider from '../../Upload/UploadRider';
import MoreInfo from '../../MoreInfo/MoreInfo';

type Props = {
  onSelectPage: any,
};
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
    if (localStorage.getItem('curr_event') != null) {
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
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <label className="text-center">
            Legg til ridere og notater for artist
            <MoreInfo
              padding={'5px'}
              text={'Ridere og notater vil vises for artisene de gjelder.'}
            />
          </label>

          {this.state.artists.length > 0 ? (
            <div>
              {this.state.artists.map(artist => (
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr className=" text-center">
                      <th scope="col text-center">{artist.email}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=" text-center">
                      <th scope="row">
                        <label>Notater:</label>

                        <textarea
                          className={'form-control mb-4'}
                          id="exampleFormControlTextarea1"
                          rows="3"
                          onBlur={e => this.publishNotes(artist.user_id, e.target.value)}
                        >
                          {artist.notes}
                        </textarea>
                        <UploadRider
                          organiser={true}
                          reload={() => this.handleReload()}
                          accept={'.pdf'}
                          message={'Last opp rider'}
                          artist_id={artist.user_id}
                          event_id={this.state.event.event_id}
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>
              ))}
              {this.state.riders.length > 0 ? (
                <label className="text-center mb-3">Riders til arrangemenetet:</label>
              ) : (
                <label className="text-center mb-3">Ingen riders lastet opp.</label>
              )}
              {this.state.riders.map(rider => (
                <div className="text-center">
                  <label>
                    {rider.email}
                    <DownloadFile fileName={rider.rider_file} />
                  </label>
                  <div
                    onClick={() => {
                      this.deleteRider(rider.rider_id);
                    }}
                  >
                    <i className="fa fa-trash m-0" placeholder="slett" aria-hidden="true"></i>
                    <label className="text-center mb-3">Slett</label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="form-group text-center ml-5 mr-5">
              <p>Ingen artiser lagt til.</p>
            </div>
          )}
          <div className="row justify-content-center">
            <button
              onClick={() => this.next()}
              type="button"
              className="btn btn-success w-50 m-2"
              id="nextbtn"
            >
              Neste
            </button>
            <button
              onClick={() => this.back()}
              type="button"
              className="btn btn-secondary w-50 m-2"
              id="backbtn"
            >
              Tilbake
            </button>
          </div>
        </div>
      </div>
    );
  }
  handleReload = () => {
    console.log('RELOAD');
    this.componentDidMount();
  };
  deleteRider(rider_id: number) {
    console.log(rider_id);
    OrganiserService.deleteRider(this.state.event.event_id, rider_id).then(r => {
      console.log(r);
      this.componentDidMount();
    });
  }
  formatTime() {
    if (this.state.event.start != null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      this.state.event.start = d + ' ' + h + ':00';
    }
    if (this.state.event.end != null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      this.state.event.end = d + ' ' + h + ':00';
    }
  }
  back() {
    this.props.onSelectPage(4);
  }
  next() {
    this.props.onSelectPage(6);
  }
}
export default EventNew5;
