//@flow
import React, { createRef } from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { number, string } from 'prop-types';
import { Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

type State = {
  event: Event,
  personnel: [],
  my_types: [],
  new_type: string,
  delete: {},
  invite: {},
};
type Props = {
  onSelectPage: any,
};
class EventNew7 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      my_types: [],
      personnel: [],
      new_type: string,
      delete: {},
      invite: {},
    };
  }
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') !== null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        this.formatTime();
        OrganiserService.getMyVolunteers(this.state.event.event_id).then(response => {
          console.log(response.data);
          this.setState({ personnel: response.data });
        });
      });
      OrganiserService.getVolunteerType().then(response => {
        console.log(response.data);
        this.setState({ my_types: response.data });
      });
    }
  }
  render() {
    return (
      <div className="createEvent" id="cardnewevent">
        <h2 className="neweventtitle">Opprett arrangement</h2>
        {/*<form>*/}
        <div className="form-group text-center ml-5 mr-5">
          <p>Knytt personell til arrangementet: </p>
        </div>
        <div>
          <p>Legg til personelltype:</p>
          <input
            onChange={e => {
              this.setState({ new_type: e.target.value });
            }}
            placeholder={'Personelltype'}
            type="text"
          />
          <button onClick={() => this.createType()}>Opprett personelltype</button>
        </div>
        <div>
          <p>Slett personelltyper</p>
          <Autocomplete
            onChange={(e, value) => {
              this.state.delete = value;
            }}
            options={this.state.my_types}
            getOptionLabel={pers => pers.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Velg personelltype" variant="outlined" fullWidth />
            )}
          />
          <button
            onClick={() => {
              this.deleteType();
            }}
          >
            Slett
          </button>
        </div>
        <div>
          <p>Inviter personell til arrangementet:</p>
          <input
            onChange={e => {
              this.setState({ new_person: e.target.value });
            }}
            placeholder={'E-post'}
            type="text"
          />
          <Autocomplete
            options={this.state.my_types}
            onChange={(e, value) => {
              this.state.invite = value;
            }}
            getOptionLabel={pers => pers.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Velg personelltype" variant="outlined" fullWidth />
            )}
          />
          <button onClick={() => this.invitePerson()}>Inviter</button>
        </div>
        <div>
          <p>Mitt personell</p>
          {this.state.my_types.map(type => (
            <span>
              {this.state.personnel.filter(c => c.volunteer_type === type.name).length > 0 ? (
                <span>
                  <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{type.name}:</p>
                  {this.state.personnel
                    .filter(c => c.volunteer_type === type.name)
                    .map(p => (
                      <p>
                        {p.email}
                        <button onClick={() => this.removePerson(p.user_id)}>Fjern</button>
                      </p>
                    ))}
                </span>
              ) : null}
            </span>
          ))}
        </div>
        <div>
          <button onClick={() => this.back()} className="btn btn-success" id="backbtn">
            Tilbake
          </button>
          <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
            Fullfør
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
  }
  invitePerson() {
    if (this.state.new_person === undefined || this.state.invite.name === undefined) {
      alert('Vennligst velg både en person å invitere og en type personellgruppe.');
      return;
    }
    console.log(this.state.new_person);
    console.log(this.state.invite);
    OrganiserService.inviteVolunteer(
      this.state.new_person,
      this.state.event.event_id,
      this.state.invite.volunteer_type_id,
    ).then(response => {
      console.log(response);
      this.componentDidMount();
    });
  }
  removePerson(user_id: number) {
    OrganiserService.removeVolunteerFromEvent(this.state.event.event_id, user_id).then(response => {
      console.log(response);
      this.componentDidMount();
    });
  }
  deleteType() {
    if (this.state.delete.name === undefined) {
      return;
    }
    OrganiserService.deleteVolunteerType(this.state.delete.volunteer_type_id).then(response => {
      console.log(response);
      this.componentDidMount();
    });
  }
  createType() {
    // Oprett personellgruppe her
    if (
      this.state.new_type === null ||
      typeof this.state.new_type != 'string' ||
      this.state.new_type === ''
    ) {
      alert('Ingen personelltype skrevet inn');
      return;
      // TODO bytt alert?
    }
    OrganiserService.addVolunteerType(this.state.new_type).then(response => {
      console.log(response);
      this.componentDidMount();
    });
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
    this.props.onSelectPage(6);
  }
  next() {
    window.location = '/profile';
  }
}
export default EventNew7;
