'use strict';
var inherits = require('util').inherits;

var _ = require('lodash');

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

AddVertexMethod.prototype.groovifyArguments = function() {
  var args = [];
  var id = this.vertex._id ? this.vertex._id +',' : '';

  if (this.arguments && this.arguments._id) {
    args.push(this.arguments._id);
    delete this.arguments._id;
  }

  if (!_.isEmpty(this.arguments)) {
    args.push(this.stringifyArgument(this.arguments));
  }

  return '('+ args.join(',') + ')';
};

module.exports = AddVertexMethod;