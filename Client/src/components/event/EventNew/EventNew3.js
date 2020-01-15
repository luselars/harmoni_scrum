//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { Event } from '../../../services/modelService';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OrganiserService } from '../../../services/organiserService';
import { Location } from '../../../services/modelService';

type State = {
  event: Event,
  locations: [],
  location_name: string,
  location_addr: string,
};
type Props = {};

// TODO add postcode
class EventNew3 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.name = React.createRef();
    this.addr = React.createRef();
    this.state = {
      event: new Event(),
      locations: [],
      location_name: string,
      location_addr: string,
    };
  }
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') !== null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      // TODO add token
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        console.log(this.state.event);
        this.formatTime();
      });
      OrganiserService.getLocations().then(response => {
        console.log(response.data);
        this.setState({ locations: response.data });
        console.log(this.state.locations);
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
            id="search_name"
            style={{ width: '800px' }}
            freeSolo
            onChange={(event, value) => this.updateForm(0, value)}
            value={this.state.location_name}
            options={this.state.locations.map(option => option.name)}
            renderInput={params => (
              <TextField
                {...params}
                inputRef={this.name}
                value={this.state.location_name}
                label="Stedsnavn"
                onChange={() => {
                  this.setState({ location_name: this.name.current.value });
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Autocomplete
            id="search_address"
            style={{ width: '800px' }}
            freeSolo
            onChange={(event, value) => this.updateForm(1, value)}
            options={this.state.locations.map(option => option.address)}
            value={this.state.location_addr}
            renderInput={params => (
              <TextField
                {...params}
                inputRef={this.addr}
                value={this.state.location_addr}
                onChange={() => {
                  {
                    this.setState({ location_addr: this.addr.current.value });
                  }
                }}
                label="Stedsaddresse"
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
  updateForm(w: number, val) {
    if (w === 0 && val !== null && val !== '') {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].name === val) {
          let a = this.state.locations[i].address;
          this.setState({ location_addr: a });
        }
      }
    }
    if (w === 1 && val !== null && val !== '') {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].address === val) {
          let a = this.state.locations[i].name;
          this.setState({ location_name: a });
        }
      }
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
  // todo ADD postcode
  back() {
    window.location = '/newevent2';
  }
  next() {
    console.log(this.name.current.value);
    console.log(this.addr.current.value);
    let name = this.name.current.value;
    let addr = this.addr.current.value;
    if (name.length < 1 || addr.length < 1) {
      alert('Ugyldig addresse.');
      return;
    }
    //post location
    let l = new Location();
    l.name = name;
    l.address = addr;
    OrganiserService.postLocation(l).then(resp => {
      console.log(resp);
    });
  }
}
export default EventNew3;
