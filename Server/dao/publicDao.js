import './modelDao';
import { Event, Organiser, User } from './modelDao';
const Dao = require('./dao.js');

module.exports = class PublicDao extends Dao {
  getPublicEvents(sortMethod: string, callback) {
    console.log(typeof sortMethod + ' wtf is sortmethod?');
    let sort: string = sortMethod;
    super.query(
      'SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE start > CURRENT_TIMESTAMP AND e.is_public IS TRUE ORDER BY ' +
        sort,
      sort,
      callback,
    );
  }

  getArtistEvent(event_id: number, callback) {
    super.query(
      'SELECT user_id, artist_name from artist WHERE user_id IN(SELECT user_id FROM event_artist WHERE event_id = ?)',
      [event_id],
      callback,
    );
  }

  getPublicEvent(event_id: number, callback) {
    super.query(
      'SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE e.is_public IS TRUE AND e.event_id = ?',
      [event_id],
      callback,
    );
  }

  postUser(
    user: User,
    hash: string,
    salt: string,
    callback: (status: string, data: Event) => mixed,
  ) {
    super.query(
      'INSERT INTO user (email, name, hash, salt, image, description, tlf) VALUES(?,?,?,?,?,?,?)',
      [
        user.email,
        user.name,
        hash,
        salt,
        user.image,
        user.description,
        user.tlf,
        //hent passord hash og salt
      ],
      callback,
    );
  }

  postOrganiser(
    organiser: Organiser,
    hash: string,
    salt: string,
    callback: (status: string, data: Event) => mixed,
  ) {
    super.query(
      'INSERT INTO organiser (organiser_email, hash, salt, name, image, tlf, description, address, website) VALUES(?,?,?,?,?,?,?,?,?)',
      [
        organiser.organiser_email,
        hash,
        salt,
        organiser.name,
        organiser.image,
        organiser.tlf,
        organiser.description,
        organiser.address,
        organiser.website,
      ],
      callback,
    );
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
};
