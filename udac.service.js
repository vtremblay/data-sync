'use strict';

const oracledb = require('oracledb');

class UdacService {

  getAllUdacs (registry, callback) {
    oracledb.getConnection({

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