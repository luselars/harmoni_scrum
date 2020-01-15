//@flow
import React from 'react';
import { Component } from 'react';
import FormData from 'form-data';
import { UserService } from '../../services/userService.js';
import { string } from 'prop-types';
import { OrganiserService } from '../../services/organiserService';
import { Artist } from '../../services/modelService';
let path = require('path');

type Props = {
  accept: string,
  message: string,
  artist: Artist,
  event_id: number,
};
class UploadContract extends Component<Props> {
  file = '';
  constructor(props: any) {
    super(props);
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
            name="recfile"
            onChange={() => {
              this.upload();
            }}
          />
          <i className="fa fa-cloud-upload"></i> {this.props.message}
        </label>
      </div>
    );
  }
  upload() {
    let element = document.getElementById('upload');
    if (element.value === '') {
      // No new file set.
      alert('No file set');
      return;
    }
    //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
    let fullPath = element.value;
    let ext = path.extname(fullPath);
    if (ext !== '.pdf') {
      alert('Ikke gyldig filtype (.pdf)');
      return;
    }
    const file = element.files[0];
    const reader = new FileReader();
    let temp_artist = this.props.artist;
    let ev_id = this.props.event_id;
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
