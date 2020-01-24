//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { number, string } from 'prop-types';
import { Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import EditPersonnel from './EditPersonnel';

type State = {
  event: Event,
  personnel: [],
  my_types: [],
  new_type: string,
  delete: {},
  vol_id: number,
  expandCreate: boolean,
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
      vol_id: number,
      expandCreate: false,
    };
  }
  update = () => {
    this.componentDidMount();
  };
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        console.log(response.data);
        this.setState({ event: data });
        OrganiserService.getMyVolunteers(this.state.event.event_id).then(response => {
          console.log(response.data);
          this.setState({ personnel: response.data });
        });
      });
      OrganiserService.getVolunteerType().then(response => {
        console.log(response.data);
        this.setState({ my_types: response.data });
        if (response.data[0] !== undefined) {
          this.setState({ invite: response.data[0].volunteer_type_id });
        }
      });
    }
  }
  toggleExpandCreate() {
    if (this.state.expandCreate) {
      this.setState({ expandCreate: false });
    } else {
      this.setState({ expandCreate: true });
    }
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <label
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.toggleExpandCreate();
            }}
            className="text-center"
          >
            Endre dine personelltyper
            <br />
            <br />
            {this.state.expandCreate ? (
              <i className="arrow down text-center"></i>
            ) : (
              <i className="arrow up text-center"></i>
            )}
          </label>
          {this.state.expandCreate ? (
            <EditPersonnel
              updateParent={() => {
                this.update();
              }}
            />
          ) : null}

          <h4 className="text-center">Knytt personell til arrangementet </h4>
          <label className="text-center">Inviter personell til arrangementet:</label>
          <div className="row">
            <input
              onChange={e => {
                this.setState({ new_person: e.target.value });
              }}
              className="form-control col-7"
              placeholder={'E-post'}
              type="text"
            />
            <select
              onChange={e => {
                console.log(e.target.value);
                this.state.invite = e.target.value;
              }}
              className="form-control"
            >
              {this.state.my_types.map(type => (
                <option value={type.volunteer_type_id}>{type.name}</option>
              ))}
            </select>
            {/*<Autocomplete*/}
            {/*  options={this.state.my_types}*/}
            {/*  className="col-5"*/}
            {/*  onChange={(e, value) => {*/}
            {/*    this.state.invite = value;*/}
            {/*  }}*/}
            {/*  getOptionLabel={pers => pers.name}*/}
            {/*  style={{ width: 300 }}*/}
            {/*  renderInput={params => (*/}
            {/*    <TextField*/}
            {/*      {...params}*/}
            {/*      className="form-control"*/}
            {/*      label="Velg personelltype"*/}
            {/*      variant="outlined"*/}
            {/*      fullWidth*/}
            {/*    />*/}
            {/*  )}*/}
            {/*/>*/}
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
        </div>
      </div>
    );
  }
  invitePerson() {
    if (this.state.new_person === undefined || this.state.invite === undefined) {
      alert('Vennligst velg både en person å invitere og en type personellgruppe.');
      return;
    }
    console.log(this.state.new_person);
    console.log(this.state.invite);

    OrganiserService.inviteVolunteer(
      this.state.new_person,
      this.state.event.event_id,
      Number(this.state.invite),
    ).then(response => {
      console.log(response);
      let text = '';
      if (response.data.message === 'Added new user') {
        text =
          ' som personell. Det er opprettet en bruker du kan bruke for å logge deg inn på Harmoni. </p><p><b>Brukernavn: <b> ' +
          this.state.new_person +
          '</p><p><b>Passord: <b>' +
          response.data.password;
      } else {
        text = ' som personell.';
      }
      OrganiserService.getEvent(this.state.event.event_id)
        .then(resp => {
          OrganiserService.sendmail(this.state.new_person, resp.data.name, text)
            .then(response => {
              console.log('Email sent');
              this.componentDidMount();
            })
            .catch(error => {
              console.log('error sendmail: ' + error);
            });
        })
        .catch(error => {
          console.log(error);
        });

      this.componentDidMount();
    });
  }
  removePerson(user_id: number) {
    OrganiserService.removeVolunteerFromEvent(this.state.event.event_id, user_id).then(response => {
      console.log(response);
      this.componentDidMount();
    });
  }
  back() {
    this.props.onSelectPage(6);
  }
  next() {
    window.location = '/orgevent/' + this.state.event.event_id;
  }
}
export default EventNew7;
