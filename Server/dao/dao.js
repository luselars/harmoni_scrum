//@flow
import mysql from 'mysql';

module.exports = class Dao {
  pool: any;
  constructor() {
    this.pool = mysql.createPool({
      host: 'mysql-ait.stud.idi.ntnu.no',
      user: 'larsoos', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
      password: 'S6yv7wYa', // Replae "password" with your mysql-ait.stud.idi.ntnu.no password
      database: 'larsoos', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
    });
  }

  query(sql: string, params: any, callback: (status: string, data: Object) => mixed) {
    this.pool.getConnection((err, connection) => {
      console.log('Dao: connected to database');
      if (err) {
        console.log('Dao: error connecting');
        callback('500', { error: 'Feil ved oppkobling' });
      } else {
        console.log('Dao: running sql: ' + sql + ' With params: ' + params);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            callback('500', { error: 'Feil ved querying' });
          } else {
            console.log('Dao: returning rows');
            callback('200', rows);
          }
        });
      }
    });
  }
};
