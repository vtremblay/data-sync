'use strict';

const UdacService = require('./udac.service');
const udacService = new UdacService();

class ProductSynchronizeJob {
  execute () {
    udacService.getAllUdacs({}, (error, udacs) => {
      for (let udac of udacs) {
        console.log(udac);
      }
    });
  }
}

module.exports = ProductSynchronizeJob;