'use strict';
var inherits = require('util').inherits;
var Argument = require('./argument');


function ClosureArgument() {
  Argument.apply(this, arguments);
}

inherits(ClosureArgument, Argument);

ClosureArgument.prototype.toGroovy = function() {
  return this.value;
};

module.exports = ClosureArgument;