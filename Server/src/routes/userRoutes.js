// @flow
import express from 'express';
import mysql from 'mysql';

const EventDao = require("../../dao/eventDao.js");
let pool = mysql.createPool({
    host: 'mysql-ait.stud.idi.ntnu.no',
    user: 'larsoos', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
    password: 'S6yv7wYa', // Replae "password" with your mysql-ait.stud.idi.ntnu.no password
    database: 'larsoos' // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
});


let dao = new EventDao(pool);
let router  = express.Router();

module.exports = router;