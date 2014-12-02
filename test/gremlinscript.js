'use strict';
var Graph = require('../').Structure.Graph;
var GremlinScript = require('../').GremlinScript;
var g;


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
});