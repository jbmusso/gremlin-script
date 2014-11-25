'use strict';
var inherits = require('util').inherits;

var GremlinMethod = require('../function');


function SetPropertyMethod() {
  GremlinMethod.call(this, 'setProperty', arguments[0]);
}

inherits(SetPropertyMethod, GremlinMethod);

SetPropertyMethod.prototype.run = function(element) {
  var key = this.arguments.key;
  var value = this.arguments.value;

  element.properties[key] = value;

  return element;
};

SetPropertyMethod.prototype.toGroovy = function() {
  var key = this.arguments.key;
  var value = this.arguments.value;

  return ".setProperty('" + key + "','" + value + "')";
};

module.exports = SetPropertyMethod;