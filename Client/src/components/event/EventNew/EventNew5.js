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

/**Component for fifth page on creating a new event */
class EventNew5 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
      riders: [],
    };
  }

  /**Updates localStorage and gets event, artists and riders  */
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        OrganiserService.getArtists(data.event_id).then(resp => {
          this.setState({ artists: resp.data });
        });
        OrganiserService.getRiders(data.event_id).then(resp => {
          this.setState({ riders: resp.data });
        });
      });
    }
  }
  /** Publish rider notes and updates server*/
  publishNotes(artist_id: number, notes: string) {
    for (let i = 0; i < this.state.artists.length; i++) {
      if (this.state.artists[i].user_id === artist_id) {
        let temp_art = this.state.artists[i];
        temp_art.notes = notes;
        OrganiserService.updateArtistEvent(temp_art, this.state.event.event_id).then(r => {});
      }
    }
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h4 className="text-center">
            Legg til ridere og notater for artist
            <MoreInfo
              padding={'5px'}
              text={'Ridere og notater vil vises for artisene de gjelder.'}
            />
          </h4>

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
                <h4 className="text-center mb-3">Riders til arrangemenetet:</h4>
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
                    className="row"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="col-6 float-right">
                      <label></label>
                      <i
                        className="fa fa-trash float-right"
                        placeholder="slett"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="col-6 float-left">
                      <label className="text-center float-left">Slett</label>
                      <label></label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="form-group text-center ml-5 mr-5">
              <p>Ingen artiser lagt til.</p>
            </div>
          )}
          <button
            onClick={() => this.next()}
            type="button"
            className="btn btn-success col-sm-4 m-2 d-block mx-auto"
            id="nextbtn"
          >
            Neste
          </button>
          <button
            onClick={() => this.back()}
            type="button"
            className="btn btn-secondary col-sm-4 m-2 d-block mx-auto"
            id="backbtn"
          >
            Tilbake
          </button>
        </div>
      </div>
    );
  }

  /**Reloads components */
  handleReload = () => {
    this.componentDidMount();
  };

  /**Deletes riders and reloads component */
  deleteRider(rider_id: number) {
    OrganiserService.deleteRider(this.state.event.event_id, rider_id).then(r => {
      this.componentDidMount();
    });
  }

  /**Returns to previous page */
  back() {
    this.props.onSelectPage(4);
  }

  /**Sends user to next page */
  next() {
    this.props.onSelectPage(6);
  }
}
export default EventNew5;
