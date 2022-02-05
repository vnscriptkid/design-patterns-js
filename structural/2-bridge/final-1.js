class VectorRenderer {
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius}`);
  }

  renderSquare(size) {
    console.log(`Drawing a square of size ${size}`);
  }
}

class RasterRenderer {
  renderCircle(radius) {
    console.log(`Drawing pixels for circle of radius ${radius}`);
  }

  renderSquare(size) {
    console.log(`Drawing pixels for square of size ${size}`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

class Square extends Shape {
  constructor(renderer, size) {
    super(renderer);
    this.size = size;
  }

  draw() {
    this.renderer.renderSquare(this.size);
  }
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
