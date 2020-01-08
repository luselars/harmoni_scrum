// @flow
import express from 'express';
import mysql from 'mysql';

const PublicDao = require("../../dao/publicDao.js");

let dao = new PublicDao();
let router = express.Router();

// Example 1 - GET /public
router.get("/", (req, res) => {
    console.log("Triggered at /public");
    res.sendStatus(200);
});

// Get all events that are public
router.get('/event', (req: express$Request, res: express$Response) => {
    dao.getPublicEvents((status, data) => {
        res.status(status);
        res.send(data);
    });
});
module.exports = router;