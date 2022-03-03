// why, when
// diff btw factory and builder
// variations?

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

  // Modification to support polar point
  //   constructor(a, b, cs = CoordinateSystem.CARTESIAN) {
  //     switch (cs) {
  //       case CoordinateSystem.CARTESIAN:
  //         this.x = a;
  //         this.y = b;
  //         break;
  //       case CoordinateSystem.POLAR:
  //         this.x = a * Math.cos(b);
  //         this.y = a * Math.sin(b);
  //         break;
  //     }
  //   }
  static get factory() {
    return new PointFactory();
  }
}

class PointFactory {
  newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  newPolarPoint(a, b) {
    const x = a * Math.cos(b);
    const y = a * Math.sin(b);
    return new Point(x, y);
  }
}

// expected api
// const p1 = Point.newCartesianPoint(2, 3);
// const p2 = Point.newPolarPoint(5, Math.PI / 2);

// console.log({ p1, p2 });

// too much responsibility for Point class?
// make it less!
// expected api
// const p1 = PointFactory.newCartesianPoint(2, 3);
// const p2 = PointFactory.newPolarPoint(5, Math.PI / 2);

// // too many classes to remember? can we integrate it?
// // expected api
const p1 = Point.factory.newCartesianPoint(2, 3);
const p2 = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log({ p1, p2 });
