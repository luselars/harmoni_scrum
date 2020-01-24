//@flow
import React, { Component } from 'react';
import './stylesheet.css';
import { number, string } from 'prop-types';
import { Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
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

/**Component for seventh page on creating a new event */
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

  /**Reloads components */
  update = () => {
    this.componentDidMount();
  };

  /**Gets from localstorage. Gets event and personnel */
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        OrganiserService.getMyVolunteers(this.state.event.event_id).then(response => {
          this.setState({ personnel: response.data });
        });
      });
      OrganiserService.getVolunteerType().then(response => {
        this.setState({ my_types: response.data });
        if (response.data[0] !== undefined) {
          this.setState({ invite: response.data[0].volunteer_type_id });
        }
      });
    }
  }

  /**Expands page */
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
        <div className="col-md-12">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.toggleExpandCreate();
            }}
            className="text-center"
          >
            <button className="btn btn-success col-sm-6 m-2 d-block mx-auto">
              Endre dine personelltyper
            </button>

            {this.state.expandCreate ? (
              <i className="arrow down text-center"></i>
            ) : (
              <i className="arrow up text-center"></i>
            )}
          </div>
          {this.state.expandCreate ? (
            <EditPersonnel
              updateParent={() => {
                this.update();
              }}
            />
          ) : null}

          <h4 className="text-center">Knytt personell til arrangementet </h4>
          <p id="alert" style={{ color: 'red' }} hidden="true">
            Legg til både personell og personellgruppe
          </p>
          <form onSubmit={event => this.invitePerson(event)}>
            <label className="text-center">Inviter personell til arrangementet:</label>
            <div className="row">
              <div className="col-sm-4">
                <label>Type:</label>
                <select
                  onChange={e => {
                    this.setState({ invite: e.target.value });
                  }}
                  className="form-control"
                >
                  {this.state.my_types.map(type => (
                    <option value={type.volunteer_type_id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-8">
                <label>E-mail:</label>
                <input
                  onChange={e => {
                    this.setState({ new_person: e.target.value });
                  }}
                  className="form-control"
                  placeholder="Skriv e-mail..."
                  type="email"
                  value={this.state.new_person}
                  required
                />
              </div>
            </div>
            <button className="btn btn-success col-sm-3 m-2 d-block mx-auto" type="submit">
              Inviter
            </button>
          </form>
          <div className="border-bottom m-5"></div>
          <div>
            <h4 className="text-center">Mitt personell:</h4>
            {this.state.my_types.map(type => (
              <span>
                {this.state.personnel.filter(c => c.volunteer_type === type.name).length > 0 ? (
                  <div className="row justify-content-center">
                    <table className="table table-bordered text-center my-4 col-md-10">
                      <thead className="thead-light">
                        <tr>
                          <th className="col">{type.name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.personnel
                          .filter(c => c.volunteer_type === type.name)
                          .map(p => (
                            <tr>
                              <th>
                                <p className="float-left">{p.email}</p>
                                <button
                                  onClick={() => this.removePerson(p.user_id)}
                                  className="btn btn-seacondary float-right"
                                >
                                  <i
                                    className="fa fa-trash m-0"
                                    placeholder="slett"
                                    aria-hidden="true"
                                  ></i>
                                  Fjern
                                </button>
                              </th>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </span>
            ))}
          </div>

          <button
            onClick={() => this.next()}
            className="btn btn-success col-sm-3 m-2 d-block mx-auto"
            type="button"
            id="nextbtn"
          >
            Fullfør
          </button>
          <button
            onClick={() => this.back()}
            className="btn btn-secondary col-sm-3 m-2 d-block mx-auto"
            id="backbtn"
            type="button"
          >
            Tilbake
          </button>
        </div>
      </div>
    );
  }

  /**Invite personnel to event and sends email to personnel */
  invitePerson(event) {
    event.preventDefault();
    document.getElementById('alert').hidden = true;
    if (this.state.new_person === undefined || this.state.invite === undefined) {
      document.getElementById('alert').hidden = false;
      window.scrollTo(0, 0);
      return;
    }

    OrganiserService.inviteVolunteer(
      this.state.new_person,
      this.state.event.event_id,
      Number(this.state.invite),
    ).then(response => {
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
              this.componentDidMount();
            })
            .catch(error => {});
        })
        .catch(error => {});

      this.setState({ new_person: '' });
      this.componentDidMount();
    });
  }
  /**Removes personnel from event and reloads page*/
  removePerson(user_id: number) {
    OrganiserService.removeVolunteerFromEvent(this.state.event.event_id, user_id).then(response => {
      this.componentDidMount();
    });
  }

  /**Returns to previous page */
  back() {
    this.props.onSelectPage(6);
  }

  /**Completes event*/
  next() {
    // $FlowFixMe
    window.location = '/orgevent/' + this.state.event.event_id;
  }
}
export default EventNew7;
