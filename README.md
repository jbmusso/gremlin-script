gremlin-script
==============

Generate Gremlin scripts with ease.

Works in Node.js and the browser.

## Installation

### Node.js
```
$ npm install gremlin-script -S
```

### Browsers

This module works as a CommonJS, AMD module or standalone module (exported globally as `GremlinScript`).

## API

Instantiate a script object:

```javascript
var GremlinScript = require('gremlin-script').GremlinScript;
var gremlin = new GremlinScript();
```

Get a reference to the graph:

```javascript
var Graph = require('gremlin-script').Structure.Graph;
var g = new Graph('g'); // pass graph identifier/name to the constructor
```

### gremlin.line(String|Helper[, ...parameters])

#### Adding a raw String line

```javascript
var gremlin = new GremlinScript();

gremlin.line('g.v(1)');
gremlin.script.should.equal('g.v(1)\n');
```

#### Adding a raw String line with a bound parameter (printf style)

```javascript
var gremlin = new GremlinScript();

gremlin.line('g.v(%s)', 1);
gremlin.script.should.equal('g.v(p0)\n');
gremlin.params.p0.should.equal(1);
```

#### Adding a raw String line with multiple parameters (printf style)

```javascript
var gremlin = new GremlinScript();

gremlin.line('g.V(%s, %s)', 'name', 'Alice');
gremlin.script.should.equal('g.V(p0, p1)\n');
gremlin.params.p0.should.equal('name');
gremlin.params.p1.should.equal('Alice');
```

#### Adding a line with Graph and Element (Vertex/Edge) helpers

```javascript
var gremlin = new GremlinScript();
var g = new Graph('g');

gremlin.line(g.v(1));
gremlin.script.should.equal('g.v(1)\n');
```

#### Bound parameters when using helpers

Using the `bindParameter()` function flags the argument passed to a function as a `BoundParameter`. When generating the string, Gremlin-Script will automatically replace such wrapped argument with an automatically generated variable name and push the argument to the `gremlin.params` Array.

```javascript
var bind = require('gremlin-script').bindParameter;

var gremlin = new GremlinScript();
var g = new Graph('g');

var v1 = gremlin.var(g.addVertex(bind({ name: 'Alice' })), 'v1');
var v2 = gremlin.var(g.addVertex(bind({ name: 'Bob' })), 'v2');
gremlin.line(g.addEdge(v1, v2, 'knows', bind({ foo: 'bar' })));

gremlin.script.should.equal("v1=g.addVertex(p0)\nv2=g.addVertex(p1)\ng.addEdge(v1,v2,'knows',p2)\n");
gremlin.params.p0.name.should.equal('Alice');
gremlin.params.p1.name.should.equal('Bob');
gremlin.params.p2.foo.should.equal('bar');
```

## Author

Jean-Baptiste Musso - [@jbmusso](https://twitter.com/jbmusso).

This library was heavily inspired by the great work started by Frank Panetta on gRex. Thanks!

## Contributors

https://github.com/gulthor/gremlin-script/graphs/contributors

## License

MIT (c) 2014 Jean-Baptiste Musso
