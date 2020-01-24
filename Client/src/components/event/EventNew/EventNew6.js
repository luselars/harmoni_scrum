//@flow
import React, { createRef } from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { number, string } from 'prop-types';
import { TicketType, Artist, Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MoreInfo from '../../MoreInfo/MoreInfo';
import EditTickets from './EditTickets';

type State = {
  event: Event,
  event_tickets: [],
  org_tickets: [],
  new_ticket: string,
  new_ticket_desc: string,
  new_event_ticket: TicketType,
  ev_price: number,
  ev_amount: number,
  expandCreate: boolean,
};
type Props = {
  onSelectPage: any,
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
      expandCreate: false,
    };
  }
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
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
  toggleExpandCreate() {
    if (this.state.expandCreate) {
      this.setState({ expandCreate: false });
    } else {
      this.setState({ expandCreate: true });
    }
  }
  update = () => {
    this.componentDidMount();
  };
  render() {
    return (
      <div className="createEvent" id="cardnewevent">
        <div className="form-group text-center ml-5 mr-5">
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.toggleExpandCreate();
            }}
          >
            Endre dine bilettyper
            {this.state.expandCreate ? (
              <i className="arrow down"></i>
            ) : (
              <i className="arrow up"></i>
            )}
          </p>
          {this.state.expandCreate ? (
            <EditTickets
              updateParent={() => {
                this.update();
              }}
            />
          ) : null}
        </div>
        <div className="form-group text-center ml-5 mr-5">
          <p>
            Legg til billetter på arrangement:
            <MoreInfo
              padding={'5px'}
              text={
                'Legg til billetter med antall og pris på arrangementet. For å legge til en billett må det velges en av billett-typene knyttet til kontoen din. Nye billett-typer kan oprettes og slettes i feltet under, og vil være lagret til videre arrangementer.'
              }
            />
          </p>
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
          <button onClick={() => this.addTicketToEvent()}>Legg til i arrangement</button>
          <div>
            <p>Billetter lagt til:</p>
            {this.state.event_tickets.length > 0 ? (
              <span>
                {this.state.event_tickets.map(ticket => (
                  <p>
                    {ticket.name}: {ticket.amount} stk. kr {ticket.price}{' '}
                    <button onClick={() => this.removeTicket(ticket.ticket_type_id)}>Fjern</button>
                  </p>
                ))}
              </span>
            ) : (
              <p>Du har ikke lagt til noen billetter på dette arrangementet.</p>
            )}
          </div>
          <div>
            <button onClick={() => this.back()} className="btn btn-success" id="backbtn">
              Tilbake
            </button>
            <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
              Neste
            </button>
          </div>
        </div>
      </div>
    );
  }
  removeTicket(ticket_id: number) {
    OrganiserService.deleteEventTicket(ticket_id, this.state.event.event_id).then(response => {
      console.log(response);
      this.componentDidMount();
    });
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
        this.componentDidMount();
      });
    }
  }
  formatTime() {
    if (this.state.event.start != null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      this.state.event.start = d + ' ' + h + ':00';
    }
    if (this.state.event.end != null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      this.state.event.end = d + ' ' + h + ':00';
    }
  }
  back() {
    this.props.onSelectPage(5);
  }
  next() {
    this.props.onSelectPage(7);
  }
}
export default EventNew6;
