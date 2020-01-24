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
type Props = {};
class EditEventTickets extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      org_tickets: [],
      new_ticket: string,
      new_ticket_desc: string,
    };
  }
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
        <div>
          <p>Opprett billettype:</p>
          <input
            onChange={e => {
              this.setState({ new_ticket: e.target.value });
            }}
            placeholder={'Bilettnavn'}
            type="text"
          />
          <input
            onChange={e => {
              this.setState({ new_ticket_desc: e.target.value });
            }}
            placeholder={'Billettbeskrivelse'}
            type="text"
          />
          <button onClick={() => this.createTicket()}>Opprett billettype</button>
        </div>
        <div>
          <p>Slett billettype:</p>
          <select onChange={e => this.setState({ new_event_ticket: Number(e.target.value) })}>
            {this.state.org_tickets.map(ticket => (
              <option value={ticket.ticket_type_id}>{ticket.name}</option>
            ))}
          </select>
          <button onClick={() => this.deleteTicket()}>Slett billettype</button>
        </div>
      </div>
    );
  }
  deleteTicket() {
    console.log(this.state.new_event_ticket);
    OrganiserService.deleteTicket(this.state.new_event_ticket).then(response => {
      console.log(response);
      // TODO bytt denne så det bare blir en melding på toppen
      alert('Billettype slettet');
      this.componentDidMount();
    });
  }
  createTicket() {
    let ticket = new TicketType();
    ticket.name = this.state.new_ticket;
    ticket.description = this.state.new_ticket_desc;
    OrganiserService.postTicket(ticket).then(response => {
      console.log(response);
      // TODO bytt denne så det bare blir en melding på toppen
      alert('Billettype lagt til');
      this.componentDidMount();
    });
  }
}
export default EditEventTickets;
