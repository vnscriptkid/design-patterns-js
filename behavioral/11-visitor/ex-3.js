class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  // todo: accept a visitor, let visitor do the work on this numberExpression
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  // todo: accept a visitor, let visitor do the work on this additionExpression
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

  // todo: add implementation for how to visitAddition

  toString() {
    // todo: join strings from buffer and returns
  }
}

class ExpressionCalculator {
  // this visitor is stateful which can lead to problems
  constructor() {
    // todo: init result of expression (will be updated to current expression's result, every time it visits an expression)
  }

  visitNumber(e) {
    // todo: update result
  }

  visitAddition(e) {
    // todo: visit left (this.result is updated to result of left)
    // store to a temp var before visiting right (avoid losing result of left)
    // update result to result of current expression
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
