'use strict';
var inherits = require('util').inherits;

var _ = require('lodash');

var ObjectWrapper = require('../objects/objectwrapper');
var BoundParameter = require('../boundparameter');
var Argument = require('../arguments/argument');
var ClosureArgument = require('../arguments/closure');
var ObjectArgument = require('../arguments/object');
var ArrayArgument = require('../arguments/array');
var ClassArgument = require('../arguments/class');
var NumberArgument = require('../arguments/number');


function GremlinFunction(name, args) {
  ObjectWrapper.call(this);

  this.name = name;
  this.arguments = args;
  this.closures = [];
  this.parenthesizedArguments = [];
  this.boundParameters = {};
  this.buildArguments();
}

inherits(GremlinFunction, ObjectWrapper);

GremlinFunction.prototype.getBoundParameters = function() {
  return this.boundParameters;
};

GremlinFunction.prototype.toGroovy = function(gremlinScript) {
  return this.name + this.generateArgumentString(gremlinScript);
};

GremlinFunction.prototype.generateArgumentString = function(gremlinScript) {
  var groovy = '(' + _.map(this.parenthesizedArguments, function(argument) {
    return this.processArgument(argument, gremlinScript);
  }, this).join(',') + ')';

  groovy += _.map(this.closures, function(closure) {
    return closure.toGroovy();
  }).join(',');

  return groovy;
};

GremlinFunction.prototype.processArgument = function(argument, gremlinScript) {
  if (_.isUndefined(argument) || _.isEmpty(argument)) {
    return;
  }

  if (argument instanceof BoundParameter) {
    var bp = gremlinScript.addBoundParam(argument.value);
    return bp.identifier;
  }

  if (argument instanceof ObjectWrapper) {
    return argument.toGroovy();
  }

  if (argument instanceof Argument === false) {
    argument = new ObjectArgument(argument);
  }

  return argument.toGroovy();
};

GremlinFunction.prototype.buildArguments = function() {
  var built;
  _.each(this.arguments, function(argument) {
    if (argument instanceof BoundParameter) {
      this.parenthesizedArguments.push(argument);
    } else if (argument instanceof ObjectWrapper) {
      this.parenthesizedArguments.push(argument);
    } else if (this.isClosure(argument)) {
      built = new ClosureArgument(argument);
      this.closures.push(built);
    } else if (_.isArray(argument)) {
      built = new ArrayArgument(argument);
      this.parenthesizedArguments.push(built);
    } else if (this.isClass(argument)) {
      built = new ClassArgument(argument);
      this.parenthesizedArguments.push(built);
    } else if (_.isObject(argument) && !(argument instanceof BoundParameter)) {
      built = new ObjectArgument(argument);
      this.parenthesizedArguments.push(built);
    } else if (_.isNumber(argument)) {
      built = new NumberArgument(argument);
      this.parenthesizedArguments.push(built);
    } else {
      built = new Argument(argument);
      this.parenthesizedArguments.push(built);
    }
  }, this);
};

GremlinFunction.prototype.isClosure = function(val) {
  var closureRegex = /^\{.*\}$/;

  return _.isString(val) && closureRegex.test(val);
};

GremlinFunction.prototype.isClass = function(argument) {
  return argument && !!argument.class;
};

var stringify = function(accumulated, value, key, obj) {
  var newVal;
  var newKey = JSON.stringify(key);
  var newEntry;

  if (accumulated) {
    accumulated += ',';
  }

  if (typeof value === 'undefined') {
    value = null;
  }

  if (_.isObject(value)) {
    newVal = '[' +  _.reduce(value, stringify, '') + ']' ;
  } else {
    newVal = JSON.stringify(value);
  }

  if (_.isObject(obj) && !_.isArray(obj)) {
    newEntry = newKey + ':' + newVal;
  } else {
    newEntry = newVal;
  }

  return accumulated += newEntry;
};

GremlinFunction.prototype.stringifyArgument = function(argument) {
  var string = stringify('', argument, null, null);
  return string;
};

module.exports = GremlinFunction;