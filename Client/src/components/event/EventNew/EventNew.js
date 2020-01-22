//@flow
import React, { createRef } from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService';
import TimeField from 'react-simple-timefield';
import { OrganiserService } from '../../../services/organiserService.js';
import Switch from '@material-ui/core/Switch';
import { FormControl, FormControlLabel } from '@material-ui/core';
import MoreInfo from '../../MoreInfo/MoreInfo';

type Props = {
  onSelectPage: any,
};

type State = {
  event: Event,
  checked: boolean,
};

class EventNew extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    //this.check = createRef();
    this.state = {
      event: new Event(),
      checked: false,
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
        document.getElementById('eventnameinput').value = this.state.event.name;
        document.getElementById('eventdesc').value = this.state.event.description;
        document.getElementById('eventstatus').value = this.state.event.status;
        document.getElementById('eventispublic').value = this.state.event.is_public;
        this.insertTime();
      });
    }
  }

  render() {
    return (
      <div>
        <div className="form-row">
          <div className="col" id="">
            <label id="eventnamelabel" for="eventname">
              Tittel
              <MoreInfo
                padding={'5px'}
                text={
                  'Tittelen på arrangementet. Tittelen vises for ale om arrangementet er satt som offentlig.'
                }
              />
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="eventnameinput"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                (this.state.event.name = event.target.value)
              }
            />
            <label id="eventdesclabel" htmlFor="eventdesc">
              Beskrivelse
              <MoreInfo
                padding={'5px'}
                text={
                  'Beskrivelse av arrangementet. Beskrivelsen vises for alle om arrangementet er satt som offentlig.'
                }
              />
            </label>
            <textarea
              className={'form-control'}
              id={'eventdesc'}
              rows="4"
              cols="50"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                (this.state.event.description = event.target.value)
              }
            ></textarea>
            {/*TODO Sett opp så det er mulig å velge tidspunkt også*/}
            <label id="eventdatestart" htmlFor="start">
              Starttidspunkt
            </label>
            <input
              className="date"
              type="date"
              id="start"
              name="start"
              min={this.today()}
              max="2023-12-31"
              onChange={() => this.updateTime()}
            />
            <TimeField
              id="start_time"
              style={{ width: '100px' }}
              onChange={() => this.updateTime()}
            />
            <label id="eventdateend" htmlFor="end">
              Sluttidspunkt
            </label>
            <input
              className="date"
              type="date"
              id="end"
              name="end"
              min={this.today()}
              max="2023-12-31"
              onChange={() => this.updateTime()}
            />
            <TimeField
              id="end_time"
              style={{ width: '100px' }}
              onChange={() => this.updateTime()}
            />
            <label>
              Privat status
              <MoreInfo
                padding={'5px'}
                text={
                  'Status på arrangementet. Status vises kun til artister og personell knyttet til arrangementet.'
                }
              />
            </label>
            <textarea
              className="form-control"
              id="eventstatus"
              rows="1"
              cols="50"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                (this.state.event.status = event.target.value)
              }
            ></textarea>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    inputRef={this.check}
                    onChange={event => {
                      this.state.event.is_public = event.target.checked;
                    }}
                    color="primary"
                    id="eventispublic"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label="Jeg ønsker at arrangementet skal være offentlig"
              />
              <MoreInfo
                padding={'0px'}
                text={
                  'Velg om arrangementet kan vises til alle. Hvis arrangementet er offentlig vil tittel, beskrivelse, sted, tidspunkt, artister og bilde gjøres tilgjengelig for alle.'
                }
              />
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => this.ny()} className="btn btn-success" id="nextbtn">
            Oprett ny. debugknapp
          </button>
          <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
            Neste
          </button>
        </div>
      </div>
    );
  }
  //TODO fiks
  handleChange = (event: any) => {
    //this.setState({checked: ((event.target.checked == 1) ? false : true)});
    this.state.checked = event.target.checked == 1 ? false : true;
    //this.state.event.is_public = (event.target.checked == true ? 1 : -1);
    console.log(this.state.checked);
    //this.setState()(this.state.event.is_public == 1) ? -1 : 1;
    //this.setState({ [e.target.public]: e.target.value});
  };

  today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  currentTime() {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    return hour + ':' + min;
  }

  insertTime() {
    let start_date = document.getElementById('start');
    let end_date = document.getElementById('end');
    if (this.state.event.start !== null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      start_date.value = d;
      document.getElementById('start_time').value = h;
      this.state.event.start = d + ' ' + h + ':00';
    } else {
      document.getElementById('start_time').value = this.today();
      this.state.event.start = this.today();
    }
    if (this.state.event.end !== null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      end_date.value = d;
      document.getElementById('end_time').value = h;
      this.state.event.end = d + ' ' + h + ':00';
    } else {
      document.getElementById('end_time').value = this.today();
      this.state.event.end = this.today();
    }
  }
  updateTime() {
    let start_date = document.getElementById('start').value;
    let start_time = document.getElementById('start_time').value;
    let end_date = document.getElementById('end').value;
    let end_time = document.getElementById('end_time').value;
    if (start_date !== '') {
      this.state.event.start = start_date + ' ' + start_time + ':00';
    }
    if (end_date !== '') {
      this.state.event.end = end_date + ' ' + end_time + ':00';
    }
  }
  //debug-metode, slett etter hvert
  // TODO delete
  ny() {
    localStorage.removeItem('curr_event');
    window.location = '/editevent';
  }
  next() {
    // TODO validate time input
    if (typeof this.state.event.name != 'string' || this.state.event.name.length <= 1) {
      // TODO bytt denne alerten
      alert('Ugyldig navn');
      return;
    }
    if (typeof this.state.event.description != 'string') {
      this.state.event.description = null;
    }
    if (typeof this.state.event.start != 'string') {
      this.state.event.start = null;
    }
    if (typeof this.state.event.end != 'string') {
      this.state.event.end = null;
    }
    if (localStorage.getItem('curr_event') === null) {
      OrganiserService.createEvent(this.state.event).then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          console.log('Arrangement oprettet');
          localStorage.setItem('curr_event', resp.data.insertId);
          this.props.onSelectPage(2);
        } else {
          alert('Kunne ikke oprette arrangement.');
          // TODO bytt ut denne alerten med et komponent.
        }
      });
    } else {
      OrganiserService.updateEvent(this.state.event).then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          console.log('Arrangement oppdatert');
          this.props.onSelectPage(2);
        } else {
          alert('Kunne ikke oppdatere arrangement.');
          // TODO bytt ut denne alerten med et komponent.
        }
      });
    }
  }
}

export default EventNew;
