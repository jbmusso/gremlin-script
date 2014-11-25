'use strict';


function JavaClass(name) {
  this.name = name;
}

JavaClass.prototype.toGroovy = function() {
  return this.name + '.class';
};

Object.defineProperty(JavaClass.prototype, 'class', {
  get: function() {
    return this.toGroovy();
  }
});

module.exports = JavaClass;