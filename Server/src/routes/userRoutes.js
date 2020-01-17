// @flow
import express from 'express';
const path = require('path');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();

const userDao = require('../../dao/userDao.js');
let dao = new userDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');
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
        console.log('Token ok: ' + decoded.username);
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
router.put('', (req: { body: JSON }, res: express$Response) => {
  dao.editUser(req.body, (status, data) => {
    res.status(status);
    res.send(data);
  });
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

module.exports = router;
