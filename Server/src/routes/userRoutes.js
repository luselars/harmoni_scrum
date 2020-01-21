// @flow
import express from 'express';
import mysql from 'mysql';
import uploadFunctions from '../uploadHelper';
const path = require('path');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();
let bcrypt = require('bcryptjs');

const userDao = require('../../dao/userDao.js');
let dao = new userDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');
const upload = require('../uploadHelper');

let router = express.Router();

// Middleware for organiser activities BRUK DENNE FOR USER OGSÅ
router.use('', (req, res, next) => {
  var token = req.headers['x-access-token'];
  td.decode(token, (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({
        error: err,
      });
    } else {
      if (decoded.type == 'user') {
        //console.log('Token ok: ' + decoded.username);
        req.email = decoded.username;
        req.uid = decoded.id;
        next();
      } else {
        console.log('Token NOT ok');
        res.status(401);
        res.json({
          error: 'Not authorized, you do not have access to this action',
        });
      }
    }
  });
});

// Edit a specific user
router.put('/myprofile', (req: express$Request, res: express$Response) => {
  if (req.body.password.length != 0) {
    req.body.salt = bcrypt.genSaltSync(10);
    req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);
    req.body.password = null;
  }
  if (req.body.image !== null && req.body.image !== undefined) {
    uploadFunctions.handleFile(req.body.image, function(imageUrl) {
      req.body.image = imageUrl;
      dao.editUser(req.uid, req.body, (status, data) => {
        res.status(status);
        res.send(data);
      });
    });
  } else {
    dao.editUser(req.uid, req.body, (status, data) => {
      res.status(status);
      res.send(data);
    });
  }
});

// Delete single user
router.delete('/:id', (req: express$Request, res: express$Response) => {
  dao.deleteUser(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Retrieve all events that the user is a part of
router.get('/:id/event', (req: express$Request, res: express$Response) => {
  dao.getUserByEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Retrieve info from a user
router.get('/myprofile', (req: express$Request, res: express$Response) => {
  dao.getUserInfo(req.uid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get all the events your user account is connected to.
router.get('/myevents', (req: express$Request, res: express$Response) => {
  dao.getMyId(req.email, (status, data) => {
    res.status(status);
    dao.getMyEvents(data, (status, data2) => {
      res.status(status);
      res.send(data2);
    });
  });
});

// Lets an organiser change his profile.
router.post('/event/:id/join', (req: express$Request, res: express$Response) => {
  dao.linkArtist(req.email, req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

router.put('/artistname', (req: express$Request, res: express$Response) => {
  dao.setArtistName(req.body.artist_name, req.uid,(status, data) => {
    res.status(status);
    res.send(data);
  });
});

module.exports = router;
