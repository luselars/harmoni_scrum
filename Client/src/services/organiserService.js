// @flow

import axios, { AxiosPromise } from 'axios';
import { Event, Artist, Organiser, TicketType } from './modelService.js';
const url_base = 'http://localhost:4000/organiser';
// axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
// console.log(localStorage.getItem('token'));
const config = {
  headers: {
    'x-access-token': localStorage.getItem('token'),
  },
};
export class OrganiserService {
  static createEvent(event: Event) {
    console.log(event);
    let url = url_base + '/event';
    return axios.post<Object>(url, event, config);
  }
  static updateEvent(event: Event) {
    console.log(event);
    let url = url_base + '/event/' + event.event_id;
    return axios.put<Object>(url, event, config);
  }

  static deleteEvent(id: number): AxiosPromise<Event> {
    console.log('Service delete startet');
    let url = url_base + '/event/' + id;
    return axios.delete<Object>(url, config);
  }

  static getEvent(id: number): AxiosPromise<Event> {
    let url = url_base + '/event/' + id;
    return axios.get(url, config);
  }

  static getOrganiser(): AxiosPromise<Organiser> {
    let url = url_base + '/myprofile';
    return axios.get<Organiser>(url, config);
  }
  static editOrganiser(organiser: Organiser): AxiosPromise<Organiser> {
    let url = url_base + '/myprofile';
    return axios.put<Object>(url, organiser, config);
  }

  static deleteOrganiser(id: number): AxiosPromise<Organiser> {
    console.log('Service: ' + id);
    let url = url_base + '/organiser/' + id;
    return axios.delete<Object>(url, config);
  }

  static getLocations(): AxiosPromise<Location[]> {
    let url = url_base + '/location';
    return axios.get(url, config);
  }
  static postLocation(location: Location) {
    let url = url_base + '/location';
    return axios.post(url, location, config);
  }
  static inviteArtist(email: string, event_id) {
    let url = url_base + '/artist/' + event_id;
    return axios.post(url, { email: email }, config);
  }
  static inviteVolunteer(email: string, event_id, volunteer_type_id: number) {
    let url = url_base + '/volunteer/' + volunteer_type_id + '/' + event_id;
    return axios.post(url, { email: email }, config);
  }
  static getMyEvents(): AxiosPromise<Event[]> {
    let url = url_base + '/myevents';
    return axios.get(url, config);
  }
  static getArtists(event_id: number): AxiosPromise<Artist[]> {
    let url = url_base + '/artist/' + event_id;
    return axios.get(url, config);
  }
  static updateArtistEvent(artist: Artist, event_id: number) {
    let data = {
      event_id: event_id,
      contract: artist.contract,
      notes: artist.notes,
      accepted: artist.accepted,
    };
    let url = url_base + '/artist/' + artist.user_id;
    return axios.put(url, data, config);
  }

  // Get all riders on an event
  static getRiders(event_id: number) {
    let url = url_base + '/event/rider/' + event_id;
    return axios.get(url, config);
  }

  // Posts a new rider
  static postRider(rider_file: string, event_id: number, user_id: number) {
    let url = url_base + '/event/rider/' + event_id + '/' + user_id;
    return axios.post(url, { rider_file }, config);
  }

  // Updates an existing rider
  static updateRider(rider_file: string, event_id: number, rider_id: number) {
    let url = url_base + '/event/rider/' + event_id + '/' + rider_id;
    return axios.put(url, { rider_file }, config);
  }

  // Deletes a rider
  static deleteRider(event_id: number, rider_id: number) {
    let url = url_base + '/event/rider/' + event_id + '/' + rider_id;
    console.log(url);
    return axios.delete(url, config);
  }

  // Get all tickettypes on an event
  static getTickets(event_id: number) {
    let url = url_base + '/event/' + event_id + '/tickets';
    return axios.get(url, config);
  }
  // Get all tickettypes an organiser has
  static getMyTickets() {
    let url = url_base + '/tickets';
    return axios.get(url, config);
  }

  // Adds a new tickettype to an organiser
  static postTicket(ticket: TicketType) {
    let url = url_base + '/tickets';
    return axios.post(url, ticket, config);
  }

  // Adds a new tickettype to an event
  static postEventTicket(ticket: TicketType, event_id: number) {
    let url = url_base + '/event/' + event_id + '/tickets';
    return axios.post(url, ticket, config);
  }

  // Delete a tickettype on an event
  static deleteEventTicket(ticket_id: number, event_id: number) {
    let url = url_base + '/event/' + event_id + '/tickets/' + ticket_id;
    return axios.delete(url, config);
  }

  // Updates an existing tickettype
  static updateTickets(ticket: TicketType, ticket_id: number) {
    let url = url_base + '/tickets/' + ticket_id;
    return axios.put(url, { ticket }, config);
  }

  // Removes an existing tickettype
  static deleteTicket(ticket_id: number) {
    let url = url_base + '/tickets/' + ticket_id;
    return axios.delete(url, config);
  }

  //get all volunteertypes on this organiser
  static getVolunteerType() {
    let url = url_base + '/group';
    return axios.get(url, config);
  }

  //adds volunteer type to this organiser
  static addVolunteerType(name: string) {
    let url = url_base + '/volunteer';
    return axios.post(url, { name }, config);
  }
}
