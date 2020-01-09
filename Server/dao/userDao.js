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

};