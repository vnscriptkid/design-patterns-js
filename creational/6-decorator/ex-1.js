class Shape {}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape {
  constructor(side = 0) {
    super();
    this.side = side;
  }

  toString() {
    return `A square with side ${this.side}`;
  }
}

// somewhere down the line, we want to add color prop to shape
// naive solution: monkey patch the Shape class => violates Open-closed principle
// we don't want ColoredSquare, ColoredCircle, etc.
class ColoredShape extends Shape {
  // todo: implement constructor. this should keep ref to shape
  // todo: implement toString() that prints color of shape
}

// later, we decide color is not enough, we want add transparency info to shape
// todo: decorate the Shape class, add constructor, and toString()

let circle = new Circle(2);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, "red");
console.log(redCircle.toString());

// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);

// let redHalfCircle = new TransparentShape(redCircle, 0.5);
// console.log(redHalfCircle.toString());
