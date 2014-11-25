'use strict';
var GremlinScript = require('../').GremlinScript;
var Graph = require('../').Structure.Graph;
var Classes = require('../').Classes;

var Vertex = Classes.Vertex;
var Edge = Classes.Edge;
var g;
var vertex;


describe('graph', function() {
  describe('.addVertex()', function() {
    describe('signature: no parameter', function() {
      before(function() {
        g = new Graph('g');
        vertex = g.addVertex();
      });


      it('should return a vertex', function() {
        vertex.should.be.an.instanceof(Vertex);
      });

      it('should not have any property', function() {
        /*jshint -W030 */
        (vertex.asObject()._id === null).should.be.true;
        vertex.asObject()._type.should.equal('vertex');
      });

      it('should generate Groovy script', function() {
        var gremlin = (new GremlinScript().getAppender());
        var query = gremlin(vertex);
        query.script.should.equal('g.addVertex()\n');
      });
    });

    describe('signature: empty object {} parameter', function() {
      before(function() {
        vertex = g.addVertex({});
      });

      it('should return a vertex', function() {
        vertex.should.be.an.instanceof(Vertex);
      });

      it('should not have any property', function() {
        /*jshint -W030 */
        (vertex.asObject()._id === null).should.be.true;
        vertex.asObject()._type.should.equal('vertex');
      });

      it('should generate Groovy script', function() {
        var gremlin = (new GremlinScript().getAppender());
        var query = gremlin(vertex);

        query.script.should.equal('g.addVertex()\n');
      });
    });

    describe('signature: (Object)', function() {
      var vertex;

      before(function() {
        vertex = g.addVertex({ foo: "bar" });
      });

      it('should return a vertex pending for addition', function() {
        vertex.should.be.an.instanceof(Vertex);
      });

      it('should have a null _id', function() {
        vertex.asObject().should.have.property('_id', null);
      });

      it('should have properties set', function() {
        vertex.asObject().should.have.property('foo', 'bar');
      });

      it('should generate Groovy script', function() {
        var gremlin = (new GremlinScript().getAppender());
        var query = gremlin(vertex);

        query.script.should.equal('g.addVertex(["foo":"bar"])\n');
      });
    });

    describe('signature: (Object with _id property)', function() {
      var vertex;

      before(function() {
        vertex = g.addVertex({ foo: 'bar', _id: 1 });
      });

      it('should return a vertex', function() {
        vertex.should.be.an.instanceof(Vertex);
      });

      it('should have a numerical _id', function() {
        vertex.asObject().should.have.property('_id');
        vertex.asObject()._id.should.be.a.Number.and.equal(1);
      });

      it('should have properties set', function() {
        vertex.asObject().should.have.property('foo', 'bar');
      });

      it('should generate Groovy script', function() {
        var gremlin = (new GremlinScript().getAppender());
        var query = gremlin(vertex);

        query.script.should.equal('g.addVertex(1,["foo":"bar"])\n');
      });
    });
  });


  describe('.addEdge()', function() {
    describe('signature: Number, Number, String', function() {
      var edge;

      before(function() {
        edge = g.addEdge(1, 2, 'knows');
      });

      it('should return an edge', function() {
        edge.should.be.an.instanceof(Edge);
      });

      it('should not have any property', function() {
        /*jshint -W030 */
        (edge.asObject()._id === null).should.be.true;
        edge.asObject()._type.should.equal('edge');
      });

      it('should generate Groovy code', function() {
        var gremlin = (new GremlinScript()).getAppender();
        var query = gremlin(edge);

        query.script.should.equal('g.addEdge(1,2,"knows")\n');
      });
    });

    describe('signature: Number, Number, String, {...}', function() {
      var edge;

      before(function() {
        edge = g.addEdge(20, 30, 'knows', { since: 'now' });
      });

      it('should return an edge', function() {
        edge.should.be.an.instanceof(Edge);
      });

      it('should have a null _id', function() {
        edge.asObject().should.have.property('_id', null);
      });

      it('should have set _outV, _inV and _label properties', function() {
        edge.should.have.property('_outV', 20);
        edge.should.have.property('_inV', 30);
        edge.should.have.property('_label', 'knows');
      });

      it('should have own specified properties', function() {
        edge.should.have.property('since', 'now');
      });

      it('should generate Groovy code', function() {
        var gremlin = (new GremlinScript()).getAppender();
        var query = gremlin(edge);

        query.script.should.equal('g.addEdge(20,30,"knows",["since":"now"])\n');
      });
    });

    describe('signature: Vertex, Vertex, String, {...}', function() {
      var edge;

      before(function() {
        var v1 = g.addVertex({ name: 'Bob' });
        var v2 = g.addVertex({ name: 'Alice' });
        edge = g.addEdge(v1, v2, 'knows', { since: 'now' });
      });

      it('should return an edge', function() {
        edge.should.be.an.instanceof(Edge);
      });

      it('should have a null _id', function() {
        edge.asObject().should.have.property('_id', null);
      });

      it('should have _outV and _inV properties as Vertex', function() {
        edge._outV.should.be.an.instanceof(Vertex);
        edge._inV.should.be.an.instanceof(Vertex);
      });

      it('should have a _label', function() {
        edge.should.have.property('_label', 'knows');
      });
    });
  });

  describe('.createIndex(string, Element.class)', function() {
    it('should handle string, Element.class arguments', function () {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.createIndex("my-index", Vertex));

      query.script.should.equal("g.createIndex('my-index',Vertex.class)\n");
    });
  });

  describe('.dropIndex(String)', function() {
    it("should append string", function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.dropIndex("my-index"));

      query.script.should.equal("g.dropIndex('my-index')\n");
    });
  });

  describe('.E()', function () {
    it('should append string', function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.E());

      query.script.should.equal('g.E()\n');
    });
  });

  describe('.idx()', function() {
    it("should handle `name, {key: value}` arguments", function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.idx("my-index", {'name':'marko'}));
      query.script.should.equal("g.idx('my-index')[[name:'marko']]\n");
    });

    it("should support g.idx().put()", function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.idx("my-index").put("name", "marko", g.v(1)));
      query.script.should.equal("g.idx('my-index').put('name','marko',g.v(1))\n");
    });
  });

  describe('.V(key, value)', function () {
    it('should append string', function() {
      var g = new Graph('g');
      var gremlin = (new GremlinScript()).getAppender();
      var query = gremlin(g.V('name', 'marko'));
      query.script.should.equal("g.V('name','marko')\n");
    });
  });

  describe.skip('.V({ key: value })', function () {
    it('should append string', function() {
      var query = new GremlinScript(g.V({ name: 'marko' }));
      query.script.should.equal("g.V('name','marko')\n");
    });
  });
});
