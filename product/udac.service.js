'use strict';

const oracledb = require('oracledb');
const UdacMapper = require('./udac.mapper.js');

class UdacService {

  constructor (dbConfig) {
    Object.defineProperty(this, '_dbConfig', {
      value: dbConfig
    });
    Object.defineProperty(this, '_mapper', {
      value: new UdacMapper()
    });
  }

  getAllUdacs (callback) {
    oracledb.getConnection(this._dbConfig,
      (err, connection) => {
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(
          "SELECT code, description, lang, type FROM UDAC WHERE CONTEXT = 3", [], { outFormat: oracledb.OBJECT }, (err, result) => {
            callback(err, this._mapper.map(result.rows));
            connection.close();
          });
      });
  }
}

module.exports = UdacService;