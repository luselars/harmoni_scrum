import chai from 'chai';
import http from 'chai-http';
import app from '../server';
import { testDatabase } from '../config/dbCredentials';

chai.use(http);
const { expect } = chai;
const adminDao = require('../../dao/adminDao.js');
let dao = new adminDao(
  testDatabase.url,
  testDatabase.user,
  testDatabase.password,
  testDatabase.database,
);
const runsqlfile = require('./runsqlfile.js');
let adminRoutes = require('../routes/adminRoutes');
adminRoutes.changeDao(dao);

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
        username: 'admin@harmoni.com',
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
  // it('Should retreive the profile for a logged in user', done => {
  //     chai
  //         .request(app)
  //         .get('/user/myprofile')
  //         .set('Accept', 'application/json')
  //         .set('x-access-token', jwt)
  //         .end((err, res) => {
  //             expect(res.status).to.equal(200);
  //             done();
  //         });
  // });
  it('placeholder', done => {
    expect(1).equal(1);
    done();
  });
});
