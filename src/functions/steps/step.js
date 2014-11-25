'use strict';
var inherits = require('util').inherits;

var GremlinMethod = require('../method');


function GremlinStep(name, args) {
  GremlinMethod.apply(this, arguments);
}

inherits(GremlinStep, GremlinMethod);

module.exports = GremlinStep;