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
  my_types: [],
  new_type: string,
};
type Props = {
  updateParent: any,
};

/**Component for editing Personnel */
class EditPersonnel extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      my_types: [],
      new_type: string,
    };
  }
  /**Check if the user is currently writing an event, if so load inputs with data */
  componentDidMount() {
    OrganiserService.getVolunteerType().then(response => {
      this.setState({ my_types: response.data });
    });
  }
  render() {
    return (
      <form onSubmit={event => this.createType(event)}>
        <h4 className="text-center my-3">Knytt personell til arrangementet: </h4>
        <label>Legg til personelltype:</label>
        <p id="alert" style={{ color: 'red' }} hidden="true">
          Ingen personelltype skrevet inn.
        </p>
        <p id="alertgood" style={{ color: 'green' }} hidden="true">
          Personell lagt til
        </p>
        <p id="alertdelete" style={{ color: 'red' }} hidden="true">
          Personell er slettet
        </p>
        <input
          onChange={e => {
            this.setState({ new_type: e.target.value });
          }}
          className="form-control w-100 my-2"
          placeholder="Skriv personelltype..."
          type="text"
          value={this.state.new_type}
          required
        />
        <button type="submit" className="btn btn-success col-sm-3 my-2 d-block mx-auto">
          Opprett
        </button>
        <div>
          <h4 className="text-center my-3">Slett personelltyper:</h4>
          <select
            id="delete"
            onChange={e => {
              this.state.delete = e.target.value;
            }}
            className="form-control w-100 my-2"
          >
            {this.state.my_types.map(type => (
              <option value={type.volunteer_type_id}>{type.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              this.deleteType();
            }}
            type="button"
            className="btn btn-secondary col-sm-3 my-2 d-block mx-auto"
          >
            <i className="fa fa-trash m-0" placeholder="slett" aria-hidden="true"></i> Slett
          </button>
        </div>
        <div className="border-bottom border-dark border-5 m-5"></div>
      </form>
    );
  }

  /**Deletes Personnel */
  deleteType() {
    document.getElementById('alertgood').hidden = true;
    document.getElementById('alert').hidden = true;
    document.getElementById('alertdelete').hidden = true;
    this.state.delete = document.getElementById('delete').value;
    if (this.state.delete === undefined) {
      return;
    }
    OrganiserService.deleteVolunteerType(this.state.delete).then(response => {
      this.props.updateParent();
      this.componentDidMount();
      document.getElementById('alertdelete').hidden = false;
    });
  }

  /**Creates personnel type*/
  createType(e: any) {
    document.getElementById('alertgood').hidden = true;
    document.getElementById('alert').hidden = true;
    e.preventDefault();
    // Opprett personellgruppe her
    if (
      this.state.new_type === null ||
      typeof this.state.new_type !== 'string' ||
      this.state.new_type === ''
    ) {
      document.getElementById('alert').hidden = false;
      return;
    }
    OrganiserService.addVolunteerType(this.state.new_type)
      .then(response => {
        // TODO gi alert om at type er lagt til
        document.getElementById('alertgood').hidden = false;
        this.props.updateParent();
        this.componentDidMount();
      })
      .catch(err => {});
  }
}
export default EditPersonnel;
