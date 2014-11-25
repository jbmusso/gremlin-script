'use strict';
var inherits = require('util').inherits;
var Argument = require('./argument');


function ClassArgument() {
  Argument.apply(this, arguments);
}

inherits(ClassArgument, Argument);

ClassArgument.prototype.toGroovy = function() {
  return this.value.toGroovy();
};

module.exports = ClassArgument;