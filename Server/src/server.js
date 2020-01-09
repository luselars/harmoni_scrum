// @flow
/*
Main application.
The server listens to port 4000.
 */

// Imports
import express from "express";
let jwt = require("jsonwebtoken");
let privateKey = "shhhhhverysecret";
let publicKey = privateKey;
// Constants
const PORT = 4000;

// Routes
let publicRoutes = require("./routes/publicRoutes");
let organiserRoutes = require("./routes/organiserRoutes");
let userRoutes = require("./routes/userRoutes");

let app = express();
//Dependencies
app.use(express.json()); // For parsing application/json

// Middleware for user activities
/*app.use("/user", (req, res, next) => {
  var token = req.headers["x-access-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token NOT ok");
      res.status(401);
      res.json({ error: "Not authorized, log in again" });
    } else {
      if (decoded.type === "user") {
        console.log("Token ok: " + decoded.username);
        next();
      } else {
        console.log("Token NOT ok");
        res.status(401);
        res.json({
          error: "Not authorized, you do not have access to this action"
        });
      }
    }
  });
}); */ 

// Middleware for organiser activities
/*
app.use("/organiser", (req, res, next) => {
  var token = req.headers["x-access-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token NOT ok");
      res.status(401);
      res.json({ error: "Not authorized, log in again" });
    } else {
      if (decoded.type === "organiser") {
        console.log("Token ok: " + decoded.username);
        next();
      } else {
        console.log("Token NOT ok");
        res.status(401);
        res.json({
          error: "Not authorized, you do not have access to this action"
        });
      }
    }
  });
});
*/
// Initiate routes
app.use("/public/", publicRoutes);
app.use("/organiser/", organiserRoutes);
app.use("/user/", userRoutes);

let server = app.listen(PORT);
console.log("Server started on port: " + PORT);
