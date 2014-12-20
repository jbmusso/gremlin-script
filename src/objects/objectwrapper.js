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

ObjectWrapper.prototype.getScriptAndParams = function(gremlinScript) {
  var script = this.toGroovy(gremlinScript);
  var params = this.getBoundParameters();

  var scriptData = {
    script: script,
    params: params
  };

  return scriptData;
};

ObjectWrapper.prototype.getBoundParameters = function() {
  var boundParameters = [];

  this.chain.forEach(function(chained) {
    var bounds = chained.getBoundParameters();
    boundParameters.push(bounds);
  });

  return boundParameters;
};

ObjectWrapper.prototype.asObject = function() {
  return this.properties;
};

module.exports = ObjectWrapper;