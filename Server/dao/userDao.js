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

  getMyId(email: string, callback: (status: string, data: Object) => mixed) {
    let queryString = 'SELECT user_id FROM user WHERE email = ?';
    super.query(queryString, [email], callback);
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

  getMyRiders(event_id, user_id, callback: (status: string, data: Object) => mixed) {
    super.query(
      'SELECT * FROM rider WHERE event_id = ? AND user_id = ?',
      [event_id, user_id],
      callback,
    );
  }
};
