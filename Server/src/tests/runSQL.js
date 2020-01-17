var mysql = require('mysql');
var fs = require('fs');

module.exports = function run(filename, pool, done) {
  console.log('runsqlfile: reading file ' + filename);
  let sql = fs.readFileSync(filename, 'utf8');
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('runSQL: error connecting');
      done();
    } else {
      console.log('runSQL: connected');
      connection.query(sql, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          done();
        } else {
          console.log('runSQL: run ok');
          done();
        }
      });
    }
  });
};
