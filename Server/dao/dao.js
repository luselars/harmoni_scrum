//@flow
import mysql from 'mysql';

/** Class representing the DAO. */
module.exports = class Dao {
  pool: any;
  /**
   * Create a new DAO
   */
  constructor(host: string, user: string, password: string, database: string) {
    this.pool = mysql.createPool({
      host: host,
      user: user, // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
      password: password, // Replace "password" with your mysql-ait.stud.idi.ntnu.no password
      database: database, // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
      multipleStatements: true,
    });
  }

  /**
   * Returns the pool
   */
  getPool() {
    return this.pool;
  }
  /**
   * Sends in an sql query by string with an array of params.
   */
  query(sql: string, params: any, callback: (status: string, data: Object) => mixed) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.log('Dao: error connecting');
        callback('500', { error: 'Feil ved oppkobling' });
      } else {
        //console.log('Dao: running sql: ' + sql + ' With params: ' + params);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            callback('500', { error: 'Feil ved querying' });
          } else {
            //console.log('Dao: returning rows');
            callback('200', rows);
          }
        });
      }
    });
  }
};
