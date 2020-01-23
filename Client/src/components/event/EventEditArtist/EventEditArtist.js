//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { User, Event } from '../../../services/modelService';
import { PublicService } from '../../../services/publicService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import UploadContract from '../../Upload/UploadContract';
import UploadRider from '../../Upload/UploadRider';
import { UserService } from '../../../services/userService';

type Props = {
  match: { params: { id: number } },
  onSelectedPage: any,
};
type State = {
  event: Event,
  artist: User,
  riders: [],
};
class EventEditArtist extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artist: new User(),
      riders: [],
    };
  }
  componentDidMount() {
    UserService.getMyProfile().then(resp => {
      this.setState({ artist: resp.data });
      console.log(this.state.artist);
      UserService.getMyRiders(this.props.match.params.id).then(resp => {
        this.setState({ riders: resp.data });
        console.log(this.state.riders);
      });
    });
  }
  publishNotes(notes: string) {
    UserService.putNotes(notes, this.props.match.params.id).then(r => {
      console.log(r);
    });
  }
  render() {
    return (
      <div className="card createEvent" id="cardnewevent">
        <div className="form-group text-center ml-5 mr-5">
          <p className="display-4 text-uppercase text-center m-4 border-bottom">Endre riders</p>
        </div>
        <div className="form-group text-center ml-5 mr-5">
          <div>
            <p>Notater:</p>
            <div>
              <textarea
                defaultValue={this.state.riders[0] !== undefined ? this.state.riders[0].notes : ''}
                class="form-control"
                id="notes"
                rows="3"
                onBlur={e => this.publishNotes(e.target.value)}
              >
                {this.state.artist.notes}
              </textarea>
              <br />
              <UploadRider
                reload={() => this.handleReload()}
                accept={'.pdf'}
                message={'Last opp ridere'}
                artist_id={this.state.artist.user_id}
                event_id={this.props.match.params.id}
                organiser={false}
              />
            </div>
            <br />
          </div>
          {this.state.riders.length > 0 ? <p>Mine ridere:</p> : <p>Ingen riders lastet opp.</p>}
          {this.state.riders.map(rider => (
            <div>
              {rider.email}
              <DownloadFile fileName={rider.rider_file} />
              <button onClick={() => this.deleteRider(rider.rider_id)}>Slett rider</button>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() => {
              window.location = '/userevent/' + this.props.match.params.id;
            }}
            className="btn btn-success"
            id="backbtn"
          >
            Tilbake
          </button>
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
    UserService.deleteRider(rider_id).then(r => {
      console.log(r);
      console.log('sletta du en rider?');
      this.componentDidMount();
    });
  }
}
export default EventEditArtist;
