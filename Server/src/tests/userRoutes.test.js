import chai from 'chai';
import http from 'chai-http';
import app from '../server';
import { testDatabase } from '../config/dbCredentials';

chai.use(http);
const { expect } = chai;
const userDao = require('../../dao/userDao.js');
let dao = new userDao(
  testDatabase.url,
  testDatabase.user,
  testDatabase.password,
  testDatabase.database,
);
const runsqlfile = require('./runsqlfile.js');
let userRoutes = require('../routes/userRoutes');
userRoutes.changeDao(dao);

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
        username: 'testuser@testemail.com',
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
describe('Get userprofile', () => {
  it('Should retreive the profile for a logged in user', done => {
    chai
      .request(app)
      .get('/user/myprofile')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
let data = {
  email: 'testuser@testemail.com',
  password: 'ertertert',
  name: 'Jonas',
};
describe('Get userprofile', () => {
  it('Should retreive the profile for a logged in user', done => {
    chai
      .request(app)
      .get('/user/myprofile')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        data.user_id = res.body[0].user_id;
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Update userprofile', () => {
  it('Should update the profile for a logged in user', done => {
    chai
      .request(app)
      .put('/user/myprofile')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
});
describe('Get all events user is a part of', () => {
  it('Should get events', done => {
    chai
      .request(app)
      .get('/user/' + data.user_id + '/event')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);
        done();
      });
  });
});
describe('Set artistname', () => {
  it('Should set name', done => {
    chai
      .request(app)
      .put('/user/artistname')
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .send({ artist_name: 'ARTIST!' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
});
describe('Delete user', () => {
  it('Should delete user', done => {
    chai
      .request(app)
      .delete('/user/' + data.user_id)
      .set('Accept', 'application/json')
      .set('x-access-token', jwt)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.affectedRows).to.equal(1);
        done();
      });
  });
});
