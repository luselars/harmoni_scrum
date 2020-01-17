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
let dao = new userDao('mysql', 'root', 'secret', 'supertestdb');

beforeAll(done => {
  runsqlfile('./testTables.sql', dao.getPool(), () => {
    runsqlfile('./testData.sql', done);
  });
});

describe('Empty test', () => {
  it('1 equals 1', done => {
    expect(1).toEqual(1);
    done();
  });
});
