// why: simplify things, clean code

// when:
// - complex process of creating new object
// - multiple ways of creating objects
// - need for customizing this process

// diff btw factory and builder
// factory: calling constructor
// builder: incremental building objects by calling methods that assigns props

// variations?
// 1. factory method
// 2. factory class

CoordinateSystem = {
  CARTESIAN: 0,
  POLAR: 1,
};

class Point {
  // Original API:
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get factory() {
    return PointFactory;
  }
}
class PointFactory {
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(a, b) {
    let x = a * Math.cos(b);
    let y = a * Math.sin(b);
    return new Point(x, y);
  }
}

// expected api
// const p1 = Point.newCartesianPoint(2, 3);
// const p2 = Point.newPolarPoint(5, Math.PI / 2);

// too much responsibility for Point class?
// make it less!
// expected api
// const p1 = PointFactory.newCartesianPoint(2, 3);
// const p2 = PointFactory.newPolarPoint(5, Math.PI / 2);

// too many classes to remember? can we integrate it?
// expected api
const p1 = Point.factory.newCartesianPoint(2, 3);
const p2 = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log({ p1, p2 });
