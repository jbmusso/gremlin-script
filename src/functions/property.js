'use strict';
var inherits = require('util').inherits;

var GremlinFunction = require('./function');


function GremlinProperty() {
  GremlinFunction.apply(this, arguments);
}

inherits(GremlinProperty, GremlinFunction);

GremlinProperty.prototype.toGroovy = function(gremlinScript) {
  return '.' + this.name;
};

module.exports = GremlinProperty;