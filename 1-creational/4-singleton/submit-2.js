// monostate

class ChiefExecutiveOfficer {
  static _name;
  static _age;

  toString() {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }

  constructor(name, age) {
    ChiefExecutiveOfficer._name = name;
    ChiefExecutiveOfficer._age = age;
  }

  // make name, age static
  get name() {
    return ChiefExecutiveOfficer._name;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }

  set name(name) {
    ChiefExecutiveOfficer._name = name;
  }

  set age(age) {
    ChiefExecutiveOfficer._age = age;
  }
}

let ceo = new ChiefExecutiveOfficer();
ceo.name = "Adam Smith";
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = "John Gold";
ceo2.age = 66;

console.log(ceo.toString());
console.log(ceo2.toString());

const thanh = new ChiefExecutiveOfficer("thanh", 26);
console.log(thanh.toString());
