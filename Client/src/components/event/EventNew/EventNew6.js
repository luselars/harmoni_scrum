//@flow
import React, { createRef } from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { number, string } from 'prop-types';
import { TicketType, Artist, Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

type State = {
  event: Event,
  event_tickets: [],
  org_tickets: [],
  new_ticket: string,
  new_ticket_desc: string,
  new_event_ticket: TicketType,
  ev_price: number,
  ev_amount: number,
};

class EventNew6 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      event_tickets: [],
      org_tickets: [],
      new_ticket: string,
      new_event_ticket: TicketType,
      new_ticket_desc: string,
      ev_price: number,
      ev_amount: number,
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
        // Get tickets tied to event
        OrganiserService.getTickets(this.state.event.event_id).then(response => {
          this.setState({ event_tickets: response.data });
          console.log(this.state.event_tickets);
        });
      });
      // Get tickets tied to organiser
      OrganiserService.getMyTickets().then(response => {
        this.setState({ org_tickets: response.data });
        if (this.state.org_tickets.length > 0) {
          this.setState({ new_event_ticket: this.state.org_tickets[0].ticket_type_id });
          this.setState({ ev_price: 0 });
          this.setState({ ev_amount: 0 });
        }
        console.log(this.state.org_tickets);
      });
    }
  }
  render() {
    return (
      <div className="createEvent" id="cardnewevent">
        <h2 className="neweventtitle">Opprett arrangement</h2>
        {/*<form>*/}
        <div className="form-group text-center ml-5 mr-5">
          <p>Legg til billett-typer: </p>
        </div>
        <div className="form-group text-center ml-5 mr-5"></div>
        <div>
          <p>Oprett billett:</p>
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
          <select onChange={e => this.setState({ new_event_ticket: Number(e.target.value) })}>
            {this.state.org_tickets.map(ticket => (
              <option value={ticket.ticket_type_id}>{ticket.name}</option>
            ))}
          </select>
          <input
            defaultValue={'0'}
            onChange={e => this.setState({ ev_price: e.target.value })}
            type="number"
            placeholder={'pris'}
          />
          <input
            defaultValue={'0'}
            onChange={e => this.setState({ ev_amount: e.target.value })}
            type="number"
            placeholder={'antall'}
          />
          <button onClick={() => this.addTicketToEvent()}>Legg til</button>
          <div>
            <p>Mine billetter:</p>
            {this.state.event_tickets.map(ticket => (
              <p>
                {ticket.name}: {ticket.amount} stk. kr {ticket.price}
              </p>
            ))}
          </div>
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
  addTicketToEvent() {
    let ticket = new TicketType();
    for (let i = 0; i < this.state.org_tickets.length; i++) {
      if (this.state.org_tickets[i].ticket_type_id === this.state.new_event_ticket) {
        ticket = this.state.org_tickets[i];
      }
    }
    if (ticket.ticket_type_id === null) {
      return;
    }
    ticket.price = Number(this.state.ev_price);
    ticket.amount = Number(this.state.ev_amount);
    let update = false;
    for (let i = 0; i < this.state.event_tickets.length; i++) {
      if (this.state.event_tickets[i].ticket_type_id === ticket.ticket_type_id) {
        update = true;
      }
    }
    if (update) {
      console.log('Update ticket');
    } else {
      OrganiserService.postEventTicket(ticket, this.state.event.event_id).then(r => {
        console.log(r);
        window.location.reload();
      });
    }
  }
  createTicket() {
    console.log('test');
    let ticket = new TicketType();
    ticket.name = this.state.new_ticket;
    ticket.description = this.state.new_ticket_desc;
    OrganiserService.postTicket(ticket, this.state.event.event_id).then(response => {
      console.log(response);
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
    window.location = '/newevent5';
  }
  next() {
    window.location = '/profile';
  }
}
export default EventNew6;
