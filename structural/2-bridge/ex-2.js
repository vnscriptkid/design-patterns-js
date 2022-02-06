// shapes: square, triangle
// ways of render: window, linux, mac

// naive approach:
class ShapeRender {
  render() {
    console.log("Abstract method.");
  }
}

class SquareWindowRender extends ShapeRender {
  render() {
    console.log(`Square rendering on window...`);
  }
}

class SquareLinuxRender extends ShapeRender {
  render() {
    console.log(`Square rendering on linux...`);
  }
}

class TriangleWindowRender extends ShapeRender {
  render() {
    console.log(`Triangle rendering on window...`);
  }
}

class TriangleLinuxRender extends ShapeRender {
  render() {
    console.log(`Triangle rendering on linux...`);
    s;
  }
}

// todo: convert into more feasible way
