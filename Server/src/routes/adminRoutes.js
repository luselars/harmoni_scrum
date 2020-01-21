//@flow
import express from 'express';
let bcrypt = require('bcryptjs');
const path = require('path');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();

const adminDao = require('../../dao/adminDao.js');
let dao = new adminDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');
let router = express.Router();

// Middleware for admin activities
router.use('', (req, res, next) => {
  var token = req.headers['x-access-token'];
  td.decode(token, (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({
        error: err,
      });
    } else {
      if (decoded.type == 'admin') {
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

// Get all organisers
router.get('/organisers', (req: express$Request, res: express$Response) => {
  dao.getOrganisers((status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get all unverified
router.get('/unverified', (req: express$Request, res: express$Response) => {
  dao.getUnverified((status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Change verification status of this organiser
router.put('/unverified/:id', (req: express$Request, res: express$Response) => {
  dao.verifyOrganiser(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//TODO authorization.
// only admin should be able to use this

module.exports = router;
