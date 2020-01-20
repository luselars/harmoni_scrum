//@flow
import express from 'express';
const path = require('path');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();

const userDao = require('../../dao/adminDao.js');
let dao = new userDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');
let router = express.Router();

//TODO authorization.
// only admin should be able to use this
// add routes /organisers, and /verify/:organiser_id



// verify organiser
router.put('/verify/:organiser_id', (req: express$Request, res: express$Response) => {
    dao.verifyOrganiser(req.params.organiser_id, (status, data) => {
        res.status(status);
        res.send(data);
    });
});

// get all the organisers
router.put('/organisers', (req: express$Request, res: express$Response) => {
    dao.getOrganisers((status, data) => {
        res.status(status);
        res.send(data);
    });
});