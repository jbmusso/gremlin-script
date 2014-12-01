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

#### Adding a line with Graph and Element helpers

```javascript
var gremlin = new GremlinScript();
var g = new Graph('g');

gremlin.line(g.v(1));
gremlin.script.should.equal('g.v(1)\n');
```

Binding parameters is currently not supported when using helpers.

## Author

Jean-Baptiste Musso - [@jbmusso](https://twitter.com/jbmusso).

This library was heavily inspired by the great work started by Frank Panetta on gRex. Thanks!

## Contributors

https://github.com/gulthor/gremlin-script/graphs/contributors

## License

MIT (c) 2014 Jean-Baptiste Musso
