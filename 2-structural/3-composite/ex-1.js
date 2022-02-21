class GraphicObject {
  // could be scalar or composite value
  // 1. scalar: square, circle (has no children)
  // 2. composite: group (has children)

  static count = 0;

  get name() {
    return this._name;
  }

  constructor(name = "Group " + ++GraphicObject.count) {
    this.children = [];
    this.color = undefined;
    this._name = name;
  }

  print(buffer, depth) {
    // Group 1
    // * Red Square
    // * Yellow Circle
    // * Group 2
    // ** Blue Circle
    // ** Blue Square
    /* ******** */
    // todo: build current graphicObject, push in buffer
    // todo: recursively build children objects, going down each level adding one more *
    // each level in one line (separated by \n char)
  }

  toString() {
    let buffer = [];
    // build the buffer
    return buffer.join("");
  }
}

class Circle extends GraphicObject {
  // Circle is scalar
  constructor(color) {
    super("Circle");
    this.color = color;
  }
}

class Square extends GraphicObject {
  // Square is scalar
  constructor(color) {
    super("Square");
    this.color = color;
  }
}

let drawing = new GraphicObject();
drawing.children.push(new Square("Red"));
drawing.children.push(new Circle("Yellow"));

let group = new GraphicObject();
group.children.push(new Circle("Blue"));
group.children.push(new Square("Blue"));
drawing.children.push(group);

console.log(drawing);
