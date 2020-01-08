//@flow
const Dao = require("./dao.js");

module.exports = class OrganiserDao extends Dao {
  getOrganiserHashAndSalt(
    email: string,
    password: string,
    callback: (status: string, data: Object) => mixed
  ) {
    super.query(
      "Select hash, salt from organiser WHERE email = ?",
      [email],
      callback
    );
  }
};
