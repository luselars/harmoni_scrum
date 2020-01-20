//@flow
import express from 'express';
const path = require('path');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();

const userDao = require('../../dao/userDao.js');
let dao = new userDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');
let router = express.Router();

//TODO authorization.
// only admin should be able to use this
// add routes /organisers, and /verify/:organiser_id
