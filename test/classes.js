'use strict';
var should = require('should');

var Classes = require('../').Classes;


describe('Classes', function() {
  describe('Java classes', function() {
    it('should expose Vertex class', function() {
      var Vertex = Classes.Vertex;
      should.exist(Vertex);
      Vertex.toGroovy().should.equal('Vertex.class');
      Vertex.class.should.equal('Vertex.class');
    });

    it('should expose Edge class', function() {
      var Edge = Classes.Edge;
      should.exist(Edge);
      Edge.toGroovy().should.equal('Edge.class');
      Edge.class.should.equal('Edge.class');
    });

    it('should expose String class', function() {
      var String = Classes.String;
      should.exist(String);
      String.toGroovy().should.equal('String.class');
      String.class.should.equal('String.class');
    });

    it('should expose Integer class', function() {
      var Integer = Classes.Integer;
      should.exist(Integer);
      Integer.toGroovy().should.equal('Integer.class');
      Integer.class.should.equal('Integer.class');
    });

    it('should expose Token classes', function() {
      var T = Classes.T;
      should.exist(T);
      T.gt.should.equal('T.gt');
    });

    it('should expose Contains classes', function() {
      var Contains = Classes.Contains;
      should.exist(Contains);
      Contains.IN.should.equal('Contains.IN');
    });

    it('should expose Direction class', function() {
      var Direction = Classes.Direction;
      should.exist(Direction);
      Direction.OUT.should.equal('Direction.OUT');
    });
  });
});