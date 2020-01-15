//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import Upload from '../../Upload/Upload.js';
import FileDropzone from '../../FileDropzone/FileDropzone.js';
import { EventService } from '../../../services/EventService.js';
import { Event } from '../../../services/EventService.js';
let path = require('path');

type State = {
  event: Event,
};
type Props = {};

class EventNew2 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
    };
  }
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') !== null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      // TODO add token
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
      <div class="createEvent">
        <h2>Opprett arrangement</h2>
        {/*<form>*/}
        <div class="form-row">
          <div class="col" id="coltitle">
            <p>Last opp bilde</p>
            <Upload
              url={'http://localhost:4000/organiser/eventimage'}
              accept={'.jpg, .png, .jpeg'}
            />
          </div>
        </div>
        <div>
          <button onClick={() => this.back()} class="btn btn-success" id="backbtn">
            Tilbake
          </button>
          <button onClick={() => this.next()} class="btn btn-success" id="nextbtn">
            Neste
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
  }
  loadImage() {
    if (this.state.event.image !== null) {
      console.log(this.state.event.image);
      document.getElementById('prev').src =
        'http://localhost:4000/user/file/' + this.state.event.image;
    }
  }
  formatTime() {
    if (this.state.event.start !== null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      this.state.event.start = d + ' ' + h + ':00';
    }
    if (this.state.event.end !== null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      this.state.event.end = d + ' ' + h + ':00';
    }
  }
  back() {
    // If the user has uploaded anything new, publish it.
    let element = document.getElementById('upload');
    if (element.value !== '') {
      //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
      let fullPath = element.value;
      let ext = path.extname(fullPath);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        window.location = '/newevent';
        return;
      }
      const file = element.files[0];
      const reader = new FileReader();
      let temp_event = this.state.event;
      reader.addEventListener(
        'load',
        function() {
          // send here
          temp_event.image = reader.result;
          OrganiserService.updateEvent(temp_event).then(resp => {
            console.log(resp);
            if (resp.status === 200) {
              console.log('Arrangement oppdatert');
              window.location = '/newevent';
            } else {
              console.log('Kunne ikke oppdatere arrangement');
              window.location = '/newevent';
            }
          });
        },
        false,
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    window.location = '/newevent';
  }
  next() {
    let element = document.getElementById('upload');
    if (element.value === '') {
      // No new image set.
      // Redirect
      window.location = '/newevent3';
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
    reader.addEventListener(
      'load',
      function() {
        // send here
        temp_event.image = reader.result;
        OrganiserService.updateEvent(temp_event).then(resp => {
          console.log(resp);
          if (resp.status === 200) {
            console.log('Arrangement oppdatert');
            window.location = '/newevent3';
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
