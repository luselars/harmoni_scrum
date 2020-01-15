//@flow
import { Event, User, Location, Organiser, TicketType } from './modelDao';

const Dao = require('./dao.js');

module.exports = class OrganiserDao extends Dao {
  getEvent(
    event_id: number,
    organiser_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString =
      'SELECT e.*, l.* FROM event e LEFT JOIN event_organiser eo ON e.event_id = eo.event_id LEFT JOIN location l ON l.location_id = e.location_id WHERE eo.organiser_id = ? AND e.event_id = ?';
    super.query(queryString, [organiser_id, event_id], callback);
  }

  getProfile(organiser_id, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT o.organiser_id, o.organiser_email, o.name, o.image, o.description, o.tlf, o.website, o.address, v.eventsFinished, v.eventsComing FROM organiser o LEFT JOIN (SELECT eo.organiser_id, COUNT(IF(e.start <= CURRENT_TIMESTAMP, 1, NULL)) AS eventsFinished, COUNT(IF(e.start > CURRENT_TIMESTAMP, 1, NULL)) AS eventsComing FROM event e LEFT JOIN event_organiser eo ON eo.event_id = e.event_id GROUP BY eo.organiser_id) v ON v.organiser_id = o.organiser_id WHERE o.organiser_id = ?';
    super.query(queryString, [organiser_id], callback);
  }

  editProfile(
    organiser_id: number,
    organiser: Organiser,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString =
      'UPDATE organiser SET name = ?, image= ?, description = ?, tlf = ?, website = ?, address = ? WHERE organiser_id = ?';
    super.query(
      queryString,
      [
        organiser.name,
        organiser.image,
        organiser.description,
        organiser.tlf,
        organiser.website,
        organiser.address,
        organiser_id,
      ],
      callback,
    );
  }

  // check if organiser owns event
  organiserOwnsEvent(
    event_id: number,
    organiser_id: string,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'SELECT 1 FROM event_organiser WHERE event_id = ? AND organiser_id = ?';
    super.query(queryString, [event_id, organiser_id], callback);
  }

  editEvent(event: Event, event_id: number, callback: (status: string, data: Event) => mixed) {
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
        event_id,
      ],
      callback,
    );
  }

  addArtistToEvent(
    user_id: number,
    event_id: number,
    callback: (status: string, data: Event) => mixed,
  ) {
    super.query(
      'INSERT INTO `event_artist` (event_id, user_id) VALUES (?, ?)',
      [event_id, user_id],
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

  getMyId(email: string, callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT organiser_id FROM organiser WHERE organiser_email = ?';
    super.query(queryString, [email], callback);
  }
  // Get all locations
  getLocation(callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT * FROM location ORDER BY name';
    super.query(queryString, [], callback);
  }

  // Get a single location
  getSingleLocation(location_address: string, callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT location_id FROM location WHERE address = ?';
    super.query(queryString, [location_address], callback);
  }

  //create new location in database
  postLocation(location: Location, callback: (status: string, data: number) => mixed) {
    super.query(
      'INSERT INTO location (address, name, postcode) VALUES (?,?,?)',
      [location.address, location.name, location.postcode],
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

  //gets user id to an email to see if user exists
  getUserId(email: string, callback: (status: string, data: Object) => mixed) {
    var queryString = 'SELECT user_id FROM user WHERE email = ?';
    super.query(queryString, [email], callback);
  }
  //gets (artist) user id to an email to see if user exists
  getArtistId(user_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'SELECT user_id FROM artist WHERE user_id = ?';
    super.query(queryString, [user_id], callback);
  }
  //create dummy user and artist, to add an artist on event.
  postUser(email: string, callback: (status: string, data: Object) => mixed) {
    var queryString = 'INSERT INTO user (email) VALUES(?)';
    super.query(queryString, [email], callback);
  }
  postArtist(user_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'INSERT INTO artist(user_id) VALUES(?)';
    super.query(queryString, [user_id], callback);
  }

  // Creates event organiser
  postEventOrganiser(
    event_id: number,
    organiser_id: number,
    callback: (status: string, data: number) => mixed,
  ) {
    super.query('INSERT INTO event_organiser VALUES (?, ?)', [event_id, organiser_id], callback);
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

  editTicketType(
    ticketType: TicketType,
    email: string,
    callback: (status: string, data: TicketType) => mixed,
  ) {
    super.query(
      'UPDATE ticket_type SET name = ?, description = ? WHERE ticket_type_id = ? AND organiser_email = ?;',
      [ticketType.name, ticketType.description, ticketType.ticket_type_id, email],
      callback,
    );
  }

  getArtistsByEvent(event_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT u.user_id, u.email, u.name, u.tlf, u.image, u.description, a.artist_name FROM user u LEFT JOIN artist a ON a.user_id = u.user_id LEFT JOIN event_artist ea ON ea.user_id = a.user_id WHERE ea.event_id = ?;';
    super.query(queryString, [event_id], callback);
  }

  getTicketType(
    ticket_type_id: number,
    organiser_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'SELECT * FROM ticket_type WHERE ticket_type_id = ? AND organiser_id = ?;';
    super.query(queryString, [ticket_type_id, organiser_id], callback);
  }
};
