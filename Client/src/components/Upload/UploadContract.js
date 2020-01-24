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

/**A Component for uploading contract pdf files */
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
        <p id="alert" style={{ color: 'red' }} hidden="true">
          Kunne ikke oppdatere artistens kontrakt
        </p>
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
          <i className="fa fa-cloud-upload" /> {this.props.message}
        </label>
      </div>
    );
  }
  /**Takes inn an html element and checks its value for a pdf file, if one is found it is uploaded to the server and connected to the user/organiser */
  upload(element: HTMLInputElement) {
    // $FlowFixMe
    document.getElementById('alert').hidden = true;
    let value = element.value;
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
        OrganiserService.updateArtistEvent(temp_artist, ev_id).then(resp => {
          if (resp.status === 200) {
            element.files = null;
            that.props.reload();
          } else {
            // $FlowFixMe
            document.getElementById('alert').hidden = false;
            window.scrollTo(0, 0);
          }
        });
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

export default UploadContract;
