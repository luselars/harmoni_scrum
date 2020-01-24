//@flow
import { Organiser } from './modelDao';

const Dao = require('./dao.js');

/** Class representing the Admin DAO. */
module.exports = class AdminDao extends Dao {
  /**
   * Create a new Admin DAO
   */
  constructor(host: string, user: string, password: string, database: string) {
    super(host, user, password, database);
  }
  /**
   * Get the pool from the dao.
   */
  getPool() {
    return super.getPool();
  }

  /**
   * Verify an organiser
   */
  verifyOrganiser(organiser_id: number, callback: (status: string, data: Object) => mixed) {
    super.query(
      'UPDATE organiser SET verified = NOT verified WHERE organiser_id = ?',
      [organiser_id],
      callback,
    );
  }

  /**
   * Get all the organisers.
   */
  getOrganisers(callback: (status: string, data: Organiser) => mixed) {
    super.query('SELECT * FROM organiser', [], callback);
  }

  /**
   * Get all the unverified organisers.
   */
  getUnverified(callback: (status: string, data: Organiser) => mixed) {
    super.query('SELECT * FROM organiser WHERE NOT verified', [], callback);
  }

  /**Deletes a user from the database with the give id */
  deleteUser(user_id: number, callback: (status: string, data: Organiser) => mixed) {
    super.query('DELETE FROM user WHERE user_id = ?', [user_id], callback);
  }

  /**Deletes a organiser from the database with the give id */
  deleteOrganiser(organiser_id: number, callback: (status: string, data: Organiser) => mixed) {
    super.query('DELETE FROM organiser WHERE user_id = ?', [organiser_id], callback);
  }
};
