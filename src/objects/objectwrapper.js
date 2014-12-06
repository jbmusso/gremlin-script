'use strict';

function ObjectWrapper(objectName) {
  this.objectName = objectName;
  this.chain = [];
  this.identifier = '';
  this.properties = {};
}

ObjectWrapper.prototype.toGroovy = function(gremlinScript) {
  return this.objectName + this.chain
    .map(function(chained) {
      return chained.toGroovy(gremlinScript);
    })
    .join('');
};

ObjectWrapper.prototype.asObject = function() {
  return this.properties;
};

module.exports = ObjectWrapper;