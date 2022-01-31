const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const async = require("async");

class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log("This tea is nice with lemon!");
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

// TODO: Create abstract class HotDrinkFactory with prepare(amount)

// TODO: extends abtract class, implement prepare(amount) and create instance of drink
class TeaFactory {}
class CoffeeFactory {}

class HotDrinkMachine {
  constructor() {
    // TOOD: build mapping between name and factory class
    this.factories = {};
  }

  makeDrink(type) {
    switch (type) {
      case "tea":
        return new TeaFactory().prepare(200);
      case "coffee":
        return new CoffeeFactory().prepare(50);
      default:
        throw new Error(`Don't know how to make ${type}`);
    }
  }

  interact(consumer) {
    // TODO: ask user for drink name and amount
    // based on drink name, make drink instance with amount
    // pass drink for consumer (callback)
  }
}

let machine = new HotDrinkMachine();
// rl.question('which drink? ', function(answer)
// {
//   let drink = machine.makeDrink(answer);
//   drink.consume();
//
//   rl.close();
// });
machine.interact(function (drink) {
  drink.consume();
});
