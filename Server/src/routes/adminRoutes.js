//@flow
import express from 'express';
import express$Request from 'express';
import express$Response from 'express';
import { productionDatabase } from '../config/dbCredentials';

let bcrypt = require('bcryptjs');
const path = require('path');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();
const adminDao = require('../../dao/adminDao.js');
let dao = new adminDao(
  productionDatabase.url,
  productionDatabase.user,
  productionDatabase.password,
  productionDatabase.database,
);
let router = express.Router();

router.changeDao = function changeDao(adminDao: adminDao) {
  dao = adminDao;
};

/**
 * Middleware for admin activities
 */
router.use('', (req, res, next) => {
  var token = req.headers['x-access-token'];
  td.decode(token, (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({
        error: err,
      });
    } else {
      if (decoded.type === 'admin') {
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

/**
 * Get all organisers
 */
router.get('/organisers', (req: express$Request, res: express$Response) => {
  dao.getOrganisers((status, data) => {
    res.status(status);
    res.send(data);
  });
});

/**
 * Get all unverified organisers
 */
router.get('/unverified', (req: express$Request, res: express$Response) => {
  dao.getUnverified((status, data) => {
    res.status(status);
    res.send(data);
  });
});

/**
 * Change verification status of organiser by id.
 */
router.put('/unverified/:id', (req: express$Request, res: express$Response) => {
  dao.verifyOrganiser(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

/**Deletes a user from the database with the give id */
router.delete('/user/user_id', (req: express$Request, res: express$Response) => {
  dao.deleteUser(req.params.user_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

/**Deletes a organiser from the database with the give id */
router.delete('/organiser/organiser_id', (req: express$Request, res: express$Response) => {
  dao.deleteOrganiser(req.params.organiser_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

module.exports = router;
