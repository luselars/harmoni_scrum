//@flow

//Component for artist to edit events
import React, { Component } from 'react';
import './stylesheet.css';
import { Event, User } from '../../../services/modelService';
import DownloadFile from '../../DownloadFile/DownloadFile';
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
      UserService.getMyRiders(this.props.match.params.id).then(resp => {
        this.setState({ riders: resp.data });
      });
    });
  }
  publishNotes(notes: string) {
    UserService.putNotes(notes, this.props.match.params.id).then(r => {});
  }
  render() {
    return (
      <div className="card createEvent" id="cardnewevent">
        <div className="form-group text-center ml-5 mr-5">
          <p className="display-4 text-uppercase text-center m-4 border-bottom">Endre riders</p>
        </div>
        <div className="form-group text-center ml-5 mr-5">
          <div>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr className=" text-center">
                  <th scope="col text-center">Endre dine riders</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <p>Notater: </p>
                  <textarea
                    defaultValue={
                      this.state.riders[0] !== undefined ? this.state.riders[0].notes : ''
                    }
                    class={'form-control w-75 d-block mx-auto'}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onBlur={e => this.publishNotes(e.target.value)}
                  >
                    {this.state.riders.notes}
                  </textarea>
                  <br />
                  {/*Component for uploading riders*/}
                  <UploadRider
                    reload={() => this.handleReload()}
                    accept={'.pdf'}
                    message={'Last opp ridere'}
                    artist_id={this.state.artist.user_id}
                    event_id={this.props.match.params.id}
                    organiser={false}
                  />
                </tr>
                <br />
              </tbody>
            </table>
          </div>

          <table className="table  table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col text-center">Dine riders</th>
              </tr>
            </thead>
            <tbody>
              {this.state.riders.map(rider => (
                <tr>
                  <td>
                    <p className="float-left ml-5">
                      {/*Component for downloading riders*/}
                      <DownloadFile fileName={rider.rider_file} />
                      {/*Button for deleting uploaded riders*/}
                    </p>
                    <div className="float-right mr-5">
                      <button
                        onClick={() => {
                          this.deleteRider(rider.rider_id);
                        }}
                        className="btn btn-seacondary float-right"
                      >
                        <i className="fa fa-trash m-0" placeholder="slett" aria-hidden="true"></i>
                        Fjern
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <button
            onClick={() => {
              window.location = '/userevent/' + this.props.match.params.id;
            }}
            className="btn btn-success mx-auto d-block m-2"
            id="editeventbtn"
          >
            Rediger
          </button>
          <button
            onClick={() => {
              window.location = '/userevent/' + this.props.match.params.id;
            }}
            className="btn btn-secondary mx-auto d-block m-2"
            id="editeventbtn"
          >
            Tilbake
          </button>
        </div>
      </div>
    );
  }
  //Reloads component
  handleReload = () => {
    this.componentDidMount();
  };

  //Deletes riders
  deleteRider(rider_id: number) {
    //Deletes riders by rider_id
    UserService.deleteRider(rider_id).then(r => {
      this.componentDidMount();
    });
  }
}
export default EventEditArtist;
