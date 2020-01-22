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
import { Event, User, Location, Organiser, TicketType } from '../../dao/modelDao.js';
const organiserDao = require('../../dao/organiserDao.js');
const runsqlfile = require('./runsqlfile.js');
let dao = new organiserDao('mysql-ait.stud.idi.ntnu.no', 'sebastel', 'HGTdKcVW', 'sebastel');

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

describe('Testing all relevant parts of organiserDAO', () => {
  // Find an event by ID (needs to be administered by email)
  it("Find event that doesn't exist", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    dao.getEvent(4, 1, callback);
  });

  // Find an event by ID (needs to be administered by email)
  it("Find event that isn't connected to right organiser", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    dao.getEvent(2, 1, callback);
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
    dao.getEvent(1, 1, callback);
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
    dao.editEvent(event, 1, callback);
  });

  // Deletes an event
  it('Delete event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.deleteEvent(2, callback);
  });

  // Finds a tickettype
  it('Find Ticket-types for an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(2);
      done();
    }
    dao.getEventTickets(3, callback);
  });

  // Finds an artist
  it('Find Artist', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getArtist(1, callback);
  });

  // Get organiser profile information
  it('Get profile info of organiser', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getProfile(1, callback);
  });

  // Change organiser profile information
  it('Change profile info of organiser', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    let organiser: Organiser = new Organiser('asshole@asshole.com', 'Sorte Bill');
    dao.editProfile(1, organiser, callback);
  });

  // Add artist information on an event
  it('Add artist to an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.addArtistToEvent(1, 3, callback);
  });

  // Change artist information on an event
  it('Change artist on an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.putEventArtist(1, 3, 'soo', 'ass', true, callback);
  });

  // Get all location
  it('Get all locations', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getLocation(callback);
  });

  // Get all location
  it('Get single location', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getSingleLocation('adresse', callback);
  });

  // Add a location
  it('Add location', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    let location: Location = new Location('ru', 4029, 'rururu');
    dao.postLocation(location, callback);
  });

  // Get a volunteer group
  it('Get a volunteer group', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getGroup(1, callback);
  });

  // Get Artist on a single event
  it('Get Artist on a single event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getEventArtist(1, callback);
  });

  // Get a user's id sending in the email
  it('Get User on a single event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getUserId('testuser@testemail.com', callback);
  });

  // Check if a user is an artist
  it('Check if a user is an artist', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.checkArtist(1, callback);
  });

  //Create a dummy user
  it('Create a dummy user to add an artist to an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.postUser('snelle@snell.snell', callback);
  });
  //Create a dummy artist
  it('Create a dummy artist to add an artist to an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.postArtist(2, callback);
  });

  //Adds the organiser to an event as an event organiser
  it('Adds the organiser to an event as an event organiser', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.postEventOrganiser(3, 1, callback);
  });

  it('Get the riders on an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getRiders(1, callback);
  });

  it('Get the volunteers on an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getVolunteersByEvent(1, 1, callback);
    dao.getV;
  });

  // Editing a single ticket type.
  it('Edit a single ticket type', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
      done();
    }
    let type: TicketType = new TicketType('Yolo billett (bli skutt hardt med vanngevær)');
    type.ticket_type_id = 1;
    dao.editTicketType(type, 1, callback);
  });

  // Gets a ticket type
  it('Get a tickettype', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getTicketType(1, callback);
  });

  // Gets all events of logged in account
  it('Get events associated with an organiser', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getMyEvents(1, callback);
  });

  // Gets riders
  it('Gets riders', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getRiders(1, callback);
  });

  // Posts a new rider
  it('Posts a new rider', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    dao.postRider('newfile.pdf', 1, 1, callback);
  });

  // Checks that the new rider is now found when get runs
  it('Gets riders again with new one.', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(2);
      done();
    }
    dao.getRiders(1, callback);
  });

  // Edits a rider
  it('Edit rider', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    dao.editRider('anotherfile.pdf', 1, 2, callback);
  });

  // Deletes a rider
  it('Deletes rider', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    dao.deleteRider(1, 1, callback);
  });

  // Checks that the rider was deleted.
  it('Checks that the rider was deleted.', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getRiders(1, callback);
  });

  // Checks that the tickettypes were gotten.
  it('Checks that the tickettypes were gotten.', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(2);
      done();
    }
    dao.getMyTickets(1, callback);
  });

  // Checks that a tickettype was gotten.
  it('Checks that a single tickettype was gotten.', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.length).toBe(1);
      done();
    }
    dao.getTicketType(1, callback);
  });

  // Add a tickettype to an event.
  it('Add a tickettype to an event', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    let ticket: TicketType = new TicketType('asd');
    ticket.ticket_type_id = 2;
    ticket.price = 55;
    ticket.amount = 200;
    dao.postEventTicket(ticket, 1, callback);
  });

  // Add a tickettype
  it('Add a tickettype', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    let ticket: TicketType = new TicketType('asd');
    ticket.price = 55;
    ticket.description = 'asdasd';
    ticket.name = 'asdasd';
    dao.postTicketType(ticket, 1, callback);
  });

  // Delete event ticket
  it('Delete event ticket', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    let ticket: TicketType = new TicketType('asd');
    ticket.price = 55;
    ticket.description = 'asdasd';
    ticket.name = 'asdasd';
    dao.deleteEventTicket(2, 1, callback);
  });

  // Delete a ticket type
  it('Delete a ticket type', done => {
    function callback(status, data) {
      console.log('Test callback: status=');
      expect(data.affectedRows).toBe(1);
      done();
    }
    let ticket: TicketType = new TicketType('asd');
    ticket.price = 55;
    ticket.description = 'asdasd';
    ticket.name = 'asdasd';
    dao.deleteTicketType(1, callback);
  });
});
