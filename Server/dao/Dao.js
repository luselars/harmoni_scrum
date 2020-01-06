//@flow
module.exports = class Dao {
  pool: any;
  constructor(pool: any) {
    this.pool = pool;
  }

  query(
    sql: string,
    params: any,
    callback: (status: string, data: Object) => mixed
  ) {
    this.pool.getConnection((err, connection) => {
      console.log("Dao: connected to database");
      if (err) {
        console.log("Dao: error connecting");
        callback("500", { error: "Feil ved oppkobling" });
      } else {
        console.log("Dao: running sql: " + sql);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            callback("500", { error: "Feil ved querying" });
          } else {
            console.log("Dao: returning rows");
            callback("200", rows);
          }
        });
      }
    });
  }
};
