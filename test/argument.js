'use strict';
var Argument = require('../src/arguments/argument');
var ArrayArgument = require('../src/arguments/array');
var ObjectArgument = require('../src/arguments/object');


describe('Arguments', function() {
  describe('Argument', function() {
    describe('.toGroovy()', function() {
      it('should handle arrays', function() {
        var arg = new Argument(['Foo', 2]);

        arg.toGroovy().should.eql("'Foo',2");
      });

      it('should handle booleans', function() {
        var arg = new Argument(false);

        arg.toGroovy().should.eql('false');
      });
    });
  });

  describe('ArrayArgument', function() {
    describe('.toGroovy()', function() {
      it('should return the appropriate string', function() {
        var array = new ArrayArgument(['Foo', 2]);

        array.toGroovy().should.equal("['Foo',2]");
      });
    });
  });

  describe('ObjectArgument', function() {
    describe('.toGroovy()', function() {
      it('should handle nested objects', function () {
        var arg = new ObjectArgument({ one: { two: 3 }});
        arg.toGroovy().should.equal('["one":["two":3]]');
      });

      it('should handle curly braces in values', function () {
        var arg = new ObjectArgument({ one: { left: '{', right: '}' }});

        arg.toGroovy().should.equal('["one":["left":"{","right":"}"]]');
      });

      it('should handle undefined and null values as null', function () {
        var arg = new ObjectArgument({ 'null': null, 'undefined': undefined });

        arg.toGroovy().should.equal('["null":null,"undefined":null]');
      });
    });
  });
});
