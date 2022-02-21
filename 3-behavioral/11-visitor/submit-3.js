class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  // todo: accept a visitor, let visitor do the work on this numberExpression
  accept(visitor) {
    visitor.visitNumber(this);
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  // todo: accept a visitor, let visitor do the work on this additionExpression
  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class Visitor {
  constructor() {
    this.buffer = [];
  }
}

class ExpressionPrinter extends Visitor {
  constructor() {
    super();
  }

  // todo: add implementation for how to visitNumber
  visitNumber(e) {
    this.buffer.push(e.value);
  }

  // todo: add implementation for how to visitAddition
  visitAddition(e) {
    this.buffer.push("(");
    e.left.accept(this);
    this.buffer.push("+");
    e.right.accept(this);
    this.buffer.push(")");
  }

  toString() {
    // todo: join strings from buffer and returns
    return this.buffer.join("");
  }
}

class ExpressionCalculator {
  // this visitor is stateful which can lead to problems
  constructor() {
    // todo: init result of expression (will be updated to current expression's result, every time it visits an expression)
    this.result = 0;
  }

  visitNumber(e) {
    // todo: update result
    this.result = e.value;
  }

  visitAddition(e) {
    // todo: visit left (this.result is updated to result of left)
    // store to a temp var before visiting right (avoid losing result of left)
    // update result to result of current expression
    e.left.accept(this);
    const temp = this.result;
    e.right.accept(this);
    this.result += temp;
  }
}

let e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);

var ep = new ExpressionPrinter();
ep.visitAddition(e);

var ec = new ExpressionCalculator();
ec.visitAddition(e);

console.log(`${ep.toString()} = ${ec.result}`);
