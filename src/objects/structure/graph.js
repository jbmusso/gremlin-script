'use strict';
var inherits = require('util').inherits;

var GremlinMethod = require('../../functions/method');
var IdxGremlinFunction = require('../../functions/graph/idx');
var AddVertexMethod = require('../../functions/graph/addvertex');
var AddEdgeMethod = require('../../functions/graph/addedge');
var TraversalWrapper = require('../process/traversal');
var ObjectWrapper = require('../objectwrapper');
var VertexWrapper = require('./vertex');
var EdgeWrapper = require('./edge');


function Graph() {
  ObjectWrapper.apply(this, arguments);
}

inherits(Graph, ObjectWrapper);

Graph.prototype.E = function() {
  var func = new GremlinMethod('E', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.V = function() {
  var func = new GremlinMethod('V', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.e = function() {
  var func = new GremlinMethod('e', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.idx = function() {
  var func = new IdxGremlinFunction(arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.v = function() {
  var func = new GremlinMethod('v', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

// Indexing
Graph.prototype.createIndex = function() {
  var func = new GremlinMethod('createIndex', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.createKeyIndex = function() {
  var func = new GremlinMethod('createKeyIndex', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.getIndices = function() {
  var func = new GremlinMethod('getIndices', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.getIndexedKeys = function() {
  var func = new GremlinMethod('getIndexedKeys', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.getIndex = function() {
  var func = new GremlinMethod('getIndex', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.dropIndex = function() {
  var func = new GremlinMethod('dropIndex', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.dropKeyIndex = function() {
  var func = new GremlinMethod('dropKeyIndex', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

// Types
Graph.prototype.makeKey = function() {
  var func = new GremlinMethod('makeKey', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.clear = function() {
  var func = new GremlinMethod('clear', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.shutdown = function() {
  var func = new GremlinMethod('shutdown', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

Graph.prototype.getFeatures = function() {
  var func = new GremlinMethod('getFeatures', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};

// Titan specifics
Graph.prototype.getTypes = function() {
  var func = new GremlinMethod('getTypes', arguments);

  var traversal = new TraversalWrapper(this.objectName);
  traversal.methods.push(func.toGroovy());

  return traversal;
};


/**
 * Build a Gremlin line used for adding a VertexWrapper in the graph.
 *
 * Note: for databases which accept custom _id properties (ie. non generated)
 * the user must pass a valid _id value in the `properties` map rather than
 * supply an optional argument parameter as first argument (TinkerPop style).
 * This slight change to the API of addVertex makes it easier to use
 * in a JavaScript environment.
 *
 * @param {Object} properties
 * @param {String} object Optional variable name used within the script
 *    context
 * @return {VertexWrapper}
 */
Graph.prototype.addVertex = function(properties, object) {
  var vertex = new VertexWrapper('g');
  var method = new AddVertexMethod(vertex, properties);

  method.run();

  vertex.methods.push(method.toGroovy());

  return vertex;
};

/**
 * @param {VertexWrapper|Number} v1
 * @param {VertexWrapper|Number} v2
 * @param {String} label
 * @param {Object} properties
 * @param {String} object Optional variable name used within the script
 *    context
 * @return {EdgeWrapper}
 */
Graph.prototype.addEdge = function(v1, v2, label, properties, object) {
  var params = {
    v1: v1,
    v2: v2,
    label: label,
    properties: properties
  };

  var edge = new EdgeWrapper('g');
  var method = new AddEdgeMethod(edge, params);

  method.run();

  edge.methods.push(method.toGroovy());

  return edge;
};

module.exports = Graph;