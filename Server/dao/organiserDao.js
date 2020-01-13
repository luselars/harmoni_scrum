//@flow
import { Event, User, Location, Organiser, TicketType } from './modelDao';
const Dao = require('./dao.js');

module.exports = class OrganiserDao extends Dao {
  getEvent(event_id: number, email: string, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT e.* FROM event e LEFT JOIN event_organiser eo ON e.event_id = eo.event_id WHERE eo.organiser_email = ? AND e.event_id = ?';
    super.query(queryString, [email, event_id], callback);
  }

  // check if organiser owns event
  organiserOwnsEvent(
    event_id: number,
    email: string,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'SELECT 1 FROM event_organiser WHERE event_id = ? AND organiser_email = ?';
    super.query(queryString, [event_id, email], callback);
  }

  editEvent(event: Event, callback: (status: string, data: Event) => mixed) {
    super.query(
      'UPDATE event SET name=?,image=?,description=?,start=?,status=?,is_public=?,location_id=?, venue=?, end=? WHERE event_id=?',
      [
        event.name,
        event.image,
        event.description,
        event.start,
        event.status,
        event.is_public,
        event.location_id,
        event.venue,
        event.end,
        event.event_id,
      ],
      callback,
    );
  }

  deleteEvent(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event WHERE event_id=?', [event_id], callback);
  }

  postEvent(event: Event, callback: (status: string, data: Event) => mixed) {
    super.query(
      'INSERT INTO event (name, description, image, start, status, is_public, location_id, venue, end) VALUES (?,?,?,?,?,?,?,?,?)',
      [
        event.name,
        event.description,
        event.image,
        event.start,
        event.status,
        event.is_public,
        event.location_id,
        event.venue,
        event.end,
      ],
      callback,
    );
  }

  // Get all groups based on an organiser id.
  getGroup(email: string, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT volunteer_type_id, name FROM volunteer_type WHERE organiser_email = ?';
    super.query(queryString, [email], callback);
  }

  // Get all ticket types based on an event id.
  getEventTickets(event_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT et.price, tt.* FROM event_ticket et LEFT JOIN ticket_type tt ON et.ticket_type_id = tt.ticket_type_id WHERE et.event_id = ?';
    super.query(queryString, [event_id], callback);
  }

  getArtist(email: string, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT a.* FROM artist a LEFT JOIN user u ON u.user_id = a.user_id WHERE u.email = ?';
    super.query(queryString, [email], callback);
  }
  // Creates event organiser
  postEventOrganiser(
    event_id: number,
    email: string,
    callback: (status: string, data: number) => mixed,
  ) {
    super.query('INSERT INTO event_organiser VALUES (?,?)', [event_id, email], callback);
  }
  // Deletes organisers for an event
  deleteEventOrganisers(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_organiser WHERE event_id = ?', [event_id], callback);
  }
  // Deletes volunteers for an event
  deleteEventVolunteers(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_volunteer WHERE event_id = ?', [event_id], callback);
  }
  // Deletes artists for an event
  deleteEventArtists(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_artist WHERE event_id = ?', [event_id], callback);
  }
  // Deletes files for an event
  deleteEventFiles(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM misc_file WHERE event_id = ?', [event_id], callback);
  }
  // Deletes tickettypes for an event
  deleteEventTickets(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_ticket WHERE event_id = ?', [event_id], callback);
  }
  // Deletes riders for an event
  deleteEventRiders(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM rider WHERE event_id = ?', [event_id], callback);
  }
  // Deletes schedule for an event
  deleteEventSchedule(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM schedule WHERE event_id = ?', [event_id], callback);
  }

  getVolunteersByEvent(event_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT u.user_id, u.email, u.name, u.tlf, u.image, u.description, vt.name as volunteer_type FROM user u LEFT JOIN event_volunteer ev ON u.user_id = ev.user_id LEFT JOIN volunteer_type vt ON ev.volunteer_type_id = vt.volunteer_type_id WHERE ev.event_id = ?;';
    super.query(queryString, [event_id], callback);
  }

  editTicketType(ticketType: TicketType, callback: (status: string, data: TicketType) => mixed) {
    super.query(
      'UPDATE ticket_type SET name = ?, description = ? WHERE ticket_type_id = ?;',
      [ticketType.name, ticketType.description, ticketType.ticket_type_id],
      callback,
    );
  }

  getArtistsByEvent(event_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT u.user_id, u.email, u.name, u.tlf, u.image, u.description, a.artist_name FROM user u LEFT JOIN artist a ON a.user_id = u.user_id LEFT JOIN event_artist ea ON ea.user_id = a.user_id WHERE ea.event_id = ?;';
    super.query(queryString, [event_id], callback);
  }
};
