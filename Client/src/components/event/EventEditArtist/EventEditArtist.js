//@flow

//Component for artist to edit events
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
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
    //Gets event by event_id
    UserService.getEvent(this.props.match.params.id).then(response => {
      let data = response.data;
      this.setState({ event: data });
      console.log(data);

      //Artist gets their own profile
      UserService.getMyProfile().then(resp => {
        this.setState({ artist: resp.data });
        console.log(this.state.artist);
        //Artist gets their own riders by event_id
        UserService.getMyRiders(this.props.match.params.id).then(resp => {
          this.setState({ riders: resp.data });
          console.log(this.state.riders);
        });
      });
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
            <p>Notes for {this.state.artist.name}</p>
            <div>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">
                {this.state.artist.notes}
              </textarea>
              <br />
              {/*Component for uploading riders*/}
              <UploadRider
                reload={() => this.handleReload()}
                accept={'.pdf'}
                message={'Last opp artist-rider'}
                artist_id={this.state.artist.user_id}
                event_id={this.props.match.params.id}
                organiser={false}
              />
            </div>
            <br />
          </div>
          ))}
          {this.state.riders.length > 0 ? <p>Mine riders:</p> : <p>Ingen riders lastet opp.</p>}
          {this.state.riders.map(rider => (
            <div>
              {rider.email}
              {/*Component for downloading riders*/}
              <DownloadFile fileName={rider.rider_file} />
              {/*Button for deleting uploaded riders*/}
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
  //Reloads component
  handleReload = () => {
    console.log('RELOAD');
    this.componentDidMount();
  };

  //Deletes riders
  deleteRider(rider_id: number) {
    console.log(rider_id);
    //Deletes riders by rider_id
    UserService.deleteRider(rider_id).then(r => {
      this.componentDidMount();
    });
  }

  edit() {
    console.log('Jeg er her');
  }
}
export default EventNew5;
