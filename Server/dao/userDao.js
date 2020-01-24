import './modelDao';
//@flow
const Dao = require('./dao.js');

/** Class representing the User DAO. */
module.exports = class UserDao extends Dao {
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }
  /**
   * Get the pool.
   */
  getPool() {
    return super.getPool();
  }
  /**
   * Edit the logged in user by sending in a form with the user information and the user's id.
   */
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

  /**
   * Link the logged in account by email to an event by id as artist.
   */
  linkArtist(email: string, event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'INSERT INTO event_artist (event_id, user_id) VALUES(?, (SELECT user_id FROM user WHERE email = ?))',
      [event_id, email],
      callback,
    );
  }

  /**
   * Delete a user by id.
   */
  deleteUser(user_id: number, callback: (status: string, data: Object) => mixed) {
    super.query('DELETE FROM user WHERE user_id=?', [user_id], callback);
  }

  /**
   * Get all events connected to a user by id.
   */
  getUserEvents(user_id: number, callback: (status: string, data: Object) => mixed) {
    let queryString =
      'SELECT e.event_id FROM event e WHERE e.event_id IN(SELECT ea.event_id FROM event_artist ea WHERE ea.user_id = 1) UNION SELECT e.event_id FROM event e WHERE e.event_id IN(SELECT ev.event_id FROM event_volunteer ev WHERE ev.user_id = 1)';
    super.query(queryString, [user_id], callback);
  }
  // Get all the information of a user by id.
  getUserInfo(user_id: number, callback: (status: string, data: Object) => mixed) {
    console.log(user_id);
    let queryString = `SELECT u.user_id, u.email, u.name, a.artist_name, u.image, u.description, u.tlf, v.eventsFinished, v.eventsComing 
      FROM user u
      LEFT JOIN artist a USING(user_id)
      LEFT JOIN (SELECT ea.user_id, COUNT(IF(e.end <= CURRENT_TIMESTAMP, 1, NULL)) AS eventsFinished, 
      COUNT(IF(e.end > CURRENT_TIMESTAMP, 1, NULL)) AS eventsComing 
      FROM event e 
      LEFT JOIN event_artist ea USING(event_id)
      GROUP BY ea.user_id) v USING(user_id) 
      WHERE u.user_id = ?`;
    super.query(queryString, [user_id], callback);
  }

  /**
   * Sets the artist's name by user id.
   */
  setArtistName(
    artist_name: string,
    user_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    let queryString = 'UPDATE artist SET artist_name = ? WHERE user_id = ?';
    super.query(queryString, [artist_name, user_id], callback);
  }

  /**
   * Get all events connected to logged in user by user id.
   */
  getMyEvents(user_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT e.*, ea.*, a.* FROM event e LEFT JOIN event_artist ea ON e.event_id = ea.event_id LEFT JOIN artist a ON a.user_id = ea.user_id WHERE a.user_id = ?',
      [user_id],
      callback,
    );
  }

  /**
   * Get a specific owned event by logged in user by user id and event id.
   */
  getMyEvent(user_id: number, event_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT e.*, l.location_id, l.name as location_name, l.address, l.postcode, ea.contract, ea.notes FROM event e LEFT JOIN event_organiser eo ON e.event_id = eo.event_id LEFT JOIN location l ON l.location_id = e.location_id LEFT JOIN event_artist ea ON ea.event_id = e.event_id AND ea.user_id = ? WHERE e.event_id = ?';
    super.query(queryString, [user_id, event_id], callback);
  }
  /**
   * Get all riders connected to logged in user on specific event by event id and user id.
   */
  getMyRiders(
    event_id: number,
    user_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'SELECT DISTINCT r.*, ea.notes FROM event_artist ea  LEFT JOIN rider r ON ea.event_id = r.event_id AND ea.user_id = r.user_id WHERE ea.event_id = ? AND r.user_id = ?',
      [event_id, user_id],
      callback,
    );
  }

  /**
   * Get all riders on a single event by event id.
   */
  getRiders(event_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT r.*, ea.notes FROM event_artist ea  LEFT JOIN rider r ON ea.user_id = r.user_id WHERE ea.event_id = ?',
      [event_id],
      callback,
    );
  }

  /**
   * Post a rider by string to an event on a user by event id and user id.
   */
  postRiders(
    user_id: number,
    event_id: number,
    rider_file: string,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'INSERT INTO rider (user_id, event_id, rider_file) VALUES (?,?,?)',
      [user_id, event_id, rider_file],
      callback,
    );
  }

  /**
   * Delete a rider on logged in user by user id and rider id.
   */
  deleteRider(
    rider_id: number,
    user_id: number,
    callback: (status: string, data: Object) => mixed,
  ) {
    super.query(
      'DELETE FROM rider WHERE rider_id = ? AND user_id = ?',
      [rider_id, user_id],
      callback,
    );
  }

  /**
   * Get artist connected to an event by event id.
   */
  getEventArtist(event_id: number, callback: (status: string, data: Object) => mixed) {
    var queryString =
      'SELECT u.email, a.user_id, a.artist_name FROM artist a LEFT JOIN event_artist ea ON a.user_id = ea.user_id LEFT JOIN user u ON u.user_id = a.user_id WHERE ea.event_id = ?';
    super.query(queryString, [event_id], callback);
  }

  /**
   * Edit artist notes on a specific event by event id, user id, and notes string.
   */
  putEventArtist(
    event_id: number,
    user_id: number,
    notes: string,
    callback: (status: string, data: Object) => mixed,
  ) {
    var queryString = 'UPDATE event_artist SET notes = ? WHERE user_id = ? AND event_id = ?';
    super.query(queryString, [notes, user_id, event_id], callback);
  }

  /**
   * Get all events connected to logged in artist by user id.
   */
  getMyEventsArtist(user_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
        'SELECT e.*, ea.*, a.* FROM event e LEFT JOIN event_artist ea ON e.event_id = ea.event_id LEFT JOIN artist a ON a.user_id = ea.user_id WHERE a.user_id = ?',
        [user_id],
        callback,
    );
  }

  /**
   * Get all events connected to logged in voluenteer by user id.
   */
  getMyEventsVolunteer(user_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
        'SELECT *, e.name AS event_name FROM event e LEFT JOIN event_volunteer ev USING(event_id) LEFT JOIN volunteer_type vt USING(volunteer_type_id) WHERE ev.user_id = ?',
        [user_id],
        callback,
    );
  }
};

