// why, when
// diff btw factory and builder
// variations?

CoordinateSystem = {
  CARTESIAN: 0,
  POLAR: 1,
};

class Point {
  // Original API:
  // constructor(x, y) {
  //     this.x = x;
  //     this.y = y;
  // }

  // Modification to support polar point
  constructor(a, b, cs = CoordinateSystem.CARTESIAN) {
    switch (cs) {
      case CoordinateSystem.CARTESIAN:
        this.x = a;
        this.y = b;
        break;
      case CoordinateSystem.POLAR:
        this.x = a * Math.cos(b);
        this.y = a * Math.sin(b);
        break;
    }
  }
}

// expected api
Point.newCartesianPoint(2, 3);
Point.newPolarPoint(5, Math.PI / 2);

// too much responsibility for Point class?
// make it less!
// expected api
PointFactory.newCartesianPoint(2, 3);
PointFactory.newPolarPoint(5, Math.PI / 2);

// too many classes to remember? can we integrate it?
// expected api
Point.factory.newCartesianPoint(2, 3);
Point.factory.newPolarPoint(5, Math.PI / 2);
