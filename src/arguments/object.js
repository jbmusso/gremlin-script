'use strict';
var inherits = require('util').inherits;
var Argument = require('./argument');


function ObjectArgument() {
  Argument.apply(this, arguments);
}

inherits(ObjectArgument, Argument);

ObjectArgument.prototype.toGroovy = function() {
  return this.stringify();
};

module.exports = ObjectArgument;