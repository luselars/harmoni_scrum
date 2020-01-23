import './modelDao';
//@flow
const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }
  getPool() {
    return super.getPool();
  }

  editUser(user_id: number, user: User, callback: (status: string, data: Object) => mixed) {
    var password = '';

    if (user.hash != null) {
      password = ", hash = '" + user.hash + "', salt = '" + user.salt + "'";
    }

    var queryString =
      'UPDATE user SET email=?,name=?,tlf=?,image=?,description=?' + password + ' WHERE user_id =?';
    super.query(
      queryString,
      [user.email, user.name, user.tlf, user.image, user.description, user_id],
      callback,
    );
  }

  linkArtist(email: string, event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'INSERT INTO event_artist (event_id, user_id) VALUES(?, (SELECT user_id FROM user WHERE email = ?))',
      [event_id, email],
      callback,
    );
  }
  deleteUser(user_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM user WHERE user_id=?', [user_id], callback);
  }

  getUserByEvent(user_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT e.event_id FROM event e WHERE e.event_id IN(SELECT ea.event_id FROM event_artist ea WHERE ea.user_id = 1) UNION SELECT e.event_id FROM event e WHERE e.event_id IN(SELECT ev.event_id FROM event_volunteer ev WHERE ev.user_id = 1)';
    super.query(queryString, [user_id], callback);
  }

  getUserInfo(user_id: number, callback: (status: string, data: Object) => mixed) {
    console.log(user_id);
    let queryString =
      'SELECT u.*, a.artist_name FROM user u LEFT JOIN artist a USING(user_id) WHERE user_id = ?';
    super.query(queryString, [user_id], callback);
  }

  setArtistName(
    artist_name: string,
    user_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    let queryString = 'UPDATE artist SET artist_name = ? WHERE user_id = ?';
    super.query(queryString, [artist_name, user_id], callback);
  }

  getMyEvents(user_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT e.*, ea.*, a.* FROM event e LEFT JOIN event_artist ea ON e.event_id = ea.event_id LEFT JOIN artist a ON a.user_id = ea.user_id WHERE a.user_id = ?',
      [user_id],
      callback,
    );
  }

  getMyEvent(user_id: number, event_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT e.*, l.location_id, l.name as location_name, l.address, l.postcode, ea.contract, ea.notes FROM event e LEFT JOIN event_organiser eo ON e.event_id = eo.event_id LEFT JOIN location l ON l.location_id = e.location_id LEFT JOIN event_artist ea ON ea.event_id = e.event_id AND ea.user_id = ? WHERE e.event_id = ?'; // eo.organiser_id = ? AND TODO: ADD artist id check
    super.query(queryString, [user_id,event_id], callback);
  }

  getMyRiders(
    event_id: number,
    user_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'SELECT r.*, ea.notes FROM event_artist ea  LEFT JOIN rider r ON ea.user_id = r.user_id WHERE ea.event_id = ? AND ea.user_id = ?',
      [event_id, user_id],
      callback,
    );
  }

  getRiders(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT r.*, ea.notes FROM event_artist ea  LEFT JOIN rider r ON ea.user_id = r.user_id WHERE ea.event_id = ?',
      [event_id],
      callback,
    );
  }

  postRiders(
      user_id: number,
      event_id: number,
      rider_file: string,
      callback: (status: string, data: Object) => mixed) {
    super.query(
        'INSERT INTO rider (user_id, event_id, rider_file) VALUES (?,?,?)',
        [user_id, event_id, rider_file], callback
    );
  }

  deleteRider(
      rider_id: number,
      user_id: number,
      callback: (status: string, data: Object)=> mixed) {
    super.query(
       'DELETE FROM rider WHERE rider_id = ? AND user_id = ?',
       [rider_id, user_id], callback
    );
  }


  getEventArtist(event_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT u.email, a.user_id, a.artist_name FROM artist a LEFT JOIN event_artist ea ON a.user_id = ea.user_id LEFT JOIN user u ON u.user_id = a.user_id WHERE ea.event_id = ?';
    super.query(queryString, [event_id], callback);
  }


};
