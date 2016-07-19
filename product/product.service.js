'use strict';

const request = require('request');

class ProductService {

  constructor (apiConfig) {
    Object.defineProperty(this, '_apiConfig', {
      value: apiConfig
    });
  }

  getAllProducts (callback) {
    request({
      method: 'GET',
      uri: this._apiConfig.endpoint
    }, this._handleResponse(callback));
  }

  create (product, callback) {
    request({
      method: 'POST',
      uri: this._apiConfig.endpoint,
      json: true,
      body: {product: product}
    }, this._handleResponse(callback));
  }

  update (code, product, callback) {
    request({
      method: 'PUT',
      uri: this._apiConfig.endpoint + '/' + code,
      json: true,
      body: {product: product}
    }, this._handleResponse(callback));
  }

  _handleResponse(callback) {
    return (error, response) => {
      if (error) {
        return callback(error, null);
      }
      let body = typeof response.body === "object"? response.body : JSON.parse(response.body);
      if (body.errors) {
        return callback(body.errors.details[0], null);
      }
      return callback(null, body.data);
    };
  }
}

module.exports = ProductService;