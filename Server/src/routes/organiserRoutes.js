// @flow
import express from 'express';
import mysql from 'mysql';
import {sendInvite} from "../mailClient";

const organiserDao = require("../../dao/organiserDao.js");
let dao = new organiserDao();

let router = express.Router();

// Find a specific event by id (with your organiser email)
router.get("/event/:id", (req: express$Request, res: express$Response) => {
    dao.getEvent(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    })
});

// Create new event (and connect it to the organiser)
router.post('/event', (req: { body: Object }, res: express$Response) => {
    dao.postEvent(req.body, (status, data) => {
        res.status(status);
        dao.postEventOrganiser(data.insertId, (status, data) => {
            res.status(status);
            res.send(data);
        })
    })
});

// Edit a specific event
router.put('/event', (req: { body: Object }, res: express$Response) => {
    dao.editEvent(req.body, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

// Delete single event
router.delete('/event/:id', (req: express$Request, res: express$Response) => {
    dao.deleteEventOrganisers(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEventVolunteers(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEventArtists(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEventFiles(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEventTickets(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEventRiders(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEventSchedule(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
    dao.deleteEvent(req.params.id, (status, data) => {
            res.status(status);
            res.send(data);
        }
    );
});

// Get artist
router.get('/artist', (req: { body: string }, res: express$Response) => {
    dao.getArtist(req.body, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

// Add artist to owned event
router.post('/artist/:id', (req: { body: Object }, res: express$Response) => {
    dao.editEvent(req.body, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

// Get a group of volunteers from an organiser.
router.get('/group/:id', (req: express$Request, res: express$Response) => {
    dao.getGroup(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

// Get ticket-types for a single event
router.get('/event/:id/tickets', (req: express$Request, res: express$Response) => {
    dao.getEventTickets(req.params.id, (status, data) => {
            res.status(status);
            res.send(data);
        }
    );
});

// Send an invite email (CHANGE TO POST WITH COMMENTING POSSIBILITY)
router.get("/sendmail", (req, res) => {
    console.log("Sender mail");
    sendInvite("jonas4a@gmail.com", "event!!!", function (resp) {
        console.log(resp);
        if (resp)
            res.sendStatus(200);
        else
            res.sendStatus(400);
    })
});

//Get all volunteers who are part of an event
router.get("/event/:id/volunteer", (req: express$Request, res: express$Response) => {
    dao.getVolunteersByEvent(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    })
});


module.exports = router;