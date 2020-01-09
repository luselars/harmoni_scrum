// @flow
import express from "express";
import mysql from "mysql";
let bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let app = express();
const publicDao = require("../../dao/publicDao.js");
let dao = new publicDao();
app.use(bodyParser.json()); // for å tolke JSON i body
let router = express.Router();
// TODO: bruk ekte sertifikat, lest fra config...
let privateKey = "shhhhhverysecret";
let publicKey = privateKey;

// Checks if the token is verified, if so it returns a new token that lasts longer
function updateToken(token) {
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

router.get("/event", (req: express$Request, res: express$Response) => {
  dao.getPublicEvents((status, data) => {
    res.status(status);
    res.send(data);
  });
});

router.get("/event/:id", (req: express$Request, res: express$Response) => {
  dao.getPublicEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// login for user, returns a jwt token
router.post("/login", (req: express$Request, res: express$Response) => {
  // Gets the users hash and salt from the DB
  dao.getUserHashAndSalt(req.body.username, (status, data) => {
    if (status == "200" && data.length != 0) {
      console.log(data);
      // Callback function that hashes inputed password and compares to hash in DB
      let salt = data[0].salt;
      let hash = bcrypt.hashSync(req.body.password, salt);
      if (hash == data[0].hash) {
        // Returns a token for autherization if credentials match
        console.log("Username and password ok");
        let token = jwt.sign(
          { username: req.body.username, type: "user" },
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
    } else {
      dao.getOrganiserHashAndSalt(req.body.username, (status, data) => {
        if (status == "200" && data.length != 0) {
          // Callback function that hashes inputed password and compares to hash in DB
          let salt = data[0].salt;
          let hash = bcrypt.hashSync(req.body.password, salt);
          if (hash == data[0].hash) {
            // Returns a token for autherization if credentials match
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
        } else {
          res.status(404);
          res.json({ error: "Username not found" });
        }
      });
    }
  });
});

// login for organiser, returns a jwt token
router.post(
  "/login/organiser",
  (req: express$Request, res: express$Response) => {
    // Gets the users hash and salt from the DB
    dao.getOrganiserHashAndSalt(req.body.username, (status, data) => {
      // Callback function that hashes inputed password and compares to hash in DB
      let salt = data[0].salt;
      let hash = bcrypt.hashSync(req.body.password, salt);
      if (hash == data[0].hash) {
        // Returns a token for autherization if credentials match
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
    });
  }
);

// Register new user
router.post("/register/user", (req: express$Request, res: express$Response) => {
  // Genereates salt and hash
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  var email = req.body.email;
  var name = req.body.email;
  var tlf = req.body.tlf;
  var description = req.body.description;
});

module.exports = router;
