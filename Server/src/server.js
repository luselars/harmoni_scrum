// @flow
/*
Main application.
The server listens to port 4000.
 */

// Imports
import express from 'express';
let bodyParser = require('body-parser');
let td = require('./routes/tokenDecoder');
const cors = require('cors');

const PORT = 4000;

// Routes
let publicRoutes = require('./routes/publicRoutes');
let organiserRoutes = require('./routes/organiserRoutes');
let userRoutes = require('./routes/userRoutes');
let adminRoutes = require('./routes/adminRoutes');

let app = express();

// TODO snakk om maks-filstørrelse, legg inn begrensning i front-end også
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS
app.use(cors());
app.options('*', cors());
// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');
//   // Pass to next layer of middleware
//   next();
// });

// Dependencies
app.use(express.json()); // For parsing application/json

// Initiate routes
app.use('/public/', publicRoutes);
app.use('/organiser/', organiserRoutes);
app.use('/user/', userRoutes);
app.use('/admin/', adminRoutes);

let server = app.listen(PORT);
console.log('Server started on port: ' + PORT);

export default app;
