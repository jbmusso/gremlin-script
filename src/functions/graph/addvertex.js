'use strict';
var inherits = require('util').inherits;

var _ = require('lodash');

var Argument = require('../../arguments/object');
var GremlinMethod = require('../method');


function AddVertexMethod(vertex, properties) {
  this.vertex = vertex;
  GremlinMethod.call(this, 'addVertex', properties);
}

inherits(AddVertexMethod, GremlinMethod);

AddVertexMethod.prototype.run = function() {
  _.each(this.arguments, function(value, key) {
    this.vertex.properties[key] = value;
  }, this);

  return this.vertex;
};

AddVertexMethod.prototype.generateArgumentString = function(gremlinScript) {
  var args = [];

  if (this.arguments && this.arguments._id) {
    args.push(new Argument(this.arguments._id));
    delete this.arguments._id;
  }

  args.push(this.arguments);

  this.parenthesizedArguments = args;

  return GremlinMethod.prototype.generateArgumentString.call(this, gremlinScript);
};

module.exports = AddVertexMethod;