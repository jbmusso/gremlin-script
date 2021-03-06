'use strict';
var inherits = require('util').inherits;

var GremlinStep = require('../../functions/steps/step');
var CollectionAccessor = require('../../functions/collectionaccessor');
var CollectionStep = require('../../functions/steps/collectionstep');
var GremlinProperty = require('../../functions/property');
var ObjectWrapper = require('../objectwrapper');


function Traversal(object) {
  ObjectWrapper.call(this, object);
}

inherits(Traversal, ObjectWrapper);

Traversal.prototype.both = function() {
  var step = new GremlinStep('both', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.bothE = function() {
  var step = new GremlinStep('bothE', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.bothV = function() {
  var step = new GremlinStep('bothV', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.cap = function() {
  var step = new GremlinStep('cap', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.gather = function() {
  var step = new GremlinStep('gather', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.id = function() {
  var step = new GremlinStep('id', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.in = function() {
  var step = new GremlinStep('in', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.inE = function() {
  var step = new GremlinStep('inE', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.inV = function() {
  var step = new GremlinStep('inV', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.property = function() {
  var step = new GremlinStep('property', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.label = function() {
  var step = new GremlinStep('label', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.map = function() {
  var step = new GremlinStep('map', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.memoize = function() {
  var step = new GremlinStep('memoize', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.order = function() {
  var step = new GremlinStep('order', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.out = function() {
  var step = new GremlinStep('out', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.outE = function() {
  var step = new GremlinStep('outE', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.outV = function() {
  var step = new GremlinStep('outV', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.path = function() {
  var step = new GremlinStep('path', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.scatter = function() {
  var step = new GremlinStep('scatter', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.select = function() {
  var step = new GremlinStep('select', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.transform = function() {
  var step = new GremlinStep('transform', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.orderMap = function() {
  var step = new GremlinStep('orderMap', arguments);
  this.chain.push(step);

  return this;
};

/*** Filter ***/
// index(i)
Traversal.prototype.index = function() {
  var step = new CollectionAccessor(arguments);
  this.chain.push(step);

  return this;
};

// range('[i..j]')
Traversal.prototype.range = function() {
  var step = new CollectionAccessor(arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.and = function() {
  var step = new GremlinStep('and', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.back = function() {
  var step = new GremlinStep('back', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.dedup = function() {
  var step = new GremlinStep('dedup', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.except = function() {
  var step = new CollectionStep('except', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.filter = function() {
  var step = new GremlinStep('filter', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.has = function() {
  var step = new GremlinStep('has', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.hasNot = function() {
  var step = new GremlinStep('hasNot', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.interval = function() {
  var step = new GremlinStep('interval', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.or = function() {
  var step = new GremlinStep('or', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.random = function() {
  var step = new GremlinStep('random', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.retain = function() {
  var step = new CollectionStep('retain', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.simplePath = function() {
  var step = new GremlinStep('simplePath', arguments);
  this.chain.push(step);

  return this;
};

/*** Side Effect ***/
Traversal.prototype.aggregate = function() {
  throw new Error('Not implemented.');
};

Traversal.prototype.as = function() {
  var step = new GremlinStep('as', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.groupBy = function() {
  var step = new GremlinStep('groupBy', arguments);
  this.chain.push(step);

  return this;
};

// Not FullyImplemented ??
Traversal.prototype.groupCount = function() {
  var step = new GremlinStep('groupCount', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.optional = function() {
  var step = new GremlinStep('optional', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.sideEffect = function() {
  var step = new GremlinStep('sideEffect', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.linkBoth = function() {
  var step = new GremlinStep('linkBoth', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.linkIn = function() {
  var step = new GremlinStep('linkIn', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.linkOut = function() {
  var step = new GremlinStep('linkOut', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.store = function() {
  throw new Error('Not implemented');
};

Traversal.prototype.table = function() {
  throw new Error('Not implemented');
};

Traversal.prototype.tree = function() {
  throw new Error('Not implemented');
};

/*** Branch ***/
Traversal.prototype.copySplit = function() {
  var step = new GremlinStep('copySplit', arguments);
  this.chain.push(step);

  return this;
};
Traversal.prototype.exhaustMerge = function() {
  var step = new GremlinStep('exhaustMerge', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.fairMerge = function() {
  var step = new GremlinStep('fairMerge', arguments);
  this.chain.push(step);

  return this;
};

// g.v(1).out().ifThenElse('{it.name=='josh'}','{it.age}','{it.name}')
Traversal.prototype.ifThenElse = function() {
  var step = new GremlinStep('ifThenElse', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.loop = function() {
  var step = new GremlinStep('loop', arguments);
  this.chain.push(step);

  return this;
};

/*** chain ***/
Traversal.prototype.fill = function() {
  throw new Error('Not implemented');
};

Traversal.prototype.count = function() {
  var step = new GremlinStep('count', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.iterate = function() {
  var step = new GremlinStep('iterate', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.next = function() {
  var step = new GremlinStep('next', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.toList = function() {
  var step = new GremlinStep('toList', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.keys = function() {
  var step = new GremlinStep('keys', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.remove = function() {
  var step = new GremlinStep('remove', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.values = function() {
  var step = new GremlinStep('values', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.put = function() {
  var step = new GremlinStep('put', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.getPropertyKeys = function() {
  var step = new GremlinStep('getPropertyKeys', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.setProperty = function() {
  var step = new GremlinStep('setProperty', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.getProperty = function() {
  var step = new GremlinStep('getProperty', arguments);
  this.chain.push(step);

  return this;
};

// Titan specifics
Traversal.prototype.name = function() {
  var step = new GremlinStep('name', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.dataType = function() {
  var step = new GremlinStep('dataType', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.indexed = function() {
  var step = new GremlinStep('indexed', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.unique = function() {
  var step = new GremlinStep('unique', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.makePropertyKey = function() {
  var step = new GremlinStep('makePropertyKey', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.group = function() {
  var step = new GremlinStep('group', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.makeEdgeLabel = function() {
  var step = new GremlinStep('makeEdgeLabel', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.query = function() {
  var step = new GremlinStep('query', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+
Traversal.prototype.single = function() {
  var step = new GremlinStep('single', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+
Traversal.prototype.list = function() {
  var step = new GremlinStep('list', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+: replaces unique(Direction.IN)
Traversal.prototype.oneToMany = function() {
  var step = new GremlinStep('oneToMany', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+: replaces unique(Direction.OUT)
Traversal.prototype.manyToOne = function() {
  var step = new GremlinStep('manyToOne', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+: replaces unique(Direction.IN) and unique(Direction.OUT)
Traversal.prototype.oneToOne = function() {
  var step = new GremlinStep('oneToOne', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+
Traversal.prototype.makeKey = function() {
  var step = new GremlinStep('makeKey', arguments);
  this.chain.push(step);

  return this;
};

// Titan v0.4.0+
Traversal.prototype.makeLabel = function() {
  var step = new GremlinStep('makeLabel', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.make = function() {
  var step = new GremlinStep('make', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.sortKey = function() {
  var step = new GremlinStep('sortKey', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.signature = function() {
  var step = new GremlinStep('signature', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.unidirected = function() {
  var step = new GremlinStep('unidirected', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.createKeyIndex = function() {
  var step = new GremlinStep('createKeyIndex', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.getIndexes = function() {
  var step = new GremlinStep('getIndexes', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.hasIndex = function() {
  var step = new GremlinStep('hasIndex', arguments);
  this.chain.push(step);

  return this;
};

Traversal.prototype.key = function() {
  var property = new GremlinProperty(arguments[0]);
  this.chain.push(property);

  return this;
};

module.exports = Traversal;