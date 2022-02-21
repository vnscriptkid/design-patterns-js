/* PARSING */
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
      // todo: calculate the expression (recursively)
      // case 1: add
      // case 2: subtract
      case Operation.addition:
        return this.left.value + this.right.value;
      case Operation.subtraction:
        return this.left.value - this.right.value;
      default:
        console.log(`Operation is not supported.`);
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
  let result = [];

  for (let i = 0; i < input.length; ++i) {
    switch (input[i]) {
      case "+":
        result.push(new Token(TokenType.plus, "+"));
        break;
      case "-":
        result.push(new Token(TokenType.minus, "-"));
        break;
      case "(":
        result.push(new Token(TokenType.lparen, "("));
        break;
      case ")":
        result.push(new Token(TokenType.rparen, ")"));
        break;
      default:
        let buffer = [input[i]];
        for (let j = i + 1; j < input.length; ++j) {
          if ("0123456789".includes(input[j])) {
            buffer.push(input[j]);
            ++i;
          } else {
            result.push(new Token(TokenType.integer, buffer.join("")));
            break;
          }
        }
        break;
    }
  }

  return result;
}

// build an expression tree, node could be either
// (1) BinaryOperation
// (2) Integer
// both has `value` prop
function parse(tokens) {
  let operation = new BinaryOperation();
  let haveLHS = false; // have left hand side

  for (let i = 0; i < tokens.length; ++i) {
    let token = tokens[i];

    // todo: logic of build the express
    // for one call, we processing one binary operation
    // case 1: integer, as we process from left to right => build left first, then build right
    // case 2,3: operation +, - => add prop for current binaryOperation
    // case 4: `(` => call the parse() recursively on slice from `(` to `)` => build left first, then right
    // notice: be careful to reassign cur pointer `i` in case 4
    switch (token.type) {
      case TokenType.integer:
        const integerNode = new Integer(parseInt(token.text));
        if (!operation.left) operation.left = integerNode;
        else operation.right = integerNode;
        break;
      case TokenType.plus:
        operation.type = Operation.addition;
        break;
      case TokenType.minus:
        operation.type = Operation.subtraction;
        break;
      case TokenType.lparen:
        const buffer = [];
        // currently i
        let j = i + 1;
        while (j < tokens.length && tokens[j].type !== TokenType.rparen) {
          buffer.push(tokens[j]);
          j++;
        }
        i = j;

        if (!operation.left) operation.left = parse(buffer);
        else operation.right = parse(buffer);
        break;
      default:
        throw new Error("Token type is not supported.");
    }
  }
  return operation;
}

let input = "(13+4)-(12+1)";
let tokens = lex(input);
console.log(tokens.join("  "));

let parsed = parse(tokens);
console.log(`${input} = ${parsed.value}`);
