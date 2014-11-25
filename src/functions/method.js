'use strict';
var inherits = require('util').inherits;

var GremlinFunction = require('./function');


function GremlinMethod() {
  GremlinFunction.apply(this, arguments);
}

inherits(GremlinMethod, GremlinFunction);

GremlinMethod.prototype.toGroovy = function() {
  return '.' + this.name + this.groovifyArguments();
};

module.exports = GremlinMethod;