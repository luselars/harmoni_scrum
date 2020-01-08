// @flow
import express from 'express';
import mysql from 'mysql';

const EventDao = require("../../dao/eventDao.js");

let dao = new EventDao();

let router = express.Router();
router.post('/organiser/event', (req: { body: JSON }, res: express$Response) => {
    dao.postEvent(req.body, (status, data) => {
        res.status(status);
        /* dao.postEventOrganiser(data[0],(status, data) =>
        {
          res.status(status);
          res.send(data);
        }) */
    })
});

router.put('/event/:id', (req: express$Request, res: express$Response) => {
    dao.editEvent((status, data) => {
        res.status(status);
        res.send(data);
    });
});

router.delete('/event/:id', (req: express$Request, res: express$Response) => {
    dao.deleteEvent((status, data) => {
            res.status(status);
            res.send(data);
        }
    );
});

router.get('/:id/group/:gid', (req: express$Request, res: express$Response) => {
    dao.getGroup(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

module.exports = router;