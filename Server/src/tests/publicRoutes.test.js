import chai from 'chai';
import http from 'chai-http';
import app from '../server';
import { User } from '../../dao/modelDao';

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

// Test API-endpoints for /event/:id
describe('Get specific event from endpoint', () => {
  it('Should fetch a sepcific event', done => {
    chai
      .request(app)
      .get('/public/event/1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        done();
      });
  });
});

// Test API-endpoints for /event/:id/artist
describe('Get artist on an event from endpoint', () => {
  it('Should fetch a artist', done => {
    chai
      .request(app)
      .get('/public/event/1/artist')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        done();
      });
  });
  it('Should not fetch artist because there are none', done => {
    chai
      .request(app)
      .get('/public/event/2/artist')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(0);
        done();
      });
  });
});

/*
  let usr = new User();
  usr.email = "kulgutt@hotmail.com";
  usr.name = "macarena";
  usr.tlf = "1234567";
  usr.description = "kulgutt er kul";
  usr.user_id = 53;
  it('Should fetch a artist', done => {
    chai
      .request(app)
      .post('/public/login')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(0);
        done();
      });
  });
*/
