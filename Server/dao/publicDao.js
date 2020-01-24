import './modelDao';
import { Event } from './modelDao';
const Dao = require('./dao.js');

module.exports = class PublicDao extends Dao {
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }
  // Get the pool
  getPool() {
    return super.getPool();
  }

  //Gets all public events where end date is still in the future
  getPublicEvents(callback) {
    super.query(
      'SELECT e.*, DATE_FORMAT(e.end, "%Y-%m-%d %H:%i") as end_format, DATE_FORMAT(e.start, "%Y-%m-%d %H:%i") as start_format, l.address, l.name as location_name, l.postcode, v.min_price, v.max_price FROM event e LEFT JOIN location l ON l.location_id = e.location_id LEFT JOIN (SELECT et.event_id, MIN(et.price) as min_price, MAX(et.price) as max_price FROM event_ticket et GROUP BY et.event_id) v ON v.event_id = e.event_id WHERE end > now() - INTERVAL 1 month AND e.is_public IS TRUE AND (TRUE IN(SELECT o.verified FROM organiser o WHERE o.organiser_id IN(SELECT eo.organiser_id FROM event_organiser eo WHERE eo.event_id = e.event_id)))',
      [],
      callback,
    );
  }
  // Get all ticket types connected to a specific event by event id.
  getEventTickets(event_id: number, callback) {
    super.query(
      'SELECT tt.name, tt.description, et.price, et.amount FROM ticket_type tt LEFT JOIN event_ticket et ON et.ticket_type_id = tt.ticket_type_id WHERE et.event_id = ?',
      [event_id],
      callback,
    );
  }

  //Gets all artists in an event by event id.
  getArtistEvent(event_id: number, callback) {
    super.query(
      'SELECT user_id, artist_name from artist WHERE user_id IN(SELECT user_id FROM event_artist WHERE event_id = ?)',
      [event_id],
      callback,
    );
  }

  //Gets one single public event, gives nothing if not public
  getPublicEvent(event_id: number, callback) {
    super.query(
      'SELECT e.*,DATE_FORMAT(e.end, "%Y-%m-%d %H:%i") as end_format, DATE_FORMAT(e.start, "%Y-%m-%d %H:%i") as start_format, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE e.is_public IS TRUE AND e.event_id = ?',
      [event_id],
      callback,
    );
  }

  //Creates a new user in database by sent in form. (organiser or regular user).
  insertNewUser(state: Object, callback: (status: string, data: Event) => mixed) {
    if (state.organiser) {
      super.query(
        "INSERT INTO organiser (organiser_email, hash, salt, name, image, tlf, description, address, website) VALUES(?,?,?,?,?,?,?,?,?);INSERT INTO ticket_type (name, description, organiser_id) VALUES ('Ordinær Billett','Vanlig billett',LAST_INSERT_ID()),('Ståbillett','Ståplass',LAST_INSERT_ID()),('Sittebillett','Sitteplass',LAST_INSERT_ID());",
        [
          state.email,
          state.hash,
          state.salt,
          state.name,
          state.imageUrl,
          state.tlf,
          state.description,
          state.address,
          state.website,
        ],
        callback,
      );
    } else {
      super.query(
        'INSERT INTO user (email, name, hash, salt, image, description, tlf) VALUES(?,?,?,?,?,?,?)',
        [
          state.email,
          state.name,
          state.hash,
          state.salt,
          state.imageUrl,
          state.description,
          state.tlf,
        ],
        callback,
      );
    }
  }
  // Get the login information of the user by comparing to sent in email.
  getUserLoginInfo(email: string, callback: (status: string, data: Object) => mixed) {
    super.query('Select hash, salt, user_id from user WHERE email = ?', email, callback);
  }
  // Get the login information of the organiser by comparing to sent in email.
  getOrganiserLoginInfo(email: string, callback: (status: string, data: Object) => mixed) {
    super.query(
      'Select hash, salt, organiser_id from organiser WHERE organiser_email = ?',
      email,
      callback,
    );
  }
  // Get the login information of the admin by comparing to sent in email.
  getAdminLoginInfo(email: string, callback: (status: string, data: Object) => mixed) {
    super.query('Select * from admin WHERE email = ?', email, callback);
  }
  // Checks to see if an email exists in the database that matches the sent in email.
  emailExists(email: string, callback) {
    super.query(
      'SELECT organiser_email as email, "organiser" as type FROM organiser WHERE organiser_email = ? UNION SELECT email, "user" as type FROM user WHERE email = ?',
      [email, email],
      callback,
    );
  }
  // Change the password as an organiser.
  editPasswordOrg(hash: string, salt: string, email: string, callback) {
    super.query(
      'UPDATE organiser SET hash = ?, salt = ? WHERE organiser_email = ?',
      [hash, salt, email],
      callback,
    );
  }
  // Change the password as a user.
  editPasswordUser(hash: string, salt: string, email: string, callback) {
    super.query(
      'UPDATE user SET hash = ?, salt = ? WHERE email = ?',
      [hash, salt, email],
      callback,
    );
  }
};
