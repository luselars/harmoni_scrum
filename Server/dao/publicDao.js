import './modelDao';
import { Event, Organiser, User } from './modelDao';
const Dao = require('./dao.js');

module.exports = class PublicDao extends Dao {
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }

  getPool() {
    return super.getPool();
  }

  //gets all public events where end date is still in the future
  getPublicEvents(callback) {
    super.query(
      'SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE end > CURRENT_TIMESTAMP AND e.is_public IS TRUE AND (TRUE IN(SELECT o.verified FROM organiser o WHERE o.organiser_id IN(SELECT eo.organiser_id FROM event_organiser eo WHERE eo.event_id = e.event_id)))',
      [],
      callback,
    );
  }

  //gets all artists in an event
  getArtistEvent(event_id: number, callback) {
    super.query(
      'SELECT user_id, artist_name from artist WHERE user_id IN(SELECT user_id FROM event_artist WHERE event_id = ?)',
      [event_id],
      callback,
    );
  }

  //gets one single public event, gives nothing if not public
  getPublicEvent(event_id: number, callback) {
    super.query(
      'SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE e.is_public IS TRUE AND e.event_id = ?',
      [event_id],
      callback,
    );
  }

  //creates a new user in database
  insertNewUser(state: Object, callback: (status: string, data: Event) => mixed) {
    if (state.organiser) {
      super.query(
        'INSERT INTO organiser (organiser_email, hash, salt, name, image, tlf, description, address, website) VALUES(?,?,?,?,?,?,?,?,?)',
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
          //hent passord hash og salt
        ],
        callback,
      );
    }
  }

  getUserLoginInfo(email: string, callback: (status: string, data: Object) => mixed) {
    super.query('Select hash, salt, user_id from user WHERE email = ?', email, callback);
  }

  getOrganiserLoginInfo(email: string, callback: (status: string, data: Object) => mixed) {
    super.query(
      'Select hash, salt, organiser_id from organiser WHERE organiser_email = ?',
      email,
      callback,
    );
  }

  emailExists(email: string, callback) {
    super.query(
      'SELECT organiser_email as email FROM organiser WHERE organiser_email = ? UNION SELECT email FROM user WHERE email = ?',
      [email, email],
      callback,
    );
  }
};
