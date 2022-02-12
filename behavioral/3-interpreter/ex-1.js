/* LEXING */
class Integer {
  constructor(value) {
    this.value = value;
  }
}

let Operation = Object.freeze({
  addition: 0,
  subtraction: 1,
});

class BinaryOperation {
  constructor() {
    this.type = null;
    this.left = null;
    this.right = null;
  }

  get value() {
    switch (this.type) {
      case Operation.addition:
        return this.left.value + this.right.value;
      case Operation.subtraction:
        return this.left.value - this.right.value;
    }
    return 0;
  }
}

let TokenType = Object.freeze({
  integer: 0,
  plus: 1,
  minus: 2,
  lparen: 3,
  rparen: 4,
});

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `\`${this.text}\``;
  }
}

function lex(input) {
  // todo: iterate through the input, build Token from chars, push into array
  // consider case of multiple digits number
  let result = [];

  return result;
}

let input = "(13+4)-(12+1)";
let tokens = lex(input);
console.log(tokens.join("  "));
