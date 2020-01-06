//@flow

const Dao = require("./Dao.js");

module.exports = class ArticleDao extends Dao {
  getArticles(
    kategoriId: number,
    callback: (status: string, data: Object) => mixed
  ) {
    var queryString = "select * from artikkel";
    if (kategoriId != 0) {
      queryString += " where kategoriId = ?";
    }
    queryString += " order by innleggelseTid DESC limit 20";
    super.query(queryString, [kategoriId], callback);
  }
  getArticle(
    artikkelId: number,
    callback: (status: string, data: Object) => mixed
  ) {
    var queryString = "select * from artikkel where artikkelId=?";
    super.query(queryString, [artikkelId], callback);
  }
  postArticle(
    article: Object,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "insert into artikkel (overskrift,innhold,fultInnhold,bilde,bildeAlt,kategoriId,viktighet) values (?,?,?,?,?,?,?)",
      [
        article.overskrift,
        article.innhold,
        article.fultInnhold,
        article.bilde,
        article.bildeAlt,
        article.kategori,
        article.viktighet
      ],
      callback
    );
  }
  editArticle(
    article: Object,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "update artikkel set overskrift=?,innhold=?,fultInnhold=?,bilde=?,bildeAlt=?,kategoriId=?,viktighet=? where artikkelId=?",
      [
        article.overskrift,
        article.innhold,
        article.fultInnhold,
        article.bilde,
        article.bildeAlt,
        article.kategori,
        article.viktighet,
        article.artikkelId
      ],
      callback
    );
  }
  likeArticle(
    articleId: number,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "update artikkel set likes = likes + 1 where artikkelId=?",
      [articleId],
      callback
    );
  }
  deleteArticle(
    articleId: number,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "delete from artikkel where artikkelId=?",
      [articleId],
      callback
    );
  }
  getComments(callback: (status: string, data: Object) => mixed) {
    super.query("select * from kommentar", [], callback);
  }
  getComment(
    articleId: number,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "select * from kommentar join artikkel where kategoriId = ?",
      [],
      callback
    );
  }
  sendComment(
    comment: Object,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "insert into kommentar (innhold, artikkelId) values (?, ?)",
      [comment.innhold, comment.artikkelId],
      callback
    );
  }
  likeComment(
    kommentarId: number,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "update kommentar SET likes = likes + 1 where kommentarId=?",
      [kommentarId],
      callback
    );
  }
};
