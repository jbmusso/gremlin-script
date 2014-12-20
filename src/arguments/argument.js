'use strict';
var _ = require('lodash');


function Argument(value) {
  this.value = value;
}

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

Argument.prototype.stringify = function() {
  var string = stringify('', this.value, null, null);
  return string;
};

Argument.prototype.toGroovy = function() {
  return this.parse();
};

Argument.prototype.parse = function() {
  var argument = this.value;

  if (argument === null) {
    return 'null';
  }

  if (this.isClassReference()) {
    return argument.toString();
  }

  if (this.isFloat()) {
    return this.value;
  }

  // Handle ids that are not numbers but pass parseFloat test
  // (ie. Titan edge ids)
  if (_.isString(argument) && this.isFloat()) {
    return "'" + argument + "'";
  }

  if (_.isArray(argument)) {
    var parsedArray = _.map(argument, function(element) {
      if (_.isString(element)) {
        return "'" + element + "'";
      }

      return element;
    });

    return parsedArray.toString();
  }

  if (_.isBoolean(argument)) {
    return argument.toString();
  }

  return "'"+ argument +"'";
};

Argument.prototype.isFloat = function() {
  return !_.isNaN(parseFloat(this.value)) && this.value.slice(-1) === 'f';
  // return this.value.slice(-1) === 'f';
};

Argument.prototype.isClassReference = function() {
  var graphRegex = /^T\.(gt|gte|eq|neq|lte|lt|decr|incr|notin|in)$|^Contains\.(IN|NOT_IN)$|^g\.|^Vertex(\.class)$|^Edge(\.class)$|^String(\.class)$|^Integer(\.class)$|^Geoshape(\.class)$|^Direction\.(OUT|IN|BOTH)$|^TitanKey(\.class)$|^TitanLabel(\.class)$/;

  return _.isString(this.value) && graphRegex.test(this.value);
};

module.exports = Argument;