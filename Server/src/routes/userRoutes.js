// @flow
import express from 'express';
const path = require('path');

const userDao = require('../../dao/userDao.js');
let dao = new userDao();
let router = express.Router();

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

// Get file. The id should match a file in the folder files
// TODO make sure the user is authorised to get the requested file. e.g. the user-id is present in the same row as the filename in db
router.get('/file/:id', function(req, res) {
  console.log('Got a file request');
  res.sendFile(path.join(__dirname + '/../../files/' + req.params.id));
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
