//@flow
import { Event, User, Location, Organiser, TicketType } from './modelDao';
const Dao = require('./dao.js');
/** ClASS representing the Organiser DAO */
module.exports = class OrganiserDao extends Dao {
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }

  /**
   * Get the pool
   */
  getPool() {
    return super.getPool();
  }

  /**
   * Get an event by event id and check if organiser is connected to it (decides whether the object is sent back).
   */
  getEvent(
    event_id: number,
    organiser_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString =
      'SELECT e.*, DATE_FORMAT(e.end, "%Y-%m-%d %H:%i") as end_format, DATE_FORMAT(e.start, "%Y-%m-%d %H:%i") as start_format, l.location_id, l.name as location_name, l.address, l.postcode FROM event e LEFT JOIN event_organiser eo ON e.event_id = eo.event_id LEFT JOIN location l ON l.location_id = e.location_id WHERE eo.organiser_id = ? AND e.event_id = ?';
    super.query(queryString, [organiser_id, event_id], callback);
  }

  /**
   * Get the logged in profile's information.
   */
  getProfile(organiser_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT o.organiser_id, o.organiser_email, o.name, o.image, o.description, o.tlf, o.website, o.address, v.eventsFinished, v.eventsComing FROM organiser o LEFT JOIN (SELECT eo.organiser_id, COUNT(IF(e.end <= CURRENT_TIMESTAMP, 1, NULL)) AS eventsFinished, COUNT(IF(e.end > CURRENT_TIMESTAMP, 1, NULL)) AS eventsComing FROM event e LEFT JOIN event_organiser eo ON eo.event_id = e.event_id GROUP BY eo.organiser_id) v ON v.organiser_id = o.organiser_id WHERE o.organiser_id = ?';
    super.query(queryString, [organiser_id], callback);
  }

  /**
   * Edit the logged in profile's information.
   */
  editProfile(
    organiser_id: number,
    organiser: Organiser,
    callback: (status: string, data: Object) => mixed,
  ) {
    var password = '';

    if (organiser.hash != null) {
      password = ", hash = '" + organiser.hash + "', salt = '" + organiser.salt + "'";
    }

    var queryString =
      'UPDATE organiser SET name = ?, organiser_email= ?, image= ?, description = ?, tlf = ?, website = ?, address = ?' +
      password +
      ' WHERE organiser_id = ?';
    super.query(
      queryString,
      [
        organiser.name,
        organiser.organiser_email,
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

  /**
   * Check if organiser owns event
   */
  organiserOwnsEvent(
    event_id: number,
    organiser_id: string,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'SELECT 1 FROM event_organiser WHERE event_id = ? AND organiser_id = ?';
    super.query(queryString, [event_id, organiser_id], callback);
  }
  // Edit an event by sending in the new information and event id.
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

  /**
   * Change whether an event by id is cancelled or not.
   */
  toggleCancel(event_id: number, callback: (status: string, data: Event) => mixed) {
    super.query(
      'UPDATE event e SET e.cancel = NOT e.cancel WHERE e.event_id = ?',
      [event_id],
      callback,
    );
  }

  /**
   * Add an artist to an event by user id and by event id.
   */
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

  /**
   * Add a volunteer by user id to event by event id within volunteer type volunteer type id.
   */
  addVolunteerToEvent(
    user_id: number,
    event_id: number,
    volunteer_type_id: number,
    callback: (status: string, data: Event) => mixed,
  ) {
    super.query(
      'INSERT INTO `event_volunteer` (event_id, user_id, volunteer_type_id) VALUES (?, ?, ?)',
      [event_id, user_id, volunteer_type_id],
      callback,
    );
  }

  /**
   * Remove volunteer by id from event by id.
   */
  removeVolunteerFromEvent(
    user_id: number,
    event_id: number,
    callback: (status: string, data: Event) => mixed,
  ) {
    super.query(
      'DELETE FROM `event_volunteer` WHERE event_id = ? AND user_id = ?',
      [event_id, user_id],
      callback,
    );
  }

  /**
   * Edits an event artist to add or change contracts and other files.
   */
  putEventArtist(
    user_id: number,
    event_id: number,
    contract: string,
    notes: string,
    accepted: boolean,
    callback: (status: string, data: Event) => mixed,
  ) {
    super.query(
      'UPDATE event_artist SET contract = ?, notes = ?, accepted = ? WHERE user_id = ? AND event_id = ?',
      [contract, notes, accepted, user_id, event_id],
      callback,
    );
  }

  /**
   * Deletes an event by id.
   */
  deleteEvent(event_id: number, callback: (status: string, data: Object) => mixed) {
    console.log('Dao delete startet');
    super.query('DELETE FROM event WHERE event_id=?', [event_id], callback);
  }
  // Creates an event by using sent in data from a form.
  postEvent(event: Event, callback: (status: string, data: Object) => mixed) {
    console.log(event);
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

  /**
   * Gets all locations
   */
  getLocation(callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT * FROM location ORDER BY name';
    super.query(queryString, [], callback);
  }

  /**
   * Get a single location
   */
  getSingleLocation(location_address: string, callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT location_id FROM location WHERE address = ?';
    super.query(queryString, [location_address], callback);
  }

  /**
   * Create new location in database from location form
   */
  postLocation(location: Location, callback: (status: string, data: number) => mixed) {
    super.query(
      'INSERT INTO location (address, name, postcode) VALUES (?,?,?)',
      [location.address, location.name, location.postcode],
      callback,
    );
  }

  /**
   * Get all groups based on an organiser id.
   */
  getGroup(organiser_id: string, callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT volunteer_type_id, name FROM volunteer_type WHERE organiser_id = ?';
    super.query(queryString, [organiser_id], callback);
  }

  /**
   * Get all ticket types based on an event id.
   */
  getEventTickets(event_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT et.price, et.amount, tt.* FROM event_ticket et LEFT JOIN ticket_type tt ON et.ticket_type_id = tt.ticket_type_id WHERE et.event_id = ?';
    super.query(queryString, [event_id], callback);
  }

  /**
   * Get an artist by event id.
   */
  getArtist(event_id: string, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT contract, notes, accepted, artist_name, email FROM event_artist JOIN artist USING(user_id) JOIN user USING(user_id) WHERE event_artist.event_id = ?';
    super.query(queryString, [event_id], callback);
  }

  /**
   * Get an event artist connection by event id.
   */
  getEventArtist(event_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT u.email, a.user_id, a.artist_name, ea.contract, ea.notes FROM artist a LEFT JOIN event_artist ea ON a.user_id = ea.user_id LEFT JOIN user u ON u.user_id = a.user_id WHERE ea.event_id = ?';
    super.query(queryString, [event_id], callback);
  }

  /**
   * Gets user id to an email to see if user exists
   */
  getUserId(email: string, callback: (status: string, data: Object) => mixed) {
    var queryString = 'SELECT user_id FROM user WHERE email = ?';
    super.query(queryString, [email], callback);
  }

  /**
   * Gets (artist) user id to an email to see if user exists
   */
  checkArtist(user_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'SELECT user_id FROM artist WHERE user_id = ?';
    super.query(queryString, [user_id], callback);
  }

  /**
   * Create dummy user and artist, to add an artist on event.
   */
  postUser(
    email: string,
    hash: String,
    salt: String,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'INSERT INTO user (email, hash, salt) VALUES(?, ?, ?)';
    super.query(queryString, [email, hash, salt], callback);
  }

  /**
   * Create empty artist profile connected to a user id.
   */
  postArtist(user_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'INSERT INTO artist(user_id) VALUES(?)';
    super.query(queryString, [user_id], callback);
  }

  /**
   * Creates event organiser connection by organiser id and event id.
   */
  postEventOrganiser(
    event_id: number,
    organiser_id: number,
    callback: (status: string, data: number) => mixed,
  ) {
    super.query('INSERT INTO event_organiser VALUES (?, ?)', [event_id, organiser_id], callback);
  }

  /**
   * Deletes organisers for an event
   */
  deleteEventOrganisers(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_organiser WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Deletes volunteers for an event
   */
  deleteEventVolunteers(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_volunteer WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Deletes artists for an event
   */
  deleteEventArtists(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_artist WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Deletes files for an event
   */
  deleteEventFiles(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM misc_file WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Deletes tickettypes for an event
   */
  deleteEventTickets(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM event_ticket WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Deletes organiser by id.
   */
  deleteOrganiser(organiser_id: number, callback: (status: string, data: Object) => mixed) {
    console.log('Dao: ' + organiser_id);
    super.query('DELETE FROM organiser WHERE organiser_id = ?', [organiser_id], callback);
  }

  /**
   * Gets all riders in event by id.
   */
  getRiders(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT r.rider_id, r.rider_file, u.email, a.artist_name FROM rider r LEFT JOIN user u USING(user_id) LEFT JOIN artist a USING(user_id) WHERE r.event_id = ?',
      [event_id],
      callback,
    );
  }

  /**
   * Updates a rider file (string) in the database by rider id and event id.
   */
  editRider(
    rider_file: string,
    event_id: number,
    rider_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'UPDATE rider SET rider_file = ? WHERE rider_id = ? AND event_id = ?',
      [rider_file, rider_id, event_id],
      callback,
    );
  }

  /**
   * Posts a rider file (string) to the database connected to user by id and event by id.
   */
  postRider(
    rider_file: string,
    event_id: number,
    user_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'INSERT INTO rider (rider_file, event_id, user_id) VALUES(?,?,?)',
      [rider_file, event_id, user_id],
      callback,
    );
  }

  /**
   * Deletes a rider on an event by rider id and event id (for verification).
   */
  deleteRider(
    event_id: number,
    rider_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'DELETE FROM rider WHERE event_id = ? AND rider_id = ?',
      [event_id, rider_id],
      callback,
    );
  }

  /**
   * Deletes riders for an event by id.
   */
  deleteEventRiders(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM rider WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Deletes schedule for an event by id.
   */
  deleteEventSchedule(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM schedule WHERE event_id = ?', [event_id], callback);
  }

  /**
   * Get volunteers on an event by id and organiser by id (for verification).
   */
  getVolunteersByEvent(
    event_id: number,
    organiser_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    let queryString =
      'SELECT u.user_id, u.email, u.name, u.tlf, u.image, u.description, vt.name as volunteer_type FROM user u LEFT JOIN event_volunteer ev ON u.user_id = ev.user_id LEFT JOIN volunteer_type vt ON ev.volunteer_type_id = vt.volunteer_type_id WHERE ev.event_id = ? AND ? IN(SELECT eo.organiser_id FROM event_organiser eo WHERE eo.event_id = ev.event_id) ORDER BY volunteer_type;';
    super.query(queryString, [event_id, organiser_id], callback);
  }

  /**
   * Post volunteer type by name (string) and organiser id.
   */
  postVolunteerType(name: string, id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'INSERT INTO volunteer_type (name, organiser_id) VALUES (?,?)';
    super.query(queryString, [name, id], callback);
  }

  /**
   * Delete volunteer type by id.
   */
  deleteVolunteerType(id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'DELETE FROM volunteer_type WHERE volunteer_type_id = ?';
    super.query(queryString, [id], callback);
  }

  /**
   * Edit event ticket by using information from a form and ticket type id.
   */
  editTicketType(
    ticketType: TicketType,
    ticket_type_id: number,
    callback: (status: string, data: TicketType) => mixed,
  ) {
    super.query(
      'UPDATE ticket_type SET name = ?, description = ? WHERE ticket_type_id = ? AND organiser_id = ?;',
      [ticketType.name, ticketType.description, ticketType.ticket_type_id, ticket_type_id],
      callback,
    );
  }

  /**
   * Get artists connected to an event by id.
   */
  getArtistsByEvent(event_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT u.user_id, u.email, u.name, u.tlf, u.image, u.description, a.artist_name FROM user u LEFT JOIN artist a ON a.user_id = u.user_id LEFT JOIN event_artist ea ON ea.user_id = a.user_id WHERE ea.event_id = ?;';
    super.query(queryString, [event_id], callback);
  }

  /**
   * Get all ticket types on an organiser by id.
   */
  getMyTickets(organiser_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'SELECT * FROM ticket_type WHERE organiser_id = ?';
    super.query(queryString, [organiser_id], callback);
  }

  /**
   * Get a ticket type by ticket type id.
   */
  getTicketType(ticket_type_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'SELECT * FROM ticket_type WHERE ticket_type_id = ?';
    super.query(queryString, [ticket_type_id], callback);
  }

  /**
   * Post ticket type by sent in form and organiser id.
   */
  postTicketType(
    ticket: TicketType,
    organiser_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'INSERT INTO ticket_type (organiser_id, name, description) VALUES(?,?,?)';
    super.query(queryString, [organiser_id, ticket.name, ticket.description], callback);
  }

  /**
   * Delete ticket type by ticket type id.
   */
  deleteTicketType(ticket_type_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString = 'DELETE FROM ticket_type WHERE ticket_type_id = ?';
    super.query(queryString, [ticket_type_id], callback);
  }

  /**
   * Delete event ticket connection
   */
  deleteEventTicket(
    ticket_type_id: number,
    event_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'DELETE FROM event_ticket WHERE ticket_type_id = ? AND event_id = ?';
    super.query(queryString, [ticket_type_id, event_id], callback);
  }

  /**
   * Post ticket type by sent in form and event id.
   */
  postEventTicket(
    ticket: TicketType,
    event_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString =
      'INSERT INTO event_ticket (ticket_type_id, price, amount, event_id) VALUES(?,?,?,?)';
    super.query(
      queryString,
      [ticket.ticket_type_id, ticket.price, ticket.amount, event_id],
      callback,
    );
  }

  /**
   * Get all events connected to an organiser by id.
   */
  getMyEvents(organiser_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT e.*,DATE_FORMAT(e.end, "%Y-%m-%d %H:%i") as end_format, DATE_FORMAT(e.start, "%Y-%m-%d %H:%i") as start_format, l.location_id, l.name as location_name, l.address, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE event_id IN(SELECT event_id FROM event_organiser WHERE organiser_id = ?)',
      organiser_id,
      callback,
    );
  }
};
