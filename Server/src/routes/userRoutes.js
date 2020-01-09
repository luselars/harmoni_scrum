// @flow
import express from 'express';
import mysql from 'mysql';

const userDao = require("../../dao/userDao.js");

let dao = new userDao();
let router = express.Router();

module.exports = router;

// Edit a specific user
router.put('', (req: { body: JSON }, res: express$Response) => {
    dao.editUser(req.body,(status, data) => {
        res.status(status);
        res.send(data);
    });
});