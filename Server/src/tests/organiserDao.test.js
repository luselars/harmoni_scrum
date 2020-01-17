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

// @flow
import mysql from 'mysql';
import { Event, User, Location, Organiser } from '../../dao/modelDao.js';
const organiserDao = require('../../dao/organiserDao.js');
const runsqlfile = require('./runSQL.js');
let dao = new organiserDao('mysql', 'root', 'secret', 'supertestdb');

let event = new Event();
event.name = 'Mcpearsons nye organfest';
event.image = 'piano.img';
event.start = '2008-1-29 14:57:00';
event.end = '2008-1-29 16:00:00';
event.status = 'ready to party';
event.is_public = 1;
event.venue = 'Koselig plass';
event.location_id = 1;

beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), done);
  });
});

describe('', () => {
  // Find an event by ID (needs to be administered by email)
  it("Find event that doesn't exist", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    dao.getEvent(4, callback);
  });

  // Creates a new event
  it('Creating event', done => {
    function callback(status, data) {
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    let event = new Event();
    event.name = 'Mcpearsons nye organfest';
    event.image = 'piano.img';
    event.start = '2008-1-29 14:57:00';
    event.end = '2008-1-29 16:00:00';
    event.status = 'ready to party';
    event.is_public = 0;
    event.venue = 'Koselig plass';
    event.location_id = 1;
    dao.postEvent(event, callback);
  });

  // Find an event by ID (needs to be administered by email)
  it('Get event by id', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    dao.getEvent(4, callback);
  });

  // Updates an event
  it('Update event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    let event = new Event();
    event.is_public = 1;
    event.event_id = 1;
    dao.editEvent(event, callback);
  });

  // Deletes an event
  it('Delete event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.deleteEvent(12, callback);
  });

  // Finds a tickettype
  it('Find Ticket-types for an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(2);
      done();
    }
    dao.getEventTickets(1, callback);
  });

  // Finds an artist
  it('Find Artist', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getArtist('test@test.com', callback);
  });
});
