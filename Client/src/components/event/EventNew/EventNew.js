//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService.js';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import MoreInfo from '../../MoreInfo/MoreInfo';

type Props = {
  onSelectPage: any,
};

type State = {
  event: Event,
  checked: boolean,
  start_d: string,
  start_h: string,
  end_d: string,
  end_h: string,
};

/**Component for first page on creating a new event */
class EventNew extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      checked: false,
      start_d: this.today(),
      end_d: this.today(),
      start_h: this.currentTime(),
      end_h: this.currentTime(),
    };
  }
  /**Sets event in localStorage */
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        document.getElementById('eventnameinput').value = this.state.event.name;
        document.getElementById('eventdesc').value = this.state.event.description;
        document.getElementById('eventstatus').value = this.state.event.status;
        this.setState({ start_d: this.state.event.start_format.substring(0, 10) });
        this.setState({ start_h: this.state.event.start_format.substring(11, 16) });
        this.setState({ end_d: this.state.event.end_format.substring(0, 10) });
        this.setState({ end_h: this.state.event.end_format.substring(11, 16) });
        document.getElementById('start_time').value = this.state.start_h;
        document.getElementById('start').value = this.state.start_d;
        document.getElementById('end').value = this.state.end_d;
        document.getElementById('end_time').value = this.state.end_h;
      });
    }
  }

  render() {
    return (
      <form onSubmit={event => this.next(event)}>
        <div className="form-row">
          <div className="col-12">
            <p id="alertcouldnt" style={{ color: 'red' }} hidden="true">
              Kunne ikke opprette arrangement
            </p>
            <p id="alertcouldntupdate" style={{ color: 'red' }} hidden="true">
              Kunne ikke oppdatere arrangement
            </p>
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
            <small id="sceneOptional" className="form-text text-muted mb-2">
              Valgfritt
            </small>
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
            <p id="alert" style={{ color: 'red' }} hidden="true">
              Slutttdato er satt før startdato
            </p>
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
              ref="start"
              name="start"
              defaultValue={this.today()}
              max="2023-12-31"
              onChange={event => {
                this.setState({ start_d: event.target.value });
              }}
              required
            />
            <input
              className="form-control w-50 mb-4"
              type="time"
              id="start_time"
              name="start"
              defaultValue={this.currentTime()}
              onChange={event => {
                this.setState({ start_h: event.target.value });
              }}
              required
            />
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
              onChange={event => {
                this.setState({ end_d: event.target.value });
              }}
              required
            />
            <input
              className="form-control w-50 mb-4"
              type="time"
              defaultValue={this.currentTime()}
              id="end_time"
              name="end"
              onChange={event => {
                this.setState({ end_h: event.target.value });
              }}
              required
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

        <div>
          <button
            type="submit"
            className="btn btn-success col-sm-3 m-2 d-block mx-auto"
            id="nextbtn"
          >
            Neste
          </button>
        </div>
      </form>
    );
  }

  /**Findes todays date */
  today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  /**Finds current time */
  currentTime() {
    var now = new Date();
    var hour = now.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = now.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    return hour + ':' + min;
  }

  /** Updates states and server. Sends user to next page*/
  next(event) {
    // $FlowFixMe
    document.getElementById('alert').hidden = true;
    document.getElementById('alertcouldnt').hidden = true;
    document.getElementById('alertcouldntupdate').hidden = true;
    event.preventDefault();
    this.state.event.start = this.state.start_d + ' ' + this.state.start_h;
    this.state.event.end = this.state.end_d + ' ' + this.state.end_h;
    if (typeof this.state.event.name != 'string' || this.state.event.name.length < 1) {
      console.log('Ugyldig tittel');
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
    //Checks if event start is before the end
    let startDate = new Date(this.state.event.start);
    let endDate = new Date(this.state.event.end);
    if (endDate < startDate) {
      // $FlowFixMe
      document.getElementById('alert').hidden = false;
      window.scrollTo(0, 0);
      return;
    }
    if (localStorage.getItem('curr_event') == null) {
      OrganiserService.createEvent(this.state.event).then(resp => {
        if (resp.status == 200) {
          localStorage.setItem('curr_event', resp.data.insertId);
          this.props.onSelectPage(2);
        } else {
          // $FlowFixMe
          document.getElementById('alertcouldnt').hidden = false;
          window.scrollTo(0, 0);
        }
      });
    } else {
      OrganiserService.updateEvent(this.state.event).then(resp => {
        if (resp.status == 200) {
          this.props.onSelectPage(2);
        } else {
          // $FlowFixMe
          document.getElementById('alertcouldntupdate').hidden = false;
          window.scrollTo(0, 0);
        }
      });
    }
  }
}

export default EventNew;
