'use strict';
var inherits = require('util').inherits;
var Argument = require('./argument');


function IntegerArgument() {
  Argument.apply(this, arguments);
}

inherits(IntegerArgument, Argument);

IntegerArgument.prototype.toGroovy = function() {
  return this.value;
};

module.exports = IntegerArgument;