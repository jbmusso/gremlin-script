'use strict';

function ObjectWrapper(objectName) {
  this.objectName = objectName;
  this.methods = [];
  this.identifier = '';
  this.properties = {};
}

ObjectWrapper.prototype.toGroovy = function() {
  return this.objectName + this.methods.join('');
};

ObjectWrapper.prototype.asObject = function() {
  return this.properties;
};

module.exports = ObjectWrapper;