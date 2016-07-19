'use strict';

const UdacService = require('./udac.service.js');
const ProductService = require('./product.service.js');

class ProductSynchronizationJob {

  constructor (options) {
    Object.defineProperty(this, '_udacService', {
      value: new UdacService(options.dbConfig)
    });
    Object.defineProperty(this, '_productService', {
      value: new ProductService(options.api)
    });
  }

  execute () {
    this._productService.getAllProducts((error, products) => {
      if (error) {
        return console.error("Aborting synchronization. " + JSON.stringify(error));
      }

      this._udacService.getAllUdacs((error, udacs) => {
        if (error) {
          return console.error("Aborting synchronization. " + JSON.stringify(error));
        }

        udacs.forEach((udac) => {
          if (products.find((product) => product.code === udac.code)) {
            this._productService.update(udac.code, udac, this._handleResponse('UPDATE', udac.code));
          } else {
            this._productService.create(udac, this._handleResponse('CREATE', udac.code));
          }
        });
      });
    });
  }

  _handleResponse(action, productCode) {
    return (error, data) => {
      if (error) {
        return console.error(`An error occurred during [${action}] for product code [${productCode}]` + JSON.stringify(error));
      }
      console.log(`Action [${action}] for product code [${productCode}] done successfully`);
    }
  }
}

module.exports = ProductSynchronizationJob;