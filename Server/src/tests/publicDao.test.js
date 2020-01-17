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
const publicDao = require('../../dao/publicDao.js');
let dao = new publicDao('mysql', 'root', 'secret', 'supertestdb');
const runsqlfile = require('./runSQL.js');

beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), done);
  });
});

describe('Empty test', () => {
  it('1 equals 1', done => {
    expect(1).toEqual(1);
    done();
  });
});
