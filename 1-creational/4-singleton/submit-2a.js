// monostate

class ChiefExecutiveOfficer {
  toString() {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }

  // make name, age static
  get name() {
    return ChiefExecutiveOfficer._name;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }

  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  set age(value) {
    ChiefExecutiveOfficer._age = value;
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
