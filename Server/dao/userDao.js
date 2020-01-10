import "./modelDao";
//@flow
const Dao = require("./dao.js");

module.exports = class UserDao extends Dao {

  editUser(
    user: json,
    callback: (status: string, data: json) => mixed
) {
    super.query(
        "UPDATE user SET email=?,name=?,tlf=?,image=?,description=? WHERE user_id = ?",
        [
            user.email,
            user.name,
            user.tlf,
            user.image,
            user.description,
            user.user_id
        ],
        callback
    );
}
deleteUser(
  user_id: number,
  callback: (status: string, data: Object) => mixed
) {
  super.query(
      "DELETE FROM user WHERE user_id=?",
      [user_id],
      callback
  );
}


getUserByEvent(
  user_id: number,
  callback: (status: string, data: Object) => mixed
) {
  let queryString = "SELECT e.event_id FROM event e WHERE e.event_id IN(SELECT ea.event_id FROM event_artist ea WHERE ea.user_id = 1) UNION SELECT e.event_id FROM event e WHERE e.event_id IN(SELECT ev.event_id FROM event_volunteer ev WHERE ev.user_id = 1)";
  super.query(queryString, [user_id], callback);
}

};