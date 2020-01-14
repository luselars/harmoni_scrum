//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { EventService } from '../../../services/EventService';
import { Event } from '../../../services/EventService';
import TimeField from 'react-simple-timefield';

type Props = {};
class EventNew extends Component<Props> {
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
      EventService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        console.log(this.state.event);
        this.insertTime();
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
            <label id="eventnamelabel" for="eventname">
              Tittel
            </label>
            <input
              required
              type="text"
              class="form-control"
              id="eventnameinput"
              value={this.state.event.name}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                (this.state.event.name = event.target.value)
              }
            />
            <label id="eventdesclabel" htmlFor="eventdesc">
              Beskrivelse
            </label>
            <textarea
              className={'form-control'}
              id={'eventdesc'}
              value={this.state.event.description}
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
              type="date"
              id="start"
              name="start"
              max="2023-12-31"
              onChange={() => this.updateTime()}
            />
            <TimeField
              id="start_time"
              style={{ width: '100px' }}
              value="00:00"
              onChange={() => this.updateTime()}
            />
            <label id="eventdateend" htmlFor="end">
              Sluttidspunkt
            </label>
            <input
              type="date"
              id="end"
              name="end"
              max="2023-12-31"
              onChange={() => this.updateTime()}
            />
            <TimeField
              id="end_time"
              style={{ width: '100px' }}
              value="00:00"
              onChange={() => this.updateTime()}
            />
          </div>
        </div>
        <div>
          <button onClick={() => this.ny()} class="btn btn-success" id="nextbtn">
            Oprett ny. debugknapp
          </button>
          <button onClick={() => this.next()} class="btn btn-success" id="nextbtn">
            Neste
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
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
    }
    if (this.state.event.end !== null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      end_date.value = d;
      document.getElementById('end_time').value = h;
      this.state.event.end = d + ' ' + h + ':00';
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
    window.location = '/newevent';
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
      EventService.createEvent(this.state.event).then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          console.log('Arrangement oprettet');
          localStorage.setItem('curr_event', resp.data.insertId);
          window.location = '/newevent2';
        } else {
          alert('Kunne ikke oprette arrangement.');
          // TODO bytt ut denne alerten med et komponent.
        }
      });
    } else {
      EventService.updateEvent(this.state.event).then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          console.log('Arrangement oppdatert');
          window.location = '/newevent2';
        } else {
          alert('Kunne ikke oppdatere arrangement.');
          // TODO bytt ut denne alerten med et komponent.
        }
      });
    }
  }
}

// var today = new Date();
// if (today.getMonth().toString.length === 1) {
//     var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
// }
// if (today.getDate().toString.length === 1) {
//     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
// }
// if (today.getMonth().toString.length === 1 && today.getDate().toString.length === 1) {
//     var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
// }
// else {
//     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// }
//
// var time = today.getHours() + ":" + today.getMinutes();
// console.log(time)

export default EventNew;
