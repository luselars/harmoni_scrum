// @flow
import express from "express";
import mysql from "mysql";
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const UserDao = require("../../dao/UserDao.js");
const OrganiserDao = require("../../dao/OrganiserDao.js");
const eventDao = require("../../dao/eventDao.js");
let router = express.Router();
var app = express();

app.use(bodyParser.json()); // for å tolke JSON i body

// TODO: bruk ekte sertifikat, lest fra config...
let privateKey = "shhhhhverysecret";
let publicKey = privateKey;

var password = "";
var type = "";

function loginCallback(status: string, data: Object) {
  var hash = bcrypt.hashSync(password, data.salt);
  if (hash == data.hash) {
    console.log("Username and password ok");
    let token = jwt.sign(
      { username: req.body.username, type: type },
      privateKey,
      {
        expiresIn: 1800
      }
    );
    res.json({ jwt: token });
  } else {
    console.log("Username and password NOT ok");
    res.status(401);
    res.json({ error: "Not authorized, check username and password" });
  }
}

function loginUser(email: string, inputPassword: string) {
  password = inputPassword;
  type = "user";
  // Hashes inputed password and compares to hash in DB
  UserDao.getUserHashAndSalt(email, loginCallback);
}

function loginOrganiser(username: string, password: string) {
  password = inputPassword;
  type = "organiser";
  // Hashes inputed password and compares to hash in DB
  OrganiserDao.getOrganiserHashAndSalt(email, loginCallback);
}

// Checks if the token is verified, if so it returns a new token that lasts longer
function updateToken() {
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token NOT ok");
      res.status(401);
      res.json({ error: "Not authorized, log in again" });
    } else {
      console.log("Token ok: " + decoded.username + ", Assigning new token");
      let token = jwt.sign(
        { username: decoded.username, type: decoded.type },
        privateKey,
        {
          expiresIn: 1800
        }
      );
      return token;
    }
  });
}

// Example 1 - GET /public
router.get("/", (req: express$Request, res: express$Response) => {
  console.log("Triggered at /public");
  res.sendStatus(200);
});

// Example 2 - POST /public/event
router.get("/event", (req: express$Request, res: express$Response) => {
  eventDao.getPublicEvents((status, data) => {
    res.status(status);
    res.send(data);
  });
});

// login for user, returns a jwt token
router.post("/login/user", (req: express$Request, res: express$Response) => {
  loginUser(req.body.username, req.body.password);
});

// login for organiser, returns a jwt token
router.post(
  "/login/organiser",
  (req: express$Request, res: express$Response) => {
    if (loginOrganiser(req.body.username, req.body.password)) {
      console.log("Username and password ok");
      let token = jwt.sign(
        { username: req.body.username, type: "organiser" },
        privateKey,
        {
          expiresIn: 1800
        }
      );
      res.json({ jwt: token });
    } else {
      console.log("Username and password NOT ok");
      res.status(401);
      res.json({ error: "Not authorized, check username and password" });
    }
  }
);

module.exports = router;
