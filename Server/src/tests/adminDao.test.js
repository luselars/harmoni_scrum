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
//import {Artist} from "../../../Client/src/services/modelService";
const adminDao = require('../../dao/adminDao.js');
let dao = new adminDao('mysql-ait.stud.idi.ntnu.no', 'sebastel', 'HGTdKcVW', 'sebastel');
const runsqlfile = require('./runsqlfile.js');

class State {
  constructor(organiser: boolean, name: string, email: string, salt: string, hash: string) {
    this.email = email;
    this.name = name;
    this.organiser = organiser;
    this.hash = hash;
    this.salt = salt;
  }
  organiser: boolean;
  name: string;
  email: string;
  hash: string;
  hash: string;
  email: string;
  name: string;
  url: string;
  organiser: true;
  address: string;
  imageUrl: string;
  tlf: string;
  description: string;
}

beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), done);
  });
});

describe('Testing methods in public dao', () => {
  it('1 equals 1', done => {
    expect(1).toEqual(1);
    done();
  });

  it('Get all organisers', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    dao.getOrganisers(callback);
  });
  it('Get unverified organiser', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    dao.getUnverified(callback);
  });
  it('Verify the organiser', done => {
    function callback(status, data) {
      expect(data.affectedRows).toBe(1);
      done();
    }
    dao.verifyOrganiser(1, callback);
  });
  it('Make sure that no more unverified organisers exist', done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    dao.getUnverified(callback);
  });
});
