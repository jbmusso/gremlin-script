'use strict';
var inherits = require('util').inherits;

var GraphElement = require("./element");


function Edge() {
  GraphElement.apply(this, arguments);
  this.properties._type = "edge";
}

inherits(Edge, GraphElement);

Edge.toGroovy = function() {
  return 'Edge.class';
};

Object.defineProperty(Edge, 'class', {
  get: function() {
    return this.toGroovy();
  }
});

module.exports = Edge;