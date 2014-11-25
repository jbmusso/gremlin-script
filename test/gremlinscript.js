'use strict';
var Graph = require('../').Structure.Graph;
var GremlinScript = require('../').GremlinScript;
var g;


describe('GremlinScript', function() {
  describe('line()', function() {
    it('should append a new line', function() {
      var gremlin = new GremlinScript();

      gremlin.line('g.v(1)');
      gremlin.script.should.equal('g.v(1)\n');
    });
  });

  describe('var()', function() {
    beforeEach(function() {
      g = new Graph('g');
    });

    it('should identify an object within the script with an automatic identifier', function() {
      var gremlin = new GremlinScript();

      gremlin.var(g.v(1));
      gremlin.script.should.equal('i0=g.v(1)\n');
    });

    it('should identify an object within the script with a custom identifier', function() {
      var gremlin = new GremlinScript();

      gremlin.var(g.v(1), 'v1');
      gremlin.script.should.equal('v1=g.v(1)\n');
    });
  });
});