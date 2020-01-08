var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var app = express();
app.use(bodyParser.json()); // for å tolke JSON i body

// TODO: bruk ekte sertifikat, lest fra config...
let privateKey = (publicKey = "shhhhhverysecret");

// Checks if the password is correct
// TODO: hash passord
function loginUser(username, password) {
  // Hashes inputed password and compares to hash in DB

  var hash = bcrypt.hashSync(password, json.salt);
  if (hash == json.hash) {
    return true;
  } else {
    return false;
  }
}

function loginOrganiser(username, password) {
  return password == "secret";
}

// login for user, returns a jwt token
app.post("/public/login/user", (req, res) => {
  if (loginUser(req.body.username, req.body.password)) {
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
});

// login for organiser, returns a jwt token
app.post("/public/login/organiser", (req, res) => {
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
});

// Middleware for user activities
app.use("/user", (req, res, next) => {
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
});

// Middleware for organiser activities
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
