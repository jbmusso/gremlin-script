'use strict';
var inherits = require('util').inherits;

var GraphElement = require("./element");


function Vertex() {
  GraphElement.apply(this, arguments);

  this.properties._type = "vertex";
}

inherits(Vertex, GraphElement);

Vertex.toGroovy = function() {
  return 'Vertex.class';
};

Object.defineProperty(Vertex, 'class', {
  get: function() {
    return this.toGroovy();
  }
});

module.exports = Vertex;