//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import Upload from '../../Upload/Upload.js';
import { OrganiserService } from '../../../services/organiserService.js';
import { Event } from '../../../services/modelService.js';
import MoreInfo from '../../MoreInfo/MoreInfo';
let path = require('path');

type State = {
  event: Event,
};
type Props = {
  onSelectPage: any,
};

class EventNew2 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
    };
  }
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        console.log(data);
        this.setState({ event: data });
        console.log(this.state.event);
        this.formatTime();
        this.loadImage();
      });
    }
  }

  render() {
    return (
      <div>
        <div className="form-row">
          <div className="col-12 text-center">
            <label>
              Last opp bilde
              <MoreInfo
                padding={'5px'}
                text={
                  'Last opp et bilde som vises øverst på arrangementet. Godtatte filtyper er .jpg, .png, .jpeg'
                }
              />
            </label>
            <small id="imageUploadOptional" className="form-text text-muted mb-2">
              Valgfritt
            </small>
            <div className="">
              <Upload className="upload" accept={'.jpg, .png, .jpeg'} />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <button
            onClick={() => this.next()}
            type="button"
            className="btn btn-success w-50 m-2 "
            id="nextbtn"
          >
            Neste
          </button>
          <button onClick={() => this.back()} className="btn btn-secondary w-50 m-2 " id="backbtn">
            Tilbake
          </button>
        </div>
      </div>
    );
  }
  loadImage() {
    if (this.state.event.image != null) {
      console.log(this.state.event.image);
      document.getElementById('prev').src =
        'http://localhost:4000/public/file/' + this.state.event.image;
    }
  }
  formatTime() {
    this.state.event.start = this.state.event.start_format;
    this.state.event.end = this.state.event.end_format;
  }
  back() {
    // If the user has uploaded anything new, publish it.
    let element = document.getElementById('upload');
    if (element.value !== '') {
      //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
      let fullPath = element.value;
      let ext = path.extname(fullPath);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        this.props.onSelectPage(1);
        return;
      }
      const file = element.files[0];
      const reader = new FileReader();
      let temp_event = this.state.event;
      let that = this;
      reader.addEventListener(
        'load',
        function() {
          // send here
          temp_event.image = reader.result;
          OrganiserService.updateEvent(temp_event).then(resp => {
            console.log(resp);
            if (resp.status === 200) {
              console.log('Arrangement oppdatert');
              that.props.onSelectPage(1);
            } else {
              console.log('Kunne ikke oppdatere arrangement');
              this.props.onSelectPage(1);
            }
          });
        },
        false,
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    this.props.onSelectPage(1);
  }
  next() {
    let element = document.getElementById('upload');
    if (element.value === '') {
      // No new image set.
      // Redirect
      this.props.onSelectPage(3);
      return;
    }
    //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
    let fullPath = element.value;
    let ext = path.extname(fullPath);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      //TODO change alert
      alert('Ikke gyldig filtype');
      return;
    }
    const file = element.files[0];
    const reader = new FileReader();
    let temp_event = this.state.event;
    let that = this;
    reader.addEventListener(
      'load',
      function() {
        // send here
        temp_event.image = reader.result;
        OrganiserService.updateEvent(temp_event).then(resp => {
          console.log(resp);
          if (resp.status === 200) {
            console.log('Arrangement oppdatert');
            that.props.onSelectPage(3);
          } else {
            alert('Kunne ikke oppdatere arrangement.');
            // TODO bytt ut denne alerten med et komponent.
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
export default EventNew2;
