// @flow
import express from 'express';
import express$Request from 'express';
import express$Response from 'express';
import uploadFunctions from '../uploadHelper';
import { productionDatabase } from '../config/dbCredentials';
var path = require('path');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let app = express();
const publicDao = require('../../dao/publicDao.js');
let dao = new publicDao(
  productionDatabase.url,
  productionDatabase.user,
  productionDatabase.password,
  productionDatabase.database,
);
app.use(bodyParser.json()); // for å tolke JSON i body
let router = express.Router();
// TODO: bruk ekte sertifikat, lest fra config...
let privateKey = 'shhhhhverysecret';
let publicKey = privateKey;
var nodemailer = require('nodemailer');

let tokenDuration = 18000000;

router.changeDao = function changeDao(publicDao: publicDao) {
  dao = publicDao;
};

// Checks if the token is verified, if so it returns a new token that lasts longer
router.get('/refreshToken', (req: express$Request, res: express$Response) => {
  let token = req.headers['x-access-token'];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log('Token NOT ok');
      res.status(401);
      res.json({ error: 'Not authorized, log in again' });
    } else {
      //console.log('Token ok: ' + decoded.username + ', Assigning new token');
      let token = jwt.sign(
        { username: decoded.username, type: decoded.type, id: decoded.id },
        privateKey,
        {
          expiresIn: tokenDuration,
        },
      );
      res.status(200);
      res.send(token);
    }
  });
});

// Get file. The id should match a file in the folder files
// TODO make sure the user is authorised to get the requested file. e.g. the user-id is present in the same row as the filename in db
router.get('/file/:id', function(req, res) {
  //console.log('Got a file request');
  //console.log(path.join(__dirname, '../../files/' + req.params.id));
  res.sendFile(path.join(__dirname, '../../files/' + req.params.id));
});

