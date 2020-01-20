import chai from 'chai';
import http from 'chai-http';
import app from '../server';

chai.use(http);
const { expect } = chai;
const publicDao = require('../../dao/publicDao.js');
let dao = new publicDao('mysql-ait.stud.idi.ntnu.no', 'sebastel', 'HGTdKcVW', 'sebastel');
const runsqlfile = require('./runsqlfile.js');
let publicRoutes = require('../routes/publicRoutes');
publicRoutes.changeDao(dao);
/*
File to test endpoints in routes-folder.
Uses chai to send the requests.
*/
beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), done);
  });
});

jest.setTimeout(5000);
// Test API-endpoints for /event
describe('Get events from endpoint', () => {
  it('Should fetch events', done => {
    chai
      .request(app)
      .get('/public/event')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
