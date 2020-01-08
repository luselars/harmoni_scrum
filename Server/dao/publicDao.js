import "./modelDao";
const Dao = require("./dao.js");

module.exports = class PublicDao extends Dao
{
    getPublicEvents(callback) {
        super.query("Select * from event WHERE is_public IS TRUE",
            [],
            callback);
    }
}
