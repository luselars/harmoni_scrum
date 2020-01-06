var mysql = require("mysql");
const runsqlfile = require("./runsqlfile.js");
const ArticleDao = require("../ArticleDao.js");

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: process.env.CI ? "mysql" : "localhost",
  user: "root",
  password: process.env.CI ? "secret" : "",
  database: "mydb",
  debug: false,
  multipleStatements: true
});

const articleDao = new ArticleDao(pool);

beforeAll(done => {
  runsqlfile("dao/Test/createTables.sql", pool, () => {
    runsqlfile("dao/Test/insertData.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Hent artikkler og sjekk den første artikkelen", done => {
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.length).toBe(10);
    expect(response[0].overskrift).toBe("Javascript injection rammer siden!");
    done();
  }
  articleDao.getArticles(0, callback);
});

test("Hent artikkel med id 1", done => {
  function callback(status, response) {
    expect(status).toBe("200");
    let article = response[0];
    expect(article.overskrift).toBe("Ugler i mosen");
    done();
  }
  articleDao.getArticle(1, callback);
});

test("Fjern artikkel og sjekker at affected rows er 1", done => {
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.affectedRows).toBe(1);
    done();
  }
  articleDao.deleteArticle(2, callback);
});

test("Legg til artikkel", done => {
  var article = {
    overskrift: "Test",
    innhold: "Test",
    fultInnhold: "Test",
    bilde: "www.test.com/test.jpg",
    bildeAlt: "Test bilde",
    kategori: 1,
    viktighet: 1
  };
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.insertId).toBe(11);
    done();
  }
  articleDao.postArticle(article, callback);
});

test("Endre artikkel", done => {
  var article = {
    overskrift: "Test",
    innhold: "Test",
    fultInnhold: "Test",
    bilde: "www.test.com/test.jpg",
    bildeAlt: "Test bilde",
    kategori: 1,
    viktighet: 1,
    artikkelId: 1
  };
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.affectedRows).toBe(1);
    done();
  }
  articleDao.editArticle(article, callback);
});

test("Hent kommentarer og sjekk den første kommentaren", done => {
  function callback(status, response) {
    let comments = response;
    expect(status).toBe("200");
    expect(comments.length).toBe(6);
    expect(comments[0].innhold).toBe("Wow, programmerte han denne helt selv?!");
    done();
  }
  articleDao.getComments(callback);
});

test("Lik artikkel", done => {
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.affectedRows).toBe(1);
    done();
  }
  articleDao.likeArticle(1, callback);
});

test("Lik kommentar", done => {
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.affectedRows).toBe(1);
    done();
  }
  articleDao.likeComment(1, callback);
});

test("Legg til kommetar", done => {
  var comment = {
    artikkelId: 1,
    innhold: "Test"
  };
  function callback(status, response) {
    expect(status).toBe("200");
    expect(response.insertId).toBe(7);
    done();
  }
  articleDao.sendComment(comment, callback);
});
