'use strict';

function ObjectWrapper(objectName) {
  this.objectName = objectName;
  this.methods = [];
  this.identifier = '';
  this.properties = {};
}

ObjectWrapper.prototype.toGroovy = function(gremlinScript) {
  return this.objectName + this.methods
    .map(function(method) {
      return method.toGroovy(gremlinScript);
    })
    .join('');
};

ObjectWrapper.prototype.asObject = function() {
  return this.properties;
};

module.exports = ObjectWrapper;