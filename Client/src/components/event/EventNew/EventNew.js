//@flow
import React, { createRef } from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService';
import TimeField from 'react-simple-timefield';
import { OrganiserService } from '../../../services/organiserService.js';
import Switch from '@material-ui/core/Switch';
import { FormControl, FormControlLabel } from '@material-ui/core';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { publicDecrypt } from 'crypto';
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
    this.state = {
      event: new Event(),
      checked: false,
    };
  }
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      // TODO add token
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        document.getElementById('eventnameinput').value = this.state.event.name;
        document.getElementById('eventdesc').value = this.state.event.description;
        document.getElementById('eventstatus').value = this.state.event.status;
        // TODO olava fiks så switch oppdateres.
        this.insertTime();
      });
    }
  }

  render() {
    return (
      <form onSubmit={event => this.next(event)}>
        <div className="form-row">
          <div className="col-12">
            <label id="eventnamelabel" for="eventname">
              Tittel
              <MoreInfo
                padding={'5px'}
                font={'10rem'}
                text={
                  'Tittelen på arrangementet. Tittelen vises for alle om arrangementet er satt som offentlig.'
                }
              />
            </label>
            <input
              required
              type="text"
              className="form-control mb-4"
              placeholder="Skriv tittel her..."
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
              className={'form-control mb-4'}
              id={'eventdesc'}
              rows="4"
              cols="50"
              placeholder="Skriv beskrivelse her..."
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                (this.state.event.description = event.target.value)
              }
            />
            {/*TODO Sett opp så det er mulig å velge tidspunkt også*/}
            <label id="eventdatestart" htmlFor="start">
              Starttidspunkt
            </label>
            <small id="startDateOptional" className="form-text text-muted mb-2">
              Kan endres senere
            </small>
            <input
              className="form-control w-50"
              type="date"
              id="start"
              name="start"
              defaultValue={this.today()}
              max="2023-12-31"
              onChange={() => this.updateTime()}
              required
            />
            <input
              className="form-control w-50 mb-4"
              type="time"
              id="start_time"
              name="start"
              defaultValue={this.currentTime()}
              onChange={() => this.updateTime()}
              required
            />
            {/*<TimeField
              id="start_time"
              style={{ width: '100px' }}
              onChange={() => this.updateTime()}
            />*/}
            <label id="eventdateend" htmlFor="end">
              Sluttidspunkt
            </label>
            <small id="startDateOptional" className="form-text text-muted mb-2">
              Kan endres senere
            </small>
            <input
              className="form-control w-50"
              type="date"
              id="end"
              name="end"
              defaultValue={this.today()}
              max="2023-12-31"
              onChange={() => this.updateTime()}
              required
            />
            <input
              className="form-control w-50 mb-4"
              type="time"
              id="end_time"
              defaultValue={this.currentTime()}
              name="end"
              onChange={() => this.updateTime()}
              required
            />
            {/*
            <TimeField
              id="end_time"
              style={{ width: '100px' }}
              onChange={() => this.updateTime()}
            />*/}
            <label>
              Privat status
              <MoreInfo
                padding={'5px'}
                text={
                  'Status på arrangementet. Status vises kun til artister og personell knyttet til arrangementet.'
                }
              />
            </label>
            <small id="statusOptional" className="form-text text-muted mb-2">
              Valgfritt
            </small>
            <textarea
              className="form-control mb-4"
              id="eventstatus"
              rows="1"
              cols="50"
              placeholder="Skriv status her..."
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                (this.state.event.status = event.target.value)
              }
            />

            <BootstrapSwitchButton
              ref="public"
              checked={this.state.event.is_public === 1 ? true : false}
              onlabel="Ja"
              offlabel="Nei"
              name="public"
              onstyle="success"
              offstyle="secondary"
              width="75"
              onChange={(b: boolean) => {
                this.state.event.is_public = b ? 1 : 0;
                console.log(this.state.event);
              }}
            />
            <label>
              Jeg ønsker at arrangementet skal være offentlig
              <MoreInfo
                padding={'5px'}
                text={
                  'Velg om arrangementet kan vises til alle. Hvis arrangementet er offentlig vil tittel, beskrivelse, sted, tidspunkt, artister og bilde gjøres tilgjengelig for alle.'
                }
              />
            </label>
          </div>
        </div>

        <div className="row justify-content-center">
          <button type="submit" className="btn btn-success w-50 m-2 " id="nextbtn">
            Neste
          </button>
          <button
            onClick={() => this.ny()}
            type="button"
            className="btn btn-secondary w-50 m-2  "
            id="nextbtn"
          >
            Avbryt??
          </button>
        </div>
      </form>
    );
  }

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
    if (this.state.event.start != null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      start_date.value = d;
      document.getElementById('start_time').value = h;
      this.state.event.start = d + ' ' + h + ':00';
    } else {
      document.getElementById('start_time').value = this.today();
      this.state.event.start = this.today();
    }
    if (this.state.event.end != null) {
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
  next(event) {
    event.preventDefault();
    // TODO validate time input
    if (typeof this.state.event.name !== 'string' || this.state.event.name.length < 1) {
      // TODO bytt denne alerten
      alert('Ugyldig tittel');
      return;
    }
    if (typeof this.state.event.description !== 'string') {
      this.state.event.description = null;
    }
    if (typeof this.state.event.start !== 'string') {
      this.state.event.start = null;
    }
    if (typeof this.state.event.end !== 'string') {
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
