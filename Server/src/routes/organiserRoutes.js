// @flow
import express from 'express';
import mysql from 'mysql';

const organiserDao = require("../../dao/organiserDao.js");
let dao = new organiserDao();

let router = express.Router();

// Create new event (and connect it to the organiser)
router.post('/event', (req: { body: JSON }, res: express$Response) => {
    dao.postEvent(req.body, (status, data) => {
        res.status(status);
        dao.postEventOrganiser(data.insertId,(status, data) =>
        {
          res.status(status);
          res.send(data);
        })
    })
});

// Edit a specific event
router.put('/event', (req: { body: JSON }, res: express$Response) => {
    dao.editEvent(req.body,(status, data) => {
        res.status(status);
        res.send(data);
    });
});

// Delete single event
router.delete('/event/:id', (req: express$Request, res: express$Response) => {
    dao.deleteEvent(req.params.id ,(status, data) => {
            res.status(status);
            res.send(data);
        }
    );
});

// Get a group of volunteers from an organiser.
router.get('/:id/group/:gid', (req: express$Request, res: express$Response) => {
    dao.getGroup(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

module.exports = router;