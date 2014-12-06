'use strict';
var inherits = require('util').inherits;

var GremlinFunction = require('./function');


function GremlinMethod() {
  GremlinFunction.apply(this, arguments);
}

inherits(GremlinMethod, GremlinFunction);

GremlinMethod.prototype.toGroovy = function(gremlinScript) {
  return '.' + GremlinFunction.prototype.toGroovy.call(this, gremlinScript);
};

module.exports = GremlinMethod;