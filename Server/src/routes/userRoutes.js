// @flow
import express from 'express';
const EventDao = require("./dao/eventDao.js");

let dao = new EventDao(pool);
let router  = express.Router();

module.exports = router;