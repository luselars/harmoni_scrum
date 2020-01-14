//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { EventService } from '../../../services/EventService';
import { Event } from '../../../services/EventService';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO bytt ut disse greiene med lokasjoner
// bruk map:
// someArrayOfStrings.map(opt => ({ label: opt, value: opt }));
const locations = [
  { name: 'Alligators', value: 1 },
  { name: 'Crocodiles', value: 2 },
  { name: 'Sharks', value: 3 },
  { name: 'Small crocodiles', value: 4 },
  { name: 'Smallest crocodiles', value: 5 },
  { name: 'Snakes', value: 6 },
];
type State = {
  event: Event,
  location: Location,
};
type Props = {};

class EventNew3 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      location: '',
    };
  }
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') !== null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      // TODO add token
      EventService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        console.log(this.state.event);
        this.formatTime();
      });
    }
  }

  render() {
    return (
      <div class="createEvent">
        <h2>Opprett arrangement</h2>
        {/*<form>*/}
        <div class="form-row">
          <p>Velg sted:</p>
          <Autocomplete
            id="search_locations"
            style={{ width: '800px' }}
            freeSolo
            options={locations.map(option => option.name)}
            renderInput={params => (
              <TextField
                {...params}
                label="location"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            )}
          />
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
  test() {
    console.log(this.state.location);
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
    window.location = '/newevent2';
  }
  next() {
    let s_bar = document.getElementById('search_locations');
    console.log(s_bar.value);
  }
}
export default EventNew3;
