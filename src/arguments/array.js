'use strict';
var inherits = require('util').inherits;
var Argument = require('./argument');


function ArrayArgument() {
  Argument.apply(this, arguments);
}

inherits(ArrayArgument, Argument);

ArrayArgument.prototype.toGroovy = function() {
  return "[" + this.parse() + "]";
};

module.exports = ArrayArgument;