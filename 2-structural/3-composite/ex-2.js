// https://stackoverflow.com/questions/29879267/
var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Connectable {
  connectTo(other) {
    // treat `this` and `other` as composite value
  }
}

// Problem statement:
// - Neuron is like a Node (scalar), has 2 ports: IN and OUT
// - Layer is composite value (contains multiple nodes)
// we want to be able to:
// connect Node to Node
// connect Node to Layer -> loop
// connect Layer to Node -> loop
// connect Layer to Layer -> nested loop

// naive approach: define 2 methods in Node and 2 methods in Layer
// class Node {
//     connectToNode(node) {}
//     connectToLayer(layer) {}
// }

// class Layer {
//     connectToNode(node) {}
//     connectToLayer(layer) {}
// }

// solution: treat scalar as a composite value
// question: how to treat scalar value like Neuron as a composite value (iterable)

class Neuron extends Connectable {
  constructor() {
    super();
    this.in = [];
    this.out = [];
  }

  // connectTo(other)
  // {
  //   this.out.push(other);
  //   other.in.push(this);
  // }

  toString() {
    return (
      `A neuron with ${this.in.length} inputs ` +
      `and ${this.out.length} outputs`
    );
  }
}

// multiple inheritance is impossible, so...
class NeuronLayer extends aggregation(Array, Connectable) {
  constructor(count) {
    super();
    while (count-- > 0) this.push(new Neuron());
  }

  toString() {
    return `A layer with ${this.length} neurons`;
  }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();
let layer1 = new NeuronLayer(3);
let layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer1);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());
