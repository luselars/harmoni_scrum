//@flow
import { Organiser } from './modelDao';

const Dao = require('./dao.js');

module.exports = class AdminDao extends Dao {
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }
  getPool() {
    return super.getPool();
  }

  // Verify an organiser by id.
  verifyOrganiser(organiser_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'UPDATE organiser SET verified = NOT verified WHERE organiser_id = ?',
      [organiser_id],
      callback,
    );
  }

  // Get all organisers.
  getOrganisers(callback: (status: string, data: Organiser) => mixed) {
    super.query('SELECT * FROM organiser', [], callback);
  }

  // Get all unverified organisers.
  getUnverified(callback: (status: string, data: Organiser) => mixed) {
    super.query('SELECT * FROM organiser WHERE NOT verified', [], callback);
  }
};
