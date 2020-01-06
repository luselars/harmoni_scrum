// @flow
var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
var app = express();
var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 6,
  host: "mysql.stud.iie.ntnu.no",
  user: "emirde",
  password: "5AeX3tYs",
  database: "emirde",
  debug: false
});
const ArticleDao = require("./dao/ArticleDao.js");
/*
    For local testing:
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",

    For Production:
    host: "mysql.stud.iie.ntnu.no",
    user: emirde",
    password: 5AeX3tYs",
    database: emirde",
*/

//app.use(bodyParser.urlencoded()); // for å tolke JSON
app.use(bodyParser.json());

var articleDao = new ArticleDao(pool);

app.use(express.static(path.join(__dirname, "/../Klient/build")));

app.get("/Artikler/kategori/:kategoriId", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("Fikk hent artikler request fra klient");

  articleDao.getArticles(req.params.kategoriId, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.get("/Artikler/:artikkelId", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("Fikk request fra klient");

  articleDao.getArticle(req.params.artikkelId, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.post("/Artikler", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  console.log("Overskrift: " + req.body.overskrift);

  articleDao.postArticle(req.body, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.put("/Artikler/:artikkelId", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  console.log("Overskrift: " + req.body.overskrift);
  articleDao.editArticle(req.body, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.put("/Artikler/Like/:artikkelId", (req, res) => {
  console.log("Fikk like-request fra klienten");
  articleDao.likeArticle(req.params.artikkelId, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.delete("/Artikler/:artikkelId", (req, res) => {
  console.log("Fikk slett artikkel fra klienten");
  articleDao.deleteArticle(req.params.artikkelId, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.get("/Kommentarer", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("Fikk get kommetar request fra klient");
  articleDao.getComments((status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.post("/Kommentarer", (req, res) => {
  console.log("Fikk POST-request fra klienten");

  articleDao.sendComment(req.body, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

app.put("/Kommentarer/:kommentarId", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  articleDao.likeComment(req.params.kommentarId, (status, data) => {
    if (status === "500") {
      res.json({ error: "error querying" });
    } else {
      res.json(data);
    }
  });
});

let port = 8080;
console.log("listening on port: " + port);
var server = app.listen(port);
