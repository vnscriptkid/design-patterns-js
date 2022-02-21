class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width}×${this._height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

let useIt = function (rc) {
  let width = rc._width;
  rc.height = 10;
  console.log(
    `${rc.constructor.name} | height: ${rc.height}, width: ${rc.width} | area: ${rc.area}`
  );
};

let rc = new Rectangle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);
