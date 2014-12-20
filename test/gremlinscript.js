'use strict';
var Graph = require('../').Structure.Graph;
var GremlinScript = require('../').GremlinScript;
var bind = require('../').bindParameter;


describe('GremlinScript', function() {
  describe('.line(String)', function() {
    it('should append a new line', function() {
      var gremlin = new GremlinScript();

      gremlin.line('g.v(1)');
      gremlin.script.should.equal('g.v(1)\n');
    });
  });

  describe('.line(String, ...parameters)', function() {
    it('should append a new line with a bound parameter', function() {
      var gremlin = new GremlinScript();

      gremlin.line('g.v(%s)', 1);
      gremlin.script.should.equal('g.v(p0)\n');
      gremlin.params.p0.should.equal(1);
    });

    it('should append a new line with multiple bound parameters', function() {
      var gremlin = new GremlinScript();

      gremlin.line('g.V(%s, %s)', 'name', 'Alice');
      gremlin.script.should.equal('g.V(p0, p1)\n');
      gremlin.params.p0.should.equal('name');
      gremlin.params.p1.should.equal('Alice');
    });
  });

  describe('.line(Helper)', function() {
    it('should append a new line', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      gremlin.line(g.v(1));
      gremlin.script.should.equal('g.v(1)\n');
    });
  });

  describe('.var(Helper)', function() {
    it('should identify an object with an automatic identifier', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      gremlin.var(g.v(1));
      gremlin.script.should.equal('i0=g.v(1)\n');
    });
  });

  describe('.var(Helper[, identifier])', function() {
    it('should identify an object with a custom identifier', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      gremlin.var(g.v(1), 'v1');
      gremlin.script.should.equal('v1=g.v(1)\n');
    });
  });

  describe('Bound parameters with helpers', function() {
    it('should handle a bound parameter', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      gremlin.line(g.v(bind(1)));
      gremlin.script.should.equal('g.v(p0)\n');
      gremlin.params.p0.should.equal(1);
    });

    it('should handle multiple bound parameters', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      gremlin.line(g.V('name', bind('Alice')).has('age', bind(28)));
      gremlin.script.should.equal("g.V('name',p0).has('age',p1)\n");
      gremlin.params.p0.should.equal('Alice');
      gremlin.params.p1.should.equal(28);
    });

    it('should handle a bound parameter with .var() method', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      gremlin.var(g.V('name', bind('Alice')), 't');
      gremlin.script.should.equal("t=g.V('name',p0)\n");
      gremlin.params.p0.should.equal('Alice');
    });

    it('should handle bound parameters when adding graph elements', function() {
      var gremlin = new GremlinScript();
      var g = new Graph('g');

      var alice = { name: 'Alice', age: 30 };
      var bob = { name: 'Bob', age: 24 };
      var properties = { foo: 'bar' };

      var v1 = gremlin.var(g.addVertex(bind(alice)), 'v1');
      var v2 = gremlin.var(g.addVertex(bind(bob)), 'v2');
      gremlin.line(g.addEdge(v1, v2, 'knows', bind(properties)));

      gremlin.script.should.equal("v1=g.addVertex(p0)\nv2=g.addVertex(p1)\ng.addEdge(v1,v2,'knows',p2)\n");
      gremlin.params.p0.should.equal(alice);
      gremlin.params.p0.name.should.equal('Alice');
      gremlin.params.p0.age.should.equal(30);
      gremlin.params.p1.should.equal(bob);
      gremlin.params.p2.should.equal(properties);
    });
  });
});