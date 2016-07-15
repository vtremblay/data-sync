'use strict';

const oracledb = require('oracledb');

class UdacService {

  getAllUdacs (registry, callback) {
    oracledb.getConnection({
        user: "schema_ypg",
        password: "schema_ypg",
        connectString: "mtlacqora01.itops.ad.ypg.com/APPUAT.YPG.com"
      },
      (err, connection) => {
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(
          "SELECT code, description, type FROM UDAC WHERE CONTEXT = 3", [], { outFormat: oracledb.OBJECT }, (err, result) => {
            callback(err, result.rows);
          });
      });
  }
}

module.exports = UdacService;