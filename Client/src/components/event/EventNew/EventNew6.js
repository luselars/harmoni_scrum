//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { number, string } from 'prop-types';
import { TicketType, Event } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
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
      ev_price: 0,
      ev_amount: 0,
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
        // Get tickets tied to event
        OrganiserService.getTickets(this.state.event.event_id).then(response => {
          this.setState({ event_tickets: response.data });
        });
      });
      // Get tickets tied to organiser
      OrganiserService.getMyTickets().then(response => {
        this.setState({ org_tickets: response.data });
        if (this.state.org_tickets.length > 0) {
          this.setState({ new_event_ticket: this.state.org_tickets[0].ticket_type_id });
          console.log(typeof this.state.ev_price);
          console.log(this.state.ev_price);
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

  update = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12">
          <label
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.toggleExpandCreate();
            }}
            className="text-center"
          >
            Endre dine bilettyper
            <br />
            <br />
            {this.state.expandCreate ? (
              <i className="arrow down text-center"></i>
            ) : (
              <i className="arrow up text-center"></i>
            )}
          </label>
          {this.state.expandCreate ? (
            <EditTickets
              updateParent={() => {
                this.update();
              }}
            />
          ) : null}
          <h4 className="text-center">
            Legg til billetter på arrangement:
            <MoreInfo
              padding={'5px'}
              text={
                'Legg til billetter med antall og pris på arrangementet. For å legge til en billett må det velges en av billett-typene knyttet til kontoen din. Nye billett-typer kan oprettes og slettes i feltet under, og vil være lagret til videre arrangementer.'
              }
            />
          </h4>
          <div className="row">
            <div className="col-sm-4">
              <label>Billett:</label>
              <select
                onChange={e => this.setState({ new_event_ticket: Number(e.target.value) })}
                className="form-control"
              >
                {this.state.org_tickets.map(ticket => (
                  <option value={ticket.ticket_type_id}>{ticket.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-4">
              <label>Pris:</label>
              <input
                defaultValue={this.state.ev_price}
                onChange={e => this.setState({ ev_price: e.target.value })}
                type="number"
                className="form-control"
                placeholder={'pris'}
              />
            </div>
            <div className="col-sm-4">
              <label>Antall:</label>
              <input
                defaultValue={this.state.ev_amount}
                onChange={e => this.setState({ ev_amount: e.target.value })}
                type="number"
                className="form-control"
                placeholder={'antall'}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <button
              onClick={() => this.addTicketToEvent()}
              type="button"
              className="btn btn-success col-sm-3 m-2"
            >
              Legg til
            </button>
          </div>
          <div className="border-bottom m-5"></div>
          <div>
            <h4 className="text-center">Billetter lagt til:</h4>
            {this.state.event_tickets.length > 0 ? (
              <span>
                {this.state.event_tickets.map(ticket => (
                  <div className="text-center">
                    <label>
                      {ticket.name}: {ticket.amount} stk. kr {ticket.price}{' '}
                    </label>
                    <button
                      onClick={() => this.removeTicket(ticket.ticket_type_id)}
                      className="btn btn-secondary col-sm-3"
                    >
                      <i className="fa fa-trash m-0" placeholder="slett" aria-hidden="true"></i>
                      Fjern
                    </button>
                  </div>
                ))}
              </span>
            ) : (
              <label className="text-center">
                Du har ikke lagt til noen billetter på dette arrangementet.
              </label>
            )}
          </div>
          <br />
          <div className="row justify-content-center mt-3">
            <div className="col-12 text-center">
              <button onClick={() => this.next()} className="btn btn-success w-25" id="nextbtn">
                Neste
              </button>
            </div>
            <div className="col-12 text-center">
              <button
                onClick={() => this.back()}
                className="btn btn-secondary mt-2 w-25"
                id="backbtn"
              >
                Tilbake
              </button>
            </div>
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

  back() {
    this.props.onSelectPage(5);
  }

  next() {
    this.props.onSelectPage(7);
  }
}

export default EventNew6;
