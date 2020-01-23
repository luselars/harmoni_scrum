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
  onSelectPage: any,
};
class EventNew5 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artist: new User(),
      riders: [],
    };
  }
  componentDidMount() {
    PublicService.getPublicEvent(this.props.match.params.id).then(response => {
      let data = response.data;
      this.setState({ event: data });
      UserService.getMyProfile().then(resp => {
        this.setState({ artist: resp.data });
        console.log(this.state.artist);
      });
      UserService.getMyRiders(data.event_id).then(resp => {
        this.setState({ riders: resp.data });
        console.log(this.state.riders);
      });
    });

    /*publishNotes(artist_id: number, notes: string) {
    for (let i = 0; i < this.state.artists.length; i++) {
      if (this.state.artists[i].user_id === artist_id) {
        let temp_art = this.state.artists[i];
        temp_art.notes = notes;
        console.log(notes);
        OrganiserService.updateArtistEvent(temp_art, this.state.event.event_id).then(r => {
          console.log(r);
        });
      }
    }*/
  }
  render() {
    return (
      <div className="card createEvent" id="cardnewevent">
        <div className="form-group text-center ml-5 mr-5">
          <p className="display-4 text-uppercase text-center m-4 border-bottom">Endre riders</p>
        </div>
        <div className="form-group text-center ml-5 mr-5">
          <div>
            <p>Notes for {this.state.artist.name}</p>
            <div>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                //onBlur={e => this.publishNotes(this.artist.user_id, e.target.value)}
              >
                {this.state.artist.notes}
              </textarea>
              <br />
              <UploadRider
                reload={() => this.handleReload()}
                accept={'.pdf'}
                message={'Last opp artist-rider'}
                artist_id={this.state.artist.user_id}
                event_id={this.state.event.event_id}
                artist={true}
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
              <button onClick={() => this.deleteRider(rider.rider_id)}>Slett rider</button>
            </div>
          ))}
        </div>

        <div>
          <button onClick={() => this.edit()} className="btn btn-success" id="backbtn">
            Lagre
          </button>
        </div>
      </div>
    );
  }
  handleReload = () => {
    console.log('RELOAD');
    this.componentDidMount();
  };
  /*deleteRider(rider_id: number) {
    console.log(rider_id);
    OrganiserService.deleteRider(this.state.event.event_id, rider_id).then(r => {
      console.log(r);
      this.componentDidMount();
    });
  }*/

  edit() {
    console.log('Jeg er her');
  }
}
export default EventNew5;
