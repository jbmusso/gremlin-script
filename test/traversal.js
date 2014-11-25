'use strict';
var GremlinScript = require('../').GremlinScript;
var Graph = require('../').Structure.Graph;
var Traversal = require('../').Structure.Traversal;
var Classes = require('../').Classes;

var g;
var gremlin;

var _ = function() { return new Traversal('_()'); };
var T = Classes.T;


describe('traversal', function() {
  beforeEach(function() {
    g = new Graph('g');
    gremlin = new GremlinScript();
    gremlin = gremlin.getAppender();
  });

  describe('and', function () {
    it('should chain .and() with two conditions', function() {
      var query = gremlin(g.V().and(_().both("knows"), _().both("created")));

      query.script.should.equal("g.V().and(_().both('knows'),_().both('created'))\n");
    });
  });

  describe('.both()', function() {
    it('should append string', function() {
      var query = gremlin(g.v(1).both());
      query.script.should.equal('g.v(1).both()\n');
    });
  });

  describe('bothE', function() {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).bothE());
      query.script.should.equal('g.v(1).bothE()\n');
    });
  });

  describe('bothV', function() {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).bothV());
      query.script.should.equal('g.v(1).bothV()\n');
    });
  });

  describe('cap', function() {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).cap());
      query.script.should.equal('g.v(1).cap()\n');
    });
  });

  describe('copySplit', function () {
    it("should chain .copySplit()", function() {
      var query = gremlin(g.v(1).out('knows').copySplit(_().out('created').property('name'), _().property('age')).fairMerge());
      query.script.should.equal("g.v(1).out('knows').copySplit(_().out('created').property('name'),_().property('age')).fairMerge()\n");
    });
  });

  describe('except', function () {
    it('should chain .except()', function() {
      var query = gremlin(g.V().has('age', T.lt, 30).as('x').out('created').in('created').except('x'));

      query.script.should.equal("g.V().has('age',T.lt,30).as('x').out('created').in('created').except('x')\n");
    });
  });

  describe('exhaustMerge', function () {
    it('should chain .exhaustMerge()', function () {
      var query = gremlin(g.v(1).out('knows').copySplit(_().out('created').key('name'), _().key('age')).exhaustMerge());

      query.script.should.equal("g.v(1).out('knows').copySplit(_().out('created').name,_().age).exhaustMerge()\n");
    });
  });

  describe('gather', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).out().gather());
      query.script.should.equal('g.v(1).out().gather()\n');
    });

    it('should handle a closure', function() {
      var query = gremlin(g.v(1).out().gather('{it.size()}'));
      query.script.should.equal('g.v(1).out().gather(){it.size()}\n');
    });
  });

  describe('has', function() {
    it("should handle float type argument", function() {
      var query = gremlin(g.v(1).outE().has("weight", T.gte, "0.5f"));
      query.script.should.equal("g.v(1).outE().has('weight',T.gte,0.5f)\n");
    });
  });

  describe('id', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).id());
      query.script.should.equal('g.v(1).id()\n');
    });
  });

  describe('ifThenElse', function () {
    it("should chain .ifThenElse()", function() {
      var query = gremlin(g.v(1).out().ifThenElse("{it.name=='josh'}{it.age}{it.name}"));
      query.script.should.equal("g.v(1).out().ifThenElse(){it.name=='josh'}{it.age}{it.name}\n");
    });
  });

  describe('.in()', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).in());
      query.script.should.equal('g.v(1).in()\n');
    });
  });

  describe('[i]', function () {
    it('should chain .index(i) as [i]', function() {
      var query = gremlin(g.V().index(0).property('name'));
      query.script.should.equal("g.V()[0].property('name')\n");
    });
  });

  describe('inE', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).inE());
      query.script.should.equal('g.v(1).inE()\n');
    });
  });

  describe('inV', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).inV());
      query.script.should.equal('g.v(1).inV()\n');
    });
  });

  // client/JavaScript specific
  describe('key', function () {
    it('should be chainable', function () {
      var query = gremlin(g.v(1).key('name'));
      query.script.should.equal('g.v(1).name\n');
    });
  });

  describe('map', function () {
    it('should be chainable', function () {
      var query = gremlin(g.v(1).map());
      query.script.should.equal('g.v(1).map()\n');
    });
  });

  describe('memoize', function () {
    it('should be chainable', function () {
      var query = gremlin(g.V().memoize());
      query.script.should.equal('g.V().memoize()\n');
    });

    it('should handle numerical argument', function () {
      var query = gremlin(g.V().memoize(1));
      query.script.should.equal('g.V().memoize(1)\n');
    });
  });

  describe('or', function () {
    it('should chain .or() with two conditions', function() {
      var query = gremlin(g.v(1).outE().or(_().has('id', T.eq, 9), _().has('weight', T.lt, '0.6f')));

      query.script.should.equal("g.v(1).outE().or(_().has('id',T.eq,9),_().has('weight',T.lt,0.6f))\n");
    });
  });

  describe('.order()', function () {
    it('should be chainable', function() {
      var query = gremlin(g.V().key('name').order());
      query.script.should.equal('g.V().name.order()\n');
    });

    it('should handle a closure', function() {
      var query = gremlin(g.V().key('name').order('{it.b <=> it.a}'));
      query.script.should.equal('g.V().name.order(){it.b <=> it.a}\n');
    });
  });

  describe('orderMap', function () {
    it('should be chainable', function() {
      var query = gremlin(g.V().orderMap(T.decr));
      query.script.should.equal('g.V().orderMap(T.decr)\n');
    });

    it('should handle ordering token', function() {
      var query = gremlin(g.V().orderMap(T.decr));
      query.script.should.equal('g.V().orderMap(T.decr)\n');
    });
  });

  describe('out', function () {
    it('should be chainable', function () {
      var query = gremlin(g.v(1).out());
      query.script.should.equal('g.v(1).out()\n');
    });

    it('should handle string argument', function () {
      var query = gremlin(g.v(1).out('knows'));
      query.script.should.equal("g.v(1).out('knows')\n");
    });

    it('should handle id, string arguments', function () {
      var query = gremlin(g.v(1).out(1, 'knows'));
      query.script.should.equal("g.v(1).out(1,'knows')\n");
    });
  });

  describe('outE', function () {
    it('should be chainable', function () {
      var query = gremlin(g.v(1).outE());
      query.script.should.equal("g.v(1).outE()\n");
    });

    it('should handle a string argument', function () {
      var query = gremlin(g.v(1).outE('knows'));
      query.script.should.equal("g.v(1).outE('knows')\n");
    });

    it('should handle id, string arguments', function () {
      var query = gremlin(g.v(1).outE(1, 'knows'));
      query.script.should.equal("g.v(1).outE(1,'knows')\n");
    });
  });

  describe('outV', function() {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).outV());
      query.script.should.equal('g.v(1).outV()\n');
    });
  });

  describe('path', function() {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).path());
      query.script.should.equal('g.v(1).path()\n');
    });

    it('should handle a closure argument', function() {
      var query = gremlin(g.v(1).path('{it.id}'));
      query.script.should.equal("g.v(1).path(){it.id}\n");
    });

    it('should handle a closure argument', function() {
      var query = gremlin(g.v(1).path('{it.id}{it.name}'));
      query.script.should.equal("g.v(1).path(){it.id}{it.name}\n");
    });
  });

  describe('[i...i]', function () {
    it('should chain .range() as [i..j]', function() {
      var query = gremlin(g.V().range('0..<2').property('name'));
      query.script.should.equal("g.V()[0..<2].property('name')\n");
    });
  });

  describe('retain', function () {
    it('should handle an array of traversals', function() {
      var query = gremlin(g.V().retain([g.v(1), g.v(2), g.v(3)]));

      query.script.should.equal("g.V().retain([g.v(1),g.v(2),g.v(3)])\n");
    });
  });

  describe('scatter', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v().scatter());
      query.script.should.equal('g.v().scatter()\n');
    });
  });

  describe('select', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v(1).select());
      query.script.should.equal('g.v(1).select()\n');
    });

    it('should handle an array of strings', function() {
      var query = gremlin(g.v(1).select(['y']));
      query.script.should.equal("g.v(1).select(['y'])\n");
    });

    it('should handle an array of strings & 1 post-processing closure', function() {
      var query = gremlin(g.v(1).select(['y'],'{it.name}'));
      query.script.should.equal("g.v(1).select(['y']){it.name}\n");
    });

    it('should handle no argument & 2 post-processing closures', function() {
      var query = gremlin(g.v(1).select('{it.id}{it.name}'));
      query.script.should.equal("g.v(1).select(){it.id}{it.name}\n");
    });
  });

  // Missing method
  describe.skip('shuffle', function () {
    it('should be chainable', function() {
      var query = gremlin(g.v().shuffle());
      query.script.should.equal('g.v().shuffle()');
    });
  });

  describe('transform', function () {
    it('should be chainable', function() {
      var query = gremlin(g.V().transform());
      query.script.should.equal('g.V().transform()\n');
    });

    it('should handle closures', function() {
      var query = gremlin(g.V().transform('{[it.id,it.age]}'));
      query.script.should.equal('g.V().transform(){[it.id,it.age]}\n');
    });
  });
});