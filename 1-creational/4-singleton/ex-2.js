// monostate

class ChiefExecutiveOfficer {
  toString() {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }

  // make name, age static
}

let ceo = new ChiefExecutiveOfficer();
ceo.name = "Adam Smith";
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = "John Gold";
ceo2.age = 66;

console.log(ceo.toString());
console.log(ceo2.toString());
