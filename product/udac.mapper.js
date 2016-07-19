'use strict';

class ProductMapper {
  map(product) {
    if (Array.isArray(product)) {
      return Array.from(product, this._doMap);
    }
    return this._doMap(product);
  }

  _doMap(udac) {
    return {
      code: udac.CODE,
      description: udac.DESCRIPTION,
      lang: udac.LANG,
      type: udac.TYPE
    }
  }
}

module.exports = ProductMapper;