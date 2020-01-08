import "./modelDao";
//@flow
const Dao = require("./dao.js");

module.exports = class UserDao extends Dao {
  getUserHashAndSalt(
    email: string,
    password: string,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "Select hash, salt from user WHERE email = ?",
      [email],
      callback
    );
  }
};
