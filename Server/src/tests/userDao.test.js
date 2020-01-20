/* DELETE SOON BICH BOCH
event.name = "Mcpearsons nye organfest";
event.image = "piano.img";
event.start = "2008-1-29 14:57:00";
event.end = "2008-1-29 16:00:00";
event.status = "ready to party";
event.is_public = 1;
event.venue = "Koselig plass";
event.location_id = 1;
event.event_id = 2;
*/
import mysql from 'mysql';
import { Event, User, Location, Organiser } from '../../dao/modelDao.js';
const userDao = require('../../dao/userDao.js');
let dao = new userDao('mysql-ait.stud.idi.ntnu.no', 'sebastel', 'HGTdKcVW', 'sebastel');
const runsqlfile = require('./runsqlfile.js');

beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), done);
  });
});

describe('Testing functionality from userDAO', () => {
  it('1 equals 1', done => {
    expect(1).toEqual(1);
    done();
  });
});
// Edit your user
it('Edit an existing user', done => {
  function callback(status, data) {
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }
  let user: User = new User('testuser@testemail.com', 'Jens');
  user.description = 'asdasd';
  user.user_id = 1;
  dao.editUser(user.user_id,user, callback);
});

// Adds your account as an artist
it('Add an artist to event', done => {
  function callback(status, data) {
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }
  dao.linkArtist('testuser@testemail.com', 3, callback);
});

// Deletes your user
it('Deletes a user', done => {
  function callback(status, data) {
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }
  dao.deleteUser(2, callback);
});

// Finds all events user is tied to
it('Finds all events user is tied to', done => {
  function callback(status, data) {
    expect(data.length).toBe(2);
    done();
  }
  dao.getUserByEvent(1, callback);
});

// Finds info for the user by id
it('Finds info for the user', done => {
  function callback(status, data) {
    expect(data.length).toBe(1);
    done();
  }
  dao.getUserInfo(1, callback);
});
// Gets the id of the logged in user.
it('Gets id of the logged in user', done => {
  function callback(status, data) {
    expect(data.length).toBe(1);
    done();
  }
  dao.getMyId('testuser@testemail.com', callback);
});
