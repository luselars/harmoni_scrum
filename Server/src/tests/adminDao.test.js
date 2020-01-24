import { testDatabase } from '../config/dbCredentials';
const adminDao = require('../../dao/adminDao.js');
let dao = new adminDao(
  testDatabase.url,
  testDatabase.user,
  testDatabase.password,
  testDatabase.database,
);
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
  it('Get all organisers', done => {
    function callback(status, data) {
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getOrganisers(callback);
  });
  it('Get unverified organiser', done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
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
      expect(data.length).toBe(1);
      done();
    }
    dao.getUnverified(callback);
  });
});
