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

// Routes (all separated into relevant files)
let publicRoutes = require('./routes/publicRoutes');
let organiserRoutes = require('./routes/organiserRoutes');
let userRoutes = require('./routes/userRoutes');
let adminRoutes = require('./routes/adminRoutes');

let app = express();

// Max file size set to 50mb for uploaded files.

/**
 * Sets max upload size of files to the limit
 */
app.use(bodyParser.json({ limit: '50mb', extended: true }));
/**
 * Sets max upload size of files to the limit
 */
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/**
 * Makes the application use CORS.
 */
app.use(cors());
/**
 * CORS Options.
 */
app.options('*', cors());

/**
 * Dependencies used by the server.
 */
app.use(express.json()); // For parsing application/json

/**
 * Public routing used by the server.
 */
app.use('/public/', publicRoutes);
/**
 * Organiser routing used by the server.
 */
app.use('/organiser/', organiserRoutes);
/**
 * User routing used by the server.
 */
app.use('/user/', userRoutes);
/**
 * Admin routing used by the server.
 */
app.use('/admin/', adminRoutes);

let server = app.listen(PORT);
console.log('Server started on port: ' + PORT);

export default app;
