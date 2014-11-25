'use strict';
var GremlinScript = require('../src/gremlinscript');
var Graph = require('../').Structure.Graph;
var Vertex = require('../').Classes.Vertex;


describe('element', function() {
  describe('.addProperties()', function() {
    it('should add properties', function() {
      var gremlin = new GremlinScript();
      var v = new Vertex('v');
      gremlin.handleHelper(v.addProperties({
        'foo': 'bar',
        'baz': 'duh'
      }));
      v.should.have.property('foo', 'bar');
      v.should.have.property('baz', 'duh');

      gremlin.script.should.equal('v.addProperties(["foo":"bar","baz":"duh"])\n');
    });
  });

  describe('.addProperty()', function() {
    it('should add property', function() {
      var gremlin = new GremlinScript();
      var v = new Vertex('v');

      gremlin.handleHelper(v.addProperty('name', 'alice'));
      v.should.have.property('name', 'alice');
      gremlin.script.should.equal("v.addProperty('name','alice')\n");
    });
  });

  describe('.getProperties()', function() {
    it('should return properties', function() {
      var gremlin = new GremlinScript();
      var v = new Vertex('v');
      v.setProperty('name', 'bob');

      var vertexProperties = v.getProperties();
      vertexProperties.should.have.property('_type', 'vertex');
      vertexProperties.should.have.property('_id', null);
      vertexProperties.should.have.property('name', 'bob');
    });
  });

  describe('.keys()', function() {
    it("should chain .keys()", function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.v(1).keys());

      query.script.should.equal("g.v(1).keys()\n");
    });
  });

  describe('.remove()', function() {
    it('should remove element', function() {
      var gremlin = new GremlinScript();
      var v = new Vertex('v');

      gremlin.handleHelper(v.remove());
      gremlin.script.should.equal('v.remove()\n');
    });
  });

  describe('.setProperties()', function() {
    it('should set properties', function() {
      var gremlin = new GremlinScript();
      var v = new Vertex('v');
      gremlin.handleHelper(v.setProperties({
        'foo': 'bar',
        'baz': 'duh'
      }));
      v.should.have.property('foo', 'bar');
      v.should.have.property('baz', 'duh');

      gremlin.script.should.equal('v.setProperties(["foo":"bar","baz":"duh"])\n');
    });
  });

  describe('.setProperty()', function() {
    it('should set property', function() {
      var gremlin = new GremlinScript();
      var v = new Vertex('v');

      gremlin.handleHelper(v.setProperty('name', 'bob'));
      v.asObject().should.have.property('name', 'bob');
      gremlin.script.should.equal("v.setProperty('name','bob')\n");
    });
  });

  describe('.values()', function() {
    it("should chain .values()", function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.v(1).values());

      query.script.should.equal("g.v(1).values()\n");
    });
  });
});