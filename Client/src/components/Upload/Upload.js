//@flow
import React from 'react';
import { Component } from 'react';
import FormData from 'form-data';
import { UserService } from '../../services/userService.js';
import { OrganiserService } from '../../services/organiserService';
let path = require('path');

type Props = {
  accept: string,
};
class Upload extends Component<Props> {
  file = '';
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <img id="prev" src="" height="200" alt="" />
        <label className="custom-file-upload" style={{ cursor: 'pointer' }}>
          <input
            style={{ display: 'none' }}
            accept={this.props.accept}
            type="file"
            id="upload"
            name="recfile"
            onChange={e => this.preview()}
          />
          <i className="fa fa-cloud-upload"></i> Bla igjennom...
        </label>
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

    {
      /*
    reader.onload = () => {
      preview.src = reader.result;
    }*/
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

export default Upload;
