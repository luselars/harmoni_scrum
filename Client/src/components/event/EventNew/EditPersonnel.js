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
      console.log(response.data);
      this.setState({ my_types: response.data });
    });
  }
  render() {
    return (
      <div className="createEvent" id="cardnewevent">
        <div className="form-group text-center ml-5 mr-5">
          <p>Knytt personell til arrangementet: </p>
        </div>
        <div>
          <p>Legg til personelltype:</p>
          <p id="alert" style={{ color: 'red' }} hidden="true">
            Ingen personelltype skrevet inn.
          </p>
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
          <p>Slett personelltyper:</p>
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
      </div>
    );
  }

  /**Deletes Personnel */
  deleteType() {
    if (this.state.delete.name === undefined) {
      return;
    }
    OrganiserService.deleteVolunteerType(this.state.delete.volunteer_type_id).then(response => {
      // TODO gi alert om at type er lagt til
      alert('231');
      this.props.updateParent();
      this.componentDidMount();
    });
  }

  /**Creates personnel type*/
  createType() {
    // Opprett personellgruppe her
    if (
      this.state.new_type === null ||
      typeof this.state.new_type !== 'string' ||
      this.state.new_type === ''
    ) {
      document.getElementById('alert').hidden = false;
      return;
    }
    OrganiserService.addVolunteerType(this.state.new_type).then(response => {
      // TODO gi alert om at type er lagt til
      alert('234');
      this.props.updateParent();
      this.componentDidMount();
    });
  }
}
export default EditPersonnel;
