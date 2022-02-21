class VectorRenderer {
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius}`);
  }
}

class RasterRenderer {
  renderCircle(radius) {
    console.log(`Drawing pixels for circle of radius ${radius}`);
  }
}

// todo: define class Shape that keeps ref to renderer

class Circle extends Shape {
  // todo: define constructor, pass renderer for shape, circle has radius
  resize(factor) {
    this.radius *= factor;
  }
}

class Square extends Shape {
  // todo: define constructor and draw()
}

// imagine Square, Triangle
// different ways of rendering: vector, raster
// we don't want a cartesian product of these: SquareVectorRender, SquareRasterRender, TriangleVectorRender, TriangleRasterRencer

let raster = new RasterRenderer();
let vector = new VectorRenderer();

let circle = new Circle(vector, 5);

circle.draw();
circle.resize(2);
circle.draw();
