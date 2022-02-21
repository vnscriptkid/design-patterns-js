/* Intrusive visitor 
!! problems:
1) separation of concerns (expression handles printing work)
2) open-closed (modifying existing classes)
*/

class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  // buffer visits numberExpression
  print(buffer) {
    // todo: build up the buffer
    buffer.push(this.value);
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  // buffer visits additionExpression
  print(buffer) {
    // todo: build up the buffer
    // (1+2)
    buffer.push("(");
    this.left.print(buffer);
    buffer.push("+");
    this.right.print(buffer);
    buffer.push(")");
  }
}

// 1 + (2+3)
let e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
// create a visitor, passing it to print, so that visitor can go recursively and visits all expressions
let buffer = [];
e.print(buffer);
console.log(buffer.join(""));
