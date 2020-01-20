// @flow
import express from 'express';
import mysql from 'mysql';
import { sendInvite } from '../mailClient';
import { User, Organiser } from '../../dao/modelDao';
import uploadFunctions from '../uploadHelper';

var path = require('path');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let app = express();
const publicDao = require('../../dao/publicDao.js');
let dao = new publicDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');
app.use(bodyParser.json()); // for å tolke JSON i body
let router = express.Router();
// TODO: bruk ekte sertifikat, lest fra config...
let privateKey = 'shhhhhverysecret';
let publicKey = privateKey;

var tokenDuration = 18000000;

// Checks if the token is verified, if so it returns a new token that lasts longer
function updateToken(token) {
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log('Token NOT ok');
      res.status(401);
      res.json({ error: 'Not authorized, log in again' });
    } else {
      console.log('Token ok: ' + decoded.username + ', Assigning new token');
      let token = jwt.sign({ username: decoded.username, type: decoded.type }, privateKey, {
        expiresIn: tokenDuration,
      });
      return token;
    }
  });
}

// Get file. The id should match a file in the folder files
// TODO make sure the user is authorised to get the requested file. e.g. the user-id is present in the same row as the filename in db
router.get('/file/:id', function(req, res) {
  console.log('Got a file request');
  console.log(path.join(__dirname, '../../files/' + req.params.id));
  res.sendFile(path.join(__dirname, '../../files/' + req.params.id));
});

// Example 1 - GET /public
router.get('/', (req: express$Request, res: express$Response) => {
  console.log('Triggered at /public');
  res.sendStatus(200);
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

// login for user, returns a jwt token
router.post('/login', (req: express$Request, res: express$Response) => {
  // Gets the users hash and salt from the DB
  dao.getUserLoginInfo(req.body.username, (status, data) => {
    if (status == '200') {
      if (data[0] != null) {
        // Callback function that hashes inputed password and compares to hash in DB
        let salt = data[0].salt;
        let hash = bcrypt.hashSync(req.body.password, salt);
        if (hash == data[0].hash) {
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
          res.json({ jwt: token });
        } else {
          console.log('Username and password NOT ok');
          res.status(401);
          res.json({ error: 'Not authorized, check username and password' });
        }
      } else {
        console.log('organiser');
        dao.getOrganiserLoginInfo(req.body.username, (status, data) => {
          if (status == '200') {
            console.log('data ' + data);
            if (data[0] != null) {
              // Callback function that hashes inputed password and compares to hash in DB
              let salt = data[0].salt;
              let hash = bcrypt.hashSync(req.body.password, salt);
              if (hash == data[0].hash) {
                // Returns a token for autherization if credentials match
                console.log('Username and password ok');
                let token = jwt.sign(
                  { username: req.body.username, type: 'organiser', id: data[0].organiser_id },
                  privateKey,
                  {
                    expiresIn: tokenDuration,
                  },
                );
                res.json({ jwt: token });
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
    }
  });
});

// Register new user/organiser
router.post('/register', (req: express$Request, res: express$Response) => {
  let password: string = req.body.password;
  // Genereates salt and hash
  req.body.salt = bcrypt.genSaltSync(10);
  req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);

  //test
  console.log(req.body);
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
    res.status(status);
    res.send(data);
  });
});

module.exports = router;
