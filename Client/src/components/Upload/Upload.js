//@flow
import React from 'react';
import { Component } from 'react';
import FormData from 'form-data';
import { UserService } from '../../services/UserService.js';
import { string } from 'prop-types';
import { EventService } from '../../services/EventService';
let path = require('path');

type Props = {
  accept: string,
};
class Upload extends Component<Props> {
  file = '';
  // Useless constructor just now, will be used when props is introduced.
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
            onChange={e => this.preview(e)}
          />
          <i className="fa fa-cloud-upload"></i> Bla igjennom...
          <img id="prev" src="" height="200" alt="" />
        </label>
        {/*<button onClick={this.publish2}>send</button>*/}
      </div>
    );
  }
  preview() {
    const preview = document.getElementById('prev');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function() {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false,
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

export default Upload;
