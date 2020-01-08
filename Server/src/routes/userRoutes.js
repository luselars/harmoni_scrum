// @flow
import express from 'express';
import mysql from 'mysql';

const EventDao = require("../../dao/eventDao.js");

let dao = new EventDao();
let router  = express.Router();

module.exports = router;