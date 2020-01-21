//@flow
import React, { Component } from 'react';
import { OrganiserService } from '../../services/organiserService';
import { Artist } from '../../services/modelService';

let path = require('path');

type Props = {
  accept: string,
  message: string,
  artist: Artist,
  event_id: number,
  reload: any,
};
type State = {
  value: any,
};
class UploadContract extends Component<Props, State> {
  file = '';
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <div>
        <label className="custom-file-upload" style={{ cursor: 'pointer' }}>
          <input
            style={{ display: 'none' }}
            accept={this.props.accept}
            type="file"
            id="upload"
            value={this.state.value}
            name="recfile"
            onChange={e => {
              this.upload(e.target);
            }}
          />
          <i className="fa fa-cloud-upload"></i> {this.props.message}
        </label>
      </div>
    );
  }
  upload(element) {
    let value = element.value;
    console.log(element.value);
    //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
    let ext = path.extname(value);
    if (ext !== '.pdf') {
      alert('Ikke gyldig filtype (.pdf)');
      return;
    }
    const file = element.files[0];
    const reader = new FileReader();
    let temp_artist = this.props.artist;
    let ev_id = this.props.event_id;
    let that = this;
    reader.addEventListener(
      'load',
      function() {
        // send here
        temp_artist.contract = reader.result;
        OrganiserService.updateArtistEvent(temp_artist, ev_id)
          .then(resp => {
            console.log(resp);
            if (resp.status === 200) {
              console.log('Kontrakt lastet opp.');
              element.files = null;
              that.props.reload();
            } else {
              alert('Kunne ikke oppdatere artistens kontrakt.');
            }
          })
          .catch(error => console.log(error));
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

export default UploadContract;
