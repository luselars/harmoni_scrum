//@flow
import "./modelDao";
const Dao = require("./dao.js");


module.exports = class OrganiserDao extends Dao {

    getEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        var queryString = "SELECT * FROM event WHERE event_id=?";
        super.query(queryString, [event_id], callback);
    }

    editEvent(
        event: json,
        callback: (status: string, data: json) => mixed
    ) {
        super.query(
            "UPDATE event SET name=?,image=?,start=?,status=?,is_public=?,location_id=?, venue=?, end=? WHERE event_id=?",
            [
                event.name,
                event.image,
                event.start,
                event.status,
                event.is_public,
                event.location_id,
                event.venue,
                event.end,
                event.event_id
            ],
            callback
        );
    }

    deleteEvent(
        event_id: number,
        callback: (status: string, data: Object) => mixed
    ) {
        super.query(
            "DELETE FROM event WHERE event_id=?",
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



      postEventOrganiser(
          event_id: number,
          callback: (status: string, data: number) => mixed
      ) {
          let email: string = "org@email.com";
          super.query(
              "INSERT INTO event_organisers VALUES (?,?)",
              [
                  event_id,
                  email
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
