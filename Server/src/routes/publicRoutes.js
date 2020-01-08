// @flow
import express from 'express';
import mysql from 'mysql';

const EventDao = require("../../dao/eventDao.js");

let dao = new EventDao();
let router = express.Router();

// Example 1 - GET /public
router.get("/", (req, res) => {
    console.log("Triggered at /public");
    res.sendStatus(200);
});

// Example 2 - POST /public/event
router.get('/event', (req: express$Request, res: express$Response) => {
    dao.getPublicEvents((status, data) => {
        res.status(status);
        res.send(data);
    });
});
module.exports = router;