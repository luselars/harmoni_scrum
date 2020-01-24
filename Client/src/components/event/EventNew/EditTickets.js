//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { TicketType } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import MoreInfo from '../../MoreInfo/MoreInfo';

type State = {
  org_tickets: [],
  new_ticket: string,
  new_ticket_desc: string,
};
type Props = {
  updateParent: any,
};

/**Component for editting tickets */
class EditTickets extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      org_tickets: [],
      new_ticket: string,
      new_ticket_desc: string,
    };
  }
  /** Gets tickets on the event*/
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    OrganiserService.getMyTickets().then(response => {
      this.setState({ org_tickets: response.data });
      console.log(this.state.org_tickets);
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={event => this.createTicket(event)}>
          <h4 className="text-center">Opprett billettype:</h4>
          <p id="alert" style={{ color: 'green' }} hidden="true">
            Billettype lagt til
          </p>
          <label className="my-3">Billettnavn</label>
          <input
            onChange={e => {
              this.setState({ new_ticket: e.target.value });
            }}
            value={this.state.new_ticket}
            className="form-control w-100"
            placeholder="Skriv billetnavn..."
            type="text"
            required
          />
          <label className="my-3">Billettbeskrivelse</label>
          <input
            onChange={e => {
              this.setState({ new_ticket_desc: e.target.value });
            }}
            value={this.state.new_ticket_desc}
            className="form-control w-100"
            placeholder="Skriv billettbeskrivelse..."
            type="text"
          />
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-success col-sm-6 m-2">
              Opprett
            </button>
          </div>
          <div>
            <h4 className="text-center">Slett billettype:</h4>
            <p id="alertdeleted" style={{ color: 'green' }} hidden="true">
              Billettype slettet
            </p>
            <select id="ticketSelect" className="form-control w-100 my-2">
              {this.state.org_tickets.map(ticket => (
                <option value={ticket.ticket_type_id}>{ticket.name}</option>
              ))}
            </select>
          </div>
        </form>
        <div className="row justify-content-center">
          <button onClick={() => this.deleteTicket()} className="btn btn-secondary col-sm-6 m-2">
            <i className="fa fa-trash m-0" placeholder="slett" aria-hidden="true"></i> Slett
          </button>
        </div>
        <div className="border-bottom border-dark border-5 m-5"></div>
      </div>
    );
  }

  /**Deletes tickets*/
  deleteTicket() {
    document.getElementById('alert').hidden = true;
    document.getElementById('alertdeleted').hidden = true;
    OrganiserService.deleteTicket(document.getElementById('ticketSelect').value).then(response => {
      // TODO bytt denne så det bare blir en melding på toppen
      document.getElementById('alertdeleted').hidden = false;
      this.props.updateParent();
      this.componentDidMount();
    });
  }

  /**Creates tickets */
  createTicket(event) {
    event.preventDefault();
    document.getElementById('alert').hidden = true;
    document.getElementById('alertdeleted').hidden = true;
    let ticket = new TicketType();
    ticket.name = this.state.new_ticket;
    ticket.description = this.state.new_ticket_desc;
    OrganiserService.postTicket(ticket).then(response => {
      // TODO bytt denne så det bare blir en melding på toppen
      document.getElementById('alert').hidden = false;
      this.props.updateParent();
      this.setState({ new_ticket: '', new_ticket_desc: '' });

      this.componentDidMount();
    });
  }
}
export default EditTickets;
