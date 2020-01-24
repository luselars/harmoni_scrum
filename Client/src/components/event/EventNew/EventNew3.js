//@flow
import React, { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { Event, Location } from '../../../services/modelService';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OrganiserService } from '../../../services/organiserService';
import MoreInfo from '../../MoreInfo/MoreInfo';

type Props = {
  onSelectPage: any,
};

/**Component for third page on creating a new event */
class EventNew3 extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.name = React.createRef();
    this.addr = React.createRef();
    this.state = {
      event: new Event(),
      locations: [],
      location_name: string,
      location_addr: string,
      location_nr: Number,
    };
  }
  /**Gets event and locations. Check if the user is currently writing an event, if so load inputs with data */
  componentDidMount() {
    if (localStorage.getItem('curr_event') !== null) {
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        this.formatTime();
        OrganiserService.getLocations().then(response => {
          this.setState({ locations: response.data });
          this.setState({ location_nr: document.getElementById('postcode').value });
          if (data.location_id !== null) {
            let locData = new Location();
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].location_id === data.location_id) {
                locData = response.data[i];
              }
            }
            if (locData.name) {
              this.setState({ location_name: locData.name });
            }
            if (locData.address) {
              this.setState({ location_addr: locData.address });
            }
            if (locData.postcode) {
              document.getElementById('postcode').value = locData.postcode;
            }
            if (data.venue) {
              document.getElementById('venue').value = data.venue;
            }
          }
        });
      });
    }
  }

  render() {
    return (
      <form onSubmit={event => this.next(event)}>
        <div className="form-row">
          <iframe
            id="map"
            width="100%"
            height="300px"
            frameborder="0"
            src={
              'https://www.google.com/maps/embed/v1/place?q=' +
              this.state.location_addr +
              ',+' +
              this.state.location_nr +
              '&key=AIzaSyC-75BBbNQpdG9lO2JararmVY5ps_xDAdk'
            }
            allowfullscreen
          ></iframe>
          <p id="alert" style={{ color: 'red' }} hidden="true">
            Kunne ikke legge til sted
          </p>

          <label>Velg sted</label>
          <Autocomplete
            id="search_name"
            style={{ width: '100%' }}
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
                required
              />
            )}
          />
          <Autocomplete
            id="search_address"
            style={{ width: '100%' }}
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
                label="Adresse"
                margin="narrow"
                padding="narrow"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </div>

        <label htmlFor="postcode">Postkode:</label>
        <input className="form-control w-50" id="postcode" type="number" />
        <label htmlFor="postcode">
          Scene:
          <MoreInfo
            padding={'5px'}
            text={'Om du vil kan du spesifisere hvilken scene arrangementet foregår på.'}
          />
        </label>
        <small id="sceneOptional" className="form-text text-muted mb-2">
          Valgfritt
        </small>
        <input className="form-control w-50" id="venue" placeholder="Skriv her..." type="text" />

        <button
          type="submit"
          className="btn btn-success col-sm-3 m-2 d-block mx-auto "
          id="nextbtn"
        >
          Neste
        </button>
        <button
          onClick={() => this.back()}
          type="button"
          className="btn btn-secondary col-sm-3 m-2 d-block mx-auto "
          id="backbtn"
        >
          Tilbake
        </button>
      </form>
    );
  }

  /**Inserts data if it already exist*/
  updateForm(w: number, val: any) {
    if (w === 0 && val != null && val !== '') {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].name === val) {
          let a = this.state.locations[i].address;
          this.setState({ location_addr: a });
          document.getElementById('postcode').value = this.state.locations[i].postcode;
        }
      }
    }
    if (w === 1 && val != null && val !== '') {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].address === val) {
          let a = this.state.locations[i].name;
          this.setState({ location_name: a });
          document.getElementById('postcode').value = this.state.locations[i].postcode;
        }
      }
    }
  }

  /**Formates time*/
  formatTime() {
    this.state.event.start = this.state.event.start_format;
    this.state.event.end = this.state.event.end_format;
  }

  /**Returns to previos page */
  back() {
    this.props.onSelectPage(2);
  }

  /**Updates server and sends the user to the next page. */
  next(event) {
    // $FlowFixMe
    document.getElementById('alert').hidden = true;
    event.preventDefault();
    let name = this.name.current.value;
    let addr = this.addr.current.value;
    let postcode = document.getElementById('postcode').value;
    let venue = document.getElementById('venue').value;
    if (name.length < 1 || addr.length < 1) {
      return;
    }
    //post location
    let l = new Location();
    l.name = name;
    l.address = addr;
    l.postcode = postcode;
    OrganiserService.postLocation(l).then(resp => {
      if (resp.status === 200) {
        this.state.event.location_id = resp.data.location_id;
        this.state.event.venue = venue;
        this.state.event.venue = venue;
        OrganiserService.updateEvent(this.state.event).then(resp => {
          this.props.onSelectPage(4);
        });
      } else if (resp.status === 100) {
        this.state.event.location_id = resp.data.insertId;
        this.state.event.venue = venue;
        OrganiserService.updateEvent(this.state.event).then(resp => {
          this.props.onSelectPage(4);
        });
      } else {
        // $FlowFixMe
        document.getElementById('alert').hidden = false;
        window.scrollTo(0, 0);
      }
    });
  }
}
export default EventNew3;
