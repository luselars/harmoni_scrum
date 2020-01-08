// @flow
/*
Main application.
The server listens to port 4000.
 */

// Imports
import express from 'express';
import fs from 'fs';

// Constants
const PORT = 4000;


// Routes
let publicRoutes = require('./routes/publicRoutes');
let organiserRoutes = require('./routes/organiserRoutes');
let userRoutes = require('./routes/userRoutes');


let app = express();

//Dependencies
app.use(express.json()); // For parsing application/json


// Initiate routes
app.use('/public/', publicRoutes);
app.use('/public/', organiserRoutes);
app.use('/user/', userRoutes);



let server = app.listen(PORT);
console.log("Server started on port: " + PORT);