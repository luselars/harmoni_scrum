//@flow

const Dao = require("./dao.js");

class Event
{
    constructor(name: string, image: string, start: string, end: string, status: string, is_public: number, location_id: number, venue: string)
    {
        this.name = name;
        this.image = image;
        this.start = start;
        this.end = end;
        this.status = status;
        this.is_public = is_public;
        this.location_id = location_id;
        this.venue = venue;
    }

    name: string;
    image: string;
    start: string;
    end: string;
    status: string;
    is_public: boolean;
    location_id: number;
    venue: string;
}



module.exports = class ArticleDao extends Dao {
    getPublicEvents(callback) {
        super.query("Select * from event WHERE is_public IS TRUE",
            [],
            callback);
    }

    getEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
        ) {
        var queryString = "SELECT * FROM event WHERE event_id=?";
        super.query(queryString, [event_id], callback);
        }

    editEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        var queryString = "SELECT * FROM event WHERE event_id=?";
        super.query(queryString, [event_id], callback);
    }

    deleteEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "delete from event where event_id=?",
            [event_id],
            callback
        );
    }

  postEvent(
    event: json,
    callback: (status: string, data: json) => mixed
  ) {
    super.query(
      "INSERT INTO event (name, image, start, status, is_public, location_id, venue, end) VALUES (?,?,?,?,?,?,?,?)",
      [
        event.name,
        event.image,
        event.start,
        event.status,
        event.is_public,
        event.location_id,
        event.venue,
        event.end
      ],
      callback
    );
  }

    getGroup(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        var queryString = "SELECT * FROM artikkel WHERE event_id=?";
        super.query(queryString, [event_id], callback);
    }


  /*
    postEventOrganiser(
        event_id: number,
        callback: (status: string, data: number) => mixed
    ) {
        let email: string = "";

        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) {
                console.log("Token IKKE ok");
                res.status(401);
                res.json({ error: "Not authorized" });
            } else {
                email = decoded.username;
            }
        });
        super.query(
            "INSERT INTO event_organiser VALUES (?,?)",
            [
                event_id,
                email
            ],
            callback
        );
    }
    */








































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
