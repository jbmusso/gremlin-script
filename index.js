'use strict';
var BoundParameter = require('./src/boundparameter');


module.exports = {
  GremlinScript: require('./src/gremlinscript'),
  ObjectWrapper: require('./src/objects/objectwrapper'),
  Classes: require('./src/classes/classes'),
  Structure: {
    Graph: require('./src/objects/structure/graph'),
    Vertex: require('./src/objects/structure/vertex'),
    Edge: require('./src/objects/structure/edge'),
    Traversal: require('./src/objects/process/traversal'),
  },
  bindParameter: function(value) {
    return new BoundParameter(value);
  }
};
