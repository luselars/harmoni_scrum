import "./modelDao";
const Dao = require("./dao.js");

module.exports = class PublicDao extends Dao
{
    getPublicEvents(callback) {
        super.query("SELECT e.*, l.address, l.name as location_name, l.postcode FROM event e LEFT JOIN location l ON l.location_id = e.location_id WHERE e.is_public IS TRUE",
            [],
            callback);
    }
};
