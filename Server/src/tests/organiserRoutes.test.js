import chai from 'chai';
import http from 'chai-http';
import app from '../server';
import { testDatabase } from '../config/dbCredentials';

chai.use(http);
const { expect } = chai;
const organiserDao = require('../../dao/organiserDao.js');
let dao = new organiserDao(
  testDatabase.url,
  testDatabase.user,
  testDatabase.password,
  testDatabase.database,
);
const runsqlfile = require('./runsqlfile.js');
let organiserRoutes = require('../routes/organiserRoutes');
organiserRoutes.changeDao(dao);

const publicDao = require('../../dao/publicDao.js');
let daoP = new publicDao(
  testDatabase.url,
  testDatabase.user,
  testDatabase.password,
  testDatabase.database,
);
let publicRoutes = require('../routes/publicRoutes');
publicRoutes.changeDao(daoP);

/*
File to test endpoints in routes-folder.
Uses chai to send the requests.
*/
let jwt: string;
beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), () => {
      // Log in, save token.
      let data = {
        username: 'organiser@email.com',
        password: 'ertertert',
      };
      chai
        .request(app)
        .post('/public/login')
        .set('Accept', 'application/json')
        .send(data)
        .end((err, res) => {
          jwt = res.body.jwt;
          console.log(jwt);
          done();
        });
    });
  });
});
describe('Create, get, delete event', () => {
  let event = {
    name: 'name',
    is_public: true,
  };
  it('Should post event', done => {
    chai
      .request(app)
      .post('/organiser/event')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
  it('Should delete event', done => {
    chai
      .request(app)
      .delete('/organiser/event/3')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
  it('should get event', done => {
    chai
      .request(app)
      .get('/organiser/event/2')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.event_id).to.equal(2);
        done();
      });
  });
});
describe('Locations', () => {
  it('Should get all locations', done => {
    chai
      .request(app)
      .get('/organiser/location')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        done();
      });
  });
});
describe('Artists on event', () => {
  let artist = {
    artist_id: 1,
    contract: '.',
    event_id: 2,
    notes: 'notes',
    accepted: true,
  };
  it('Should edit an artist on an event', done => {
    chai
      .request(app)
      .put('/organiser/artist/1')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .send(artist)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
});
describe('Riders', () => {
  it('Should get riders for event', done => {
    chai
      .request(app)
      .get('/organiser/event/rider/2')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        done();
      });
  });
  it('should delete rider', done => {
    chai
      .request(app)
      .delete('/organiser/event/rider/2/2')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
});