// Get all public events sorted by a string
router.get('/event', (req, res: express$Response) => {
  dao.getPublicEvents((status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get a specific public event
router.get('/event/:id', (req: express$Request, res: express$Response) => {
  dao.getPublicEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get artist on an event, only artist name
router.get('/event/:id/artist', (req: express$Request, res: express$Response) => {
  dao.getArtistEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get tickets on an event
router.get('/event/:id/tickets', (req: express$Request, res: express$Response) => {
  dao.getEventTickets(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// login for user, returns a jwt token
router.post('/login', (req: express$Request, res: express$Response) => {
  // Gets the users hash and salt from the DB
  dao.getUserLoginInfo(req.body.username, (status, data) => {
    if (status === '200') {
      if (data[0] != null) {
        // Callback function that hashes inputed password and compares to hash in DB
        let salt = data[0].salt;
        let hash = bcrypt.hashSync(req.body.password, salt);
        if (hash === data[0].hash) {
          // Returns a token for autherization if credentials match
          console.log('Username and password ok');
          let token = jwt.sign(
            { username: req.body.username, type: 'user', id: data[0].user_id },
            privateKey,
            {
              expiresIn: tokenDuration,
            },
          );
          res.status(200);
          res.json({ jwt: token, type: 'user' });
        } else {
          console.log('Username and password NOT ok');
          res.status(401);
          res.json({ error: 'Not authorized, check username and password' });
        }
      } else {
        dao.getOrganiserLoginInfo(req.body.username, (status, data) => {
          if (status === '200') {
            if (data[0] != null) {
              // Callback function that hashes inputed password and compares to hash in DB
              let salt = data[0].salt;
              let hash = bcrypt.hashSync(req.body.password, salt);
              if (hash === data[0].hash) {
                // Returns a token for autherization if credentials match
                console.log('Username and password ok');
                let token = jwt.sign(
                  { username: req.body.username, type: 'organiser', id: data[0].organiser_id },
                  privateKey,
                  {
                    expiresIn: tokenDuration,
                  },
                );
                res.json({ jwt: token, type: 'organiser' });
              } else {
                console.log('Username and password NOT ok');
                res.status(401);
                res.json({ error: 'Not authorized, check username and password' });
              }
            } else {
              dao.getAdminLoginInfo(req.body.username, (status, data) => {
                if (status === '200') {
                  if (data[0] != null) {
                    // Callback function that hashes inputed password and compares to hash in DB
                    let salt = data[0].salt;
                    let hash = bcrypt.hashSync(req.body.password, salt);
                    if (hash === data[0].hash) {
                      // Returns a token for autherization if credentials match
                      console.log('Username and password ok. Admin signed inn');
                      let token = jwt.sign(
                        {
                          username: req.body.username,
                          type: 'admin',
                          id: data[0].admin_id,
                        },
                        privateKey,
                        {
                          expiresIn: tokenDuration,
                        },
                      );
                      res.json({ jwt: token, type: 'admin' });
                    } else {
                      console.log('Username and password NOT ok');
                      res.status(401);
                      res.json({ error: 'Not authorized, check username and password' });
                    }
                  } else {
                    res.status(404);
                    res.json({ error: 'Username not found' });
                  }
                } else {
                  res.status(status);
                  res.json({ error: data });
                }
              });
            }
          } else {
            res.status(status);
            res.json({ error: data });
          }
        });
      }
    } else {
      res.status(status);
      res.json({ error: data });
    }
  });
});

// Register new user/organiser
router.post('/register', (req: express$Request, res: express$Response) => {
  // Genereates salt and hash
  req.body.salt = bcrypt.genSaltSync(10);
  req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);
  if (req.body.image != null) {
    uploadFunctions.handleFile(req.body.image, function(imageUrl) {
      req.body.imageUrl = imageUrl;
      dao.insertNewUser(req.body, (status, data) => {
        res.status(status);
        res.send(data);
      });
    });
  } else {
    dao.insertNewUser(req.body, (status, data) => {
      res.status(status);
      res.send(data);
    });
  }
});

// Check if email is in DB
router.get('/checkEmail/:email', (req: express$Request, res: express$Response) => {
  dao.emailExists(req.params.email, (status, data) => {
    console.log(data);
    res.status(status);
    res.send(data);
  });
});

//Send feedback-email
router.post('/feedback', (req: express$Request, res: express$Response) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harmoni.scrum@gmail.com',
      pass: 'scrum2team',
    },
  });

  let mailOptions = {
    from: 'harmoni.scrum@gmail.com',
    to: req.body.email,
    subject: 'Tilbakemelding mottatt',
    html:
      '<h1></h1><p>Vi har mottatt din tilbakemelding og svarer på henvendelsen så fort som mulig. </p><p><b>Din tibakemelding: </b>' +
      req.body.feedback +
      '</p><p>Mvh.<br>Alle oss i harmoni</p>',
  };

  var mailOptions2 = {
    from: 'harmoni.scrum@gmail.com',
    to: 'harmoni.scrum@gmail.com',
    subject: 'Ny tilbakemelding',
    html:
      '<h1>FEEDBACK</h1><p><b>Tibakemelding: </b>' +
      req.body.feedback +
      '</p><p><b>Avsender: </b>' +
      req.body.email +
      '</p>',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
  transporter.sendMail(mailOptions2, function(error, info) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
});

//Send new password
router.post('/newpassword', (req: express$Request, res: express$Response) => {
  let rand = Math.floor(Math.random() * (100000000 - 10000000)) + 10000000;
  let password = rand.toString();
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  console.log('TYPE:' + req.body.type);
  if (req.body.type === 'organiser') {
    dao.editPasswordOrg(hash, salt, req.body.email, (status, data) => {
      res.status(status);
      res.send(data);
    });
  } else {
    dao.editPasswordUser(hash, salt, req.body.email, (status, data) => {
      res.status(status);
      res.send(data);
    });
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harmoni.scrum@gmail.com',
      pass: 'scrum2team',
    },
  });

  let mailOptions = {
    from: 'harmoni.scrum@gmail.com',
    to: req.body.email,
    subject: 'Nytt Passord',
    html:
      '<h1></h1><p>Vi har tilbakestilt ditt gamle passord til et midlertidig passord. Vennligst logg inn og endre dette så fort som mulig.</p>' +
      '<p><b>Ditt nye passord: </b>' +
      password +
      '</p><p>Mvh.<br>Alle oss i harmoni</p>',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
});

module.exports = router;
