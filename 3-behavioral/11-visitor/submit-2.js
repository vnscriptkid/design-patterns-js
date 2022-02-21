class NumberExpression {
  constructor(value) {
    this.value = value;
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

// separate class that handle printing
class ExpressionPrinter {
  print(e, buffer) {
    // todo: check type of expression at runtime
    // build buffer accordingly
    switch (true) {
      case e instanceof NumberExpression: {
        buffer.push(e.value);
        break;
      }
      case e instanceof AdditionExpression: {
        buffer.push("(");
        this.print(e.left, buffer);
        buffer.push("+");
        this.print(e.right, buffer);
        buffer.push(")");
        break;
      }
      default:
        console.log("Unsupported type.");
    }
  }
}

let e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
let buffer = [];
let ep = new ExpressionPrinter();
ep.print(e, buffer);
console.log(buffer.join(""));
